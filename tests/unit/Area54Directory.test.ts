import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import Area54Directory from '../../src/components/islands/Area54Directory.vue';
import { area54 } from '../../src/data/home';

const mountDir = () => mount(Area54Directory, {
  props: { spots: area54.spots, imageSrc: '/area54.webp', imageAlt: area54.imageAlt },
  attachTo: document.body,
});
/** Ids of the cards that are switched on (CSS shows only these). */
const shown = (w: VueWrapper) => w.findAll('.spot[data-shown]').map((el) => el.attributes('data-spot'));
const isOpen = (w: VueWrapper) => w.get('.directory').attributes('data-open') !== undefined;

describe('Area54Directory', () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  test('one card at a time: the first business until a pin is picked, closed on desktop', () => {
    const w = mountDir();
    expect(shown(w)).toEqual(['1']);
    expect(isOpen(w)).toBe(false);
  });

  test('hovering a pin opens its card on the photo and highlights the pin', async () => {
    const w = mountDir();
    await w.get('.pin[data-spot="3"]').trigger('mouseenter');
    expect(isOpen(w)).toBe(true);
    expect(shown(w)).toEqual(['3']);
    expect(w.findAll('.pin[data-hl]').map((p) => p.attributes('data-spot'))).toEqual(['3']);
  });

  test('clicking another pin switches the card', async () => {
    const w = mountDir();
    await w.get('.pin[data-spot="1"]').trigger('click');
    await w.get('.pin[data-spot="5"]').trigger('click');
    expect(shown(w)).toEqual(['5']);
  });

  test('each card follows its pin in the markup, so Tab reaches its link next', () => {
    const order = mountDir().findAll('.pin, .spot').map((el) => `${el.classes()[0]}:${el.attributes('data-spot')}`);
    expect(order).toEqual(area54.spots.flatMap((s) => [`pin:${s.id}`, `spot:${s.id}`]));
  });

  test('cards on the left half open to the right of their pin, and vice versa', () => {
    const w = mountDir();
    for (const s of area54.spots) {
      expect(w.get(`.spot[data-spot="${s.id}"]`).attributes('data-side')).toBe(s.pin.left < 50 ? 'right' : 'left');
    }
  });

  test('Escape closes the card', async () => {
    const w = mountDir();
    await w.get('.pin[data-spot="2"]').trigger('mouseenter');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await w.vm.$nextTick();
    expect(isOpen(w)).toBe(false);
  });

  test('the close button closes the card and puts focus back on its pin', async () => {
    const w = mountDir();
    await w.get('.pin[data-spot="2"]').trigger('click');
    const x = w.get('.spot[data-spot="2"] .x');
    (x.element as HTMLElement).focus();
    await x.trigger('click');
    expect(isOpen(w)).toBe(false);
    expect(document.activeElement?.getAttribute('data-spot')).toBe('2');
    expect(isOpen(w)).toBe(false); // refocusing the pin must not reopen the card
  });

  test('a click elsewhere on the page closes the card', async () => {
    const w = mountDir();
    await w.get('.pin[data-spot="4"]').trigger('mouseenter');
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await w.vm.$nextTick();
    expect(isOpen(w)).toBe(false);
  });

  test('leaving the photo closes the card after a short delay; coming back cancels it', async () => {
    vi.useFakeTimers();
    const w = mountDir();
    const dir = w.get('.directory');
    await dir.trigger('mouseenter');
    await w.get('.pin[data-spot="6"]').trigger('mouseenter');
    await dir.trigger('mouseleave');
    await dir.trigger('mouseenter');
    vi.advanceTimersByTime(1000);
    await w.vm.$nextTick();
    expect(isOpen(w)).toBe(true);
    await dir.trigger('mouseleave');
    vi.advanceTimersByTime(1000);
    await w.vm.$nextTick();
    expect(isOpen(w)).toBe(false);
  });

  test('state never changes the class list (keeps scroll-reveal classes intact)', async () => {
    const w = mountDir();
    const card = w.get('.spot[data-spot="2"]');
    card.element.classList.add('in');
    await w.get('.pin[data-spot="2"]').trigger('mouseenter');
    await w.get('.pin[data-spot="3"]').trigger('mouseenter');
    expect(card.classes()).toContain('in');
  });

  test('pins are labelled buttons that point at their card', () => {
    const pins = mountDir().findAll('.pin');
    expect(pins).toHaveLength(6);
    pins.forEach((p, i) => {
      expect(p.element.tagName).toBe('BUTTON');
      expect(p.attributes('aria-label')).toBe(area54.spots[i].name);
      expect(p.attributes('aria-controls')).toBe(`spot-${area54.spots[i].id}`);
    });
  });

  test('Maps links open safely in a new tab; in-page links do not', () => {
    const w = mountDir();
    const ext = w.findAll('a.go[target="_blank"]');
    expect(ext).toHaveLength(3);
    for (const a of ext) expect(a.attributes('rel')).toContain('noopener');
    expect(w.get('.spot[data-spot="6"] a.go').attributes('target')).toBeUndefined();
  });
});
