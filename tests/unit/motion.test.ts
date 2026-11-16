import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { initMotion } from '../../src/scripts/motion';

let observed: { cb: IntersectionObserverCallback; els: Element[] }[] = [];
class RecordingIO {
  entry: { cb: IntersectionObserverCallback; els: Element[] };
  constructor(cb: IntersectionObserverCallback) { this.entry = { cb, els: [] }; observed.push(this.entry); }
  observe(el: Element) { this.entry.els.push(el); }
  unobserve() {}
  disconnect() {}
}
const fire = (el: Element) => {
  const o = observed.find((x) => x.els.includes(el))!;
  o.cb([{ isIntersecting: true, target: el } as IntersectionObserverEntry], {} as IntersectionObserver);
};

describe('initMotion', () => {
  beforeEach(() => {
    observed = [];
    vi.stubGlobal('IntersectionObserver', RecordingIO);
    window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
    document.body.innerHTML = '<header class="nav"></header><p class="rv" id="a"></p><p class="rv" id="b"></p>';
  });
  afterEach(() => { vi.unstubAllGlobals(); document.body.innerHTML = ''; });

  test('reveals an element once it scrolls into view', () => {
    initMotion();
    const a = document.getElementById('a')!;
    expect(a.classList.contains('in')).toBe(false);
    fire(a);
    expect(a.classList.contains('in')).toBe(true);
    expect(document.getElementById('b')!.classList.contains('in')).toBe(false);
  });

  test('compacts the header after the page scrolls', () => {
    initMotion();
    const nav = document.querySelector('.nav')!;
    Object.defineProperty(window, 'scrollY', { value: 40, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    expect(nav.classList.contains('scrolled')).toBe(true);
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    expect(nav.classList.contains('scrolled')).toBe(false);
  });

  test('marks the page as motion-ready so the no-JS fallback stays off', () => {
    delete document.documentElement.dataset.motion;
    initMotion();
    expect(document.documentElement.dataset.motion).toBe('ready');
  });
});
