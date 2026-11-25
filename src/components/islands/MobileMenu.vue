<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { MapPin, Menu, X } from '@lucide/vue';
import type { NavItem } from '../../data/site';

defineProps<{ nav: NavItem[]; contact: { label: string; href: string } }>();

const open = ref(false);
const toggle = ref<HTMLButtonElement | null>(null);
const panelId = 'mobile-panel';
const close = () => { open.value = false; };

const onKey = (e: KeyboardEvent) => {
  if (e.key !== 'Escape' || !open.value) return;
  close();
  toggle.value?.focus();
};
// The menu only exists on phone widths: close it if the screen grows past them (e.g. a tablet rotates).
const phone = typeof window !== 'undefined' ? window.matchMedia?.('(max-width: 960px)') : undefined;
const onBreakpoint = (e: { matches: boolean }) => { if (!e.matches) close(); };

onMounted(() => {
  document.addEventListener('keydown', onKey);
  phone?.addEventListener?.('change', onBreakpoint);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey);
  phone?.removeEventListener?.('change', onBreakpoint);
});
</script>

<template>
  <button
    ref="toggle"
    class="burger"
    type="button"
    :aria-expanded="open ? 'true' : 'false'"
    :aria-controls="panelId"
    :aria-label="open ? 'Close menu' : 'Open menu'"
    @click="open = !open"
  >
    <X v-if="open" :size="26" aria-hidden="true" />
    <Menu v-else :size="26" aria-hidden="true" />
  </button>
  <div :id="panelId" v-show="open" class="mobile-panel">
    <template v-for="item in nav" :key="item.label">
      <a :href="item.href" @click="close"><MapPin v-if="item.icon === 'map-pin'" :size="17" aria-hidden="true" />{{ item.label }}</a>
      <a v-for="child in item.children ?? []" :key="child.label" class="sub" :href="child.href" @click="close">{{ child.label }}</a>
    </template>
    <a class="btn btn-primary" :href="contact.href" @click="close">{{ contact.label }}</a>
  </div>
</template>

<style scoped>
.burger { display: none; background: none; border: 0; padding: 8px; cursor: pointer; color: inherit; border-radius: 8px; }
.mobile-panel {
  position: absolute; left: 0; right: 0; top: 100%;
  padding: 8px 16px 20px; background: #fff; border-bottom: 1px solid #E6EAF2;
  box-shadow: 0 16px 30px rgba(15, 27, 51, .08); max-height: calc(100vh - 76px); max-height: calc(100dvh - 76px); overflow-y: auto;
}
.mobile-panel a { display: flex; align-items: center; gap: 8px; padding: 12px 4px; font-weight: 500; border-bottom: 1px solid #EEF1F6; }
.mobile-panel a svg { color: var(--blue); }
.mobile-panel a.sub { padding-left: 16px; font-weight: 400; font-size: 15px; }
.mobile-panel a.btn { display: inline-flex; margin-top: 14px; border-bottom: 0; }
@media (max-width: 960px) { .burger { display: block; } }
</style>
