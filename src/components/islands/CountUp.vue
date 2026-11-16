<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{ to: number; suffix?: string; duration?: number }>(), {
  suffix: '+',
  duration: 1400,
});

// Starts at the final value: that is what the server renders and what visitors without JS keep.
const display = ref(`${props.to}${props.suffix}`);
const root = ref<HTMLElement | null>(null);
let frame = 0;
let observer: IntersectionObserver | null = null;

function count() {
  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / props.duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    display.value = progress === 1 ? `${props.to}${props.suffix}` : String(Math.round(props.to * eased));
    if (progress < 1) frame = requestAnimationFrame(step);
  };
  display.value = '0';
  frame = requestAnimationFrame(step);
}

onMounted(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window) || !root.value) return;
  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return;
    observer?.disconnect();
    count();
  });
  observer.observe(root.value);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  observer?.disconnect();
});
</script>

<template>
  <strong ref="root">{{ display }}</strong>
</template>
