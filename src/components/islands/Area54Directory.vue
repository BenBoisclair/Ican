<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight, ArrowUpRight } from '@lucide/vue';
import type { Spot } from '../../data/home';

defineProps<{ spots: Spot[]; imageSrc: string; imageSrcset?: string; imageAlt: string }>();

// Highlight is a data attribute, never a class, so Vue never rewrites the class list
// (motion.ts adds the `in` reveal class to these elements).
const active = ref<number | null>(null);
const hover = (id: number | null) => { active.value = id; };

function select(id: number) {
  active.value = id;
  if (window.innerWidth < 960) {
    document.getElementById(`spot-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
</script>

<template>
  <div class="directory" :data-active="active ?? ''">
    <div class="map">
      <img :src="imageSrc" :srcset="imageSrcset" sizes="(max-width: 1248px) 100vw, 1200px" :alt="imageAlt" loading="lazy" decoding="async" />
      <button
        v-for="(s, i) in spots"
        :key="s.id"
        class="pin"
        type="button"
        :data-spot="s.id"
        :data-hl="active === s.id ? '' : undefined"
        :aria-label="s.name"
        :style="{ left: `${s.pin.left}%`, top: `${s.pin.top}%`, '--pd': `${i * 0.4}s` }"
        @mouseenter="hover(s.id)"
        @mouseleave="hover(null)"
        @focus="hover(s.id)"
        @blur="hover(null)"
        @click="select(s.id)"
      >
        <span aria-hidden="true">{{ s.id }}</span>
        <span class="lbl" aria-hidden="true">{{ s.pinLabel ?? s.name }}</span>
      </button>
    </div>
    <div class="spots">
      <div
        v-for="s in spots"
        :id="`spot-${s.id}`"
        :key="s.id"
        class="spot"
        :data-spot="s.id"
        :data-hl="active === s.id ? '' : undefined"
        @mouseenter="hover(s.id)"
        @mouseleave="hover(null)"
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.map { position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 2200 / 1241; box-shadow: 0 30px 60px rgba(15, 27, 51, .18); background: #ddd; }
.map > img { width: 100%; height: 100%; object-fit: cover; }
.pin { position: absolute; z-index: 2; transform: translate(-50%, -50%); display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border-radius: 50%; border: 3px solid #fff; background: var(--blue); color: #fff; font: 700 16px "IBM Plex Sans", sans-serif; cursor: pointer; box-shadow: 0 6px 18px rgba(0, 0, 0, .35); transition: transform .2s var(--ease), background .2s; }
.pin:hover, .pin[data-hl] { transform: translate(-50%, -50%) scale(1.12); background: #2F63E0; }
.lbl { position: absolute; left: 50%; bottom: calc(100% + 12px); transform: translateX(-50%) translateY(4px); white-space: nowrap; background: #fff; color: var(--ink); font-size: 14px; font-weight: 600; padding: 8px 12px; border-radius: 8px; box-shadow: 0 8px 22px rgba(0, 0, 0, .22); opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }
.pin:hover .lbl, .pin[data-hl] .lbl { opacity: 1; transform: translateX(-50%); }
@media (prefers-reduced-motion: no-preference) {
  .pin::before { content: ""; position: absolute; inset: -9px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, .9); opacity: 0; animation: ping 2.6s var(--ease) infinite; animation-delay: var(--pd, 0s); }
}
@keyframes ping { 0% { transform: scale(.6); opacity: .9; } 80%, 100% { transform: scale(1.35); opacity: 0; } }

.spots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
.spot { display: flex; gap: 14px; padding: 20px; border: 1px solid var(--line); border-radius: 14px; background: #fff; transition: border-color .2s, box-shadow .2s; }
.spot[data-hl] { border-color: #9DB4EC; box-shadow: 0 12px 30px rgba(20, 58, 147, .12); }
.n { flex: none; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: var(--tint-2); color: var(--blue); font-weight: 700; font-size: 14px; transition: background .2s, color .2s; }
.spot[data-hl] .n { background: var(--blue); color: #fff; }
.tag { display: block; font-size: 11.5px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: #7B869C; }
h3 { font-size: 16.5px; margin-top: 3px; }
.th { font-family: "IBM Plex Sans Thai", sans-serif; font-weight: 500; color: #7B869C; font-size: 14px; margin-left: 4px; }
p { font-size: 14.5px; line-height: 1.5; color: var(--muted); margin-top: 6px; }
.go { display: inline-flex; align-items: center; gap: 5px; margin-top: 10px; font-size: 13.5px; font-weight: 600; color: var(--blue); }
@media (max-width: 960px) { .spots { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) {
  .spots { grid-template-columns: 1fr; }
  .pin { width: 30px; height: 30px; font-size: 13px; border-width: 2px; }
  .lbl { display: none; }
}
</style>
