<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { ArrowRight, ArrowUpRight, X } from '@lucide/vue';
import type { Spot } from '../../data/home';

const props = defineProps<{ spots: Spot[]; imageSrc: string; imageSrcset?: string; imageAlt: string }>();

/*
 * One business card shows at a time; each card follows its pin in the markup, so Tab goes pin → its card → next pin.
 * - Desktop (960px and up): the card opens on the photo beside its pin, on hover, focus or click. It closes when the
 *   pointer leaves the photo, on Escape, with its close button, or on a click elsewhere.
 * - Phones and tablets: the card of the picked number sits under the photo (the first one until a pin is tapped).
 * State lives in data attributes, never classes, so Vue never rewrites class lists.
 */
const DESKTOP = 960;
const active = ref(props.spots[0]?.id ?? 0);
const open = ref(false);
const root = ref<HTMLElement>();
let pointerInside = false;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
let refocusing = false;

function show(id: number) {
  clearTimeout(closeTimer);
  active.value = id;
  open.value = true;
}

function onPinFocus(id: number) {
  if (!refocusing) show(id);
}

async function onPinClick(id: number) {
  show(id);
  if (window.innerWidth >= DESKTOP) return;
  await nextTick();
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(`spot-${id}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
}

function close() {
  clearTimeout(closeTimer);
  if (!open.value) return;
  const card = document.getElementById(`spot-${active.value}`);
  const focusWasInCard = !!card && card.contains(document.activeElement);
  open.value = false;
  // The card is about to disappear: hand focus back to its pin without reopening it.
  if (focusWasInCard) {
    refocusing = true;
    root.value?.querySelector<HTMLElement>(`.pin[data-spot="${active.value}"]`)?.focus();
    refocusing = false;
  }
}

function onEnter() {
  pointerInside = true;
  clearTimeout(closeTimer);
}

function onLeave() {
  pointerInside = false;
  clearTimeout(closeTimer);
  closeTimer = setTimeout(close, 300);
}

function onFocusOut(e: FocusEvent) {
  if (!pointerInside && !root.value?.contains(e.relatedTarget as Node | null)) close();
}

const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
const onPointerdown = (e: Event) => { if (open.value && !root.value?.contains(e.target as Node)) close(); };

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('pointerdown', onPointerdown);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  document.removeEventListener('pointerdown', onPointerdown);
  clearTimeout(closeTimer);
});
</script>

<template>
  <div
    ref="root"
    class="directory"
    :data-open="open ? '' : undefined"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @focusout="onFocusOut"
  >
    <img class="photo" :src="imageSrc" :srcset="imageSrcset" sizes="(max-width: 1248px) 100vw, 1200px" :alt="imageAlt" loading="lazy" decoding="async" />
    <template v-for="(s, i) in spots" :key="s.id">
      <button
        class="pin"
        type="button"
        :data-spot="s.id"
        :data-hl="active === s.id ? '' : undefined"
        :aria-label="s.name"
        :aria-controls="`spot-${s.id}`"
        :style="{ '--x': String(s.pin.left), '--y': String(s.pin.top), '--pd': `${i * 0.4}s` }"
        @mouseenter="show(s.id)"
        @focus="onPinFocus(s.id)"
        @click="onPinClick(s.id)"
      >
        <span aria-hidden="true">{{ s.id }}</span>
      </button>
      <div
        :id="`spot-${s.id}`"
        class="spot"
        :data-spot="s.id"
        :data-shown="active === s.id ? '' : undefined"
        :data-side="s.pin.left < 50 ? 'right' : 'left'"
        :data-row="s.pin.top < 50 ? 'top' : 'bottom'"
        :style="{ '--x': String(s.pin.left), '--y': String(s.pin.top) }"
      >
        <span class="n" aria-hidden="true">{{ s.id }}</span>
        <div>
          <span class="tag">{{ s.tag }}</span>
          <h3>{{ s.name }} <span v-if="s.thaiName" class="th">{{ s.thaiName }}</span></h3>
          <p>{{ s.text }}</p>
          <a
            v-if="s.link"
            class="go"
            :href="s.link.href"
            :target="s.link.external ? '_blank' : undefined"
            :rel="s.link.external ? 'noopener' : undefined"
          >
            {{ s.link.label }}
            <ArrowUpRight v-if="s.link.external" :size="15" aria-hidden="true" />
            <ArrowRight v-else :size="15" aria-hidden="true" />
          </a>
        </div>
        <button class="x" type="button" aria-label="Close" @click="close"><X :size="16" aria-hidden="true" /></button>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* The container lets pins use cqw: their top stays on the photo even when a card below makes the box taller. */
.directory { position: relative; container-type: inline-size; }
.photo { width: 100%; aspect-ratio: 2200 / 1241; object-fit: cover; border-radius: 20px; background: #ddd; box-shadow: 0 30px 60px rgba(15, 27, 51, .18); }

/* 0.5641 = 1241 / 2200, the photo's height as a share of its width. */
.pin { position: absolute; z-index: 2; left: calc(var(--x) * 1%); top: calc(var(--y) * .5641cqw); transform: translate(-50%, -50%); display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border-radius: 50%; border: 3px solid #fff; background: var(--blue); color: #fff; font: 700 16px "IBM Plex Sans", sans-serif; cursor: pointer; box-shadow: 0 6px 18px rgba(0, 0, 0, .35); transition: transform .2s var(--ease), background .2s; }
.pin::after { content: ""; position: absolute; inset: -9px; border-radius: 50%; }
.pin:hover, .directory[data-open] .pin[data-hl] { transform: translate(-50%, -50%) scale(1.12); background: #2F63E0; }
@media (prefers-reduced-motion: no-preference) {
  .pin::before { content: ""; position: absolute; inset: -9px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, .9); opacity: 0; animation: ping 2.6s var(--ease) infinite; animation-delay: var(--pd, 0s); }
}
@keyframes ping { 0% { transform: scale(.6); opacity: .9; } 80%, 100% { transform: scale(1.35); opacity: 0; } }

.spot { display: none; position: relative; gap: 14px; padding: 20px; border: 1px solid var(--line); border-radius: 14px; background: #fff; }
.spot[data-shown] { display: flex; animation: card-in .22s var(--ease); }
@keyframes card-in { from { opacity: 0; transform: translateY(6px) scale(.98); } }
.n { flex: none; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: var(--blue); color: #fff; font-weight: 700; font-size: 14px; }
.tag { display: block; font-size: 11.5px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: #7B869C; }
h3 { font-size: 16.5px; margin-top: 3px; }
.th { font-family: "IBM Plex Sans Thai", sans-serif; font-weight: 500; color: #7B869C; font-size: 14px; margin-left: 4px; }
p { font-size: 14.5px; line-height: 1.5; color: var(--muted); margin-top: 6px; }
.go { display: inline-flex; align-items: center; gap: 5px; margin-top: 10px; font-size: 13.5px; font-weight: 600; color: var(--blue); }
.go:hover { text-decoration: underline; text-underline-offset: 3px; }
.x { position: absolute; top: 10px; right: 10px; display: grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 0; border-radius: 50%; background: transparent; color: #7B869C; cursor: pointer; }
.x:hover { background: var(--tint-2); color: var(--ink); }

/* Desktop: the card floats on the photo beside its pin, away from the nearer edge. */
@media (min-width: 960px) {
  .directory:not([data-open]) .spot { display: none; }
  .spot { position: absolute; z-index: 3; width: 320px; padding-right: 40px; border-color: transparent; box-shadow: 0 24px 50px rgba(15, 27, 51, .3); }
  .spot[data-side="right"] { left: calc(var(--x) * 1% + 30px); }
  .spot[data-side="left"] { right: calc((100 - var(--x)) * 1% + 30px); }
  .spot[data-row="top"] { top: calc(var(--y) * 1% - 26px); }
  .spot[data-row="bottom"] { bottom: calc((100 - var(--y)) * 1% - 26px); }
}

/* Phones and tablets: the picked card sits under the photo. */
@media (max-width: 959.98px) {
  .spot { margin-top: 16px; }
  .pin[data-hl] { transform: translate(-50%, -50%) scale(1.12); background: #2F63E0; box-shadow: 0 0 0 4px rgba(255, 255, 255, .55), 0 6px 18px rgba(0, 0, 0, .35); }
  .x { display: none; }
}
@media (max-width: 640px) {
  .pin { width: 32px; height: 32px; font-size: 13px; border-width: 2px; }
}
</style>
