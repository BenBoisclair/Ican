import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import CountUp from '../../src/components/islands/CountUp.vue';

/** Stub matchMedia so `(prefers-reduced-motion: reduce)` reports `reduced`. */
function setReducedMotion(reduced: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: reduced && query.includes('reduce'),
    media: query, addEventListener() {}, removeEventListener() {}, onchange: null,
    addListener() {}, removeListener() {}, dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

/** IntersectionObserver that reports every observed element as visible straight away. */
class VisibleIO {
  constructor(private cb: IntersectionObserverCallback) {}
  observe(el: Element) { this.cb([{ isIntersecting: true, target: el } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
  unobserve() {}
  disconnect() {}
}

describe('CountUp', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance', 'setTimeout'] });
    vi.stubGlobal('IntersectionObserver', VisibleIO);
  });
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  test('renders the final value before any JavaScript runs', () => {
    setReducedMotion(false);
    const w = mount(CountUp, { props: { to: 27 }, shallow: false, attachTo: undefined });
    // The server-rendered markup is what visitors without JS see.
    expect(w.html()).toContain('27+');
  });

  test('stays at the final value when the visitor prefers reduced motion', async () => {
    setReducedMotion(true);
    const w = mount(CountUp, { props: { to: 27 } });
    vi.advanceTimersByTime(700);
    await w.vm.$nextTick();
    expect(w.text()).toBe('27+');
  });

  test('counts up to the final value when visible', async () => {
    setReducedMotion(false);
    const w = mount(CountUp, { props: { to: 27 } });
    vi.advanceTimersByTime(700);
    await w.vm.$nextTick();
    const mid = w.text();
    expect(mid).toMatch(/^\d+$/);
    expect(Number(mid)).toBeLessThan(27);
    vi.advanceTimersByTime(800);
    await w.vm.$nextTick();
    expect(w.text()).toBe('27+');
  });
});
