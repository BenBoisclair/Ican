import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';
import Area54Directory from '../../src/components/islands/Area54Directory.vue';
import { area54 } from '../../src/data/home';

const mountDir = () => mount(Area54Directory, {
  props: { spots: area54.spots, imageSrc: '/area54.webp', imageAlt: area54.imageAlt },
  attachTo: document.body,
});
const highlighted = (w: VueWrapper) => w.findAll('[data-hl]').map((el) => `${el.classes()[0]}:${el.attributes('data-spot')}`);

describe('Area54Directory', () => {
  afterEach(() => { document.body.innerHTML = ''; });

  test('hovering a card highlights it and its pin only', async () => {
    const w = mountDir();
    await w.get('.spot[data-spot="3"]').trigger('mouseenter');
    expect(highlighted(w).sort()).toEqual(['pin:3', 'spot:3']);
  });

  test('leaving the card clears the highlight', async () => {
    const w = mountDir();
    await w.get('.spot[data-spot="3"]').trigger('mouseenter');
    await w.get('.spot[data-spot="3"]').trigger('mouseleave');
    expect(highlighted(w)).toEqual([]);
  });

  test('clicking a pin highlights that business', async () => {
    const w = mountDir();
    await w.get('.pin[data-spot="1"]').trigger('click');
    await w.get('.pin[data-spot="5"]').trigger('click');
    expect(highlighted(w).sort()).toEqual(['pin:5', 'spot:5']);
  });

  test('highlighting never changes the class list (keeps scroll-reveal classes intact)', async () => {
    const w = mountDir();
    const card = w.get('.spot[data-spot="2"]');
    card.element.classList.add('in');
    await card.trigger('mouseenter');
    await card.trigger('mouseleave');
    expect(card.classes()).toContain('in');
  });

  test('pins are labelled buttons', () => {
    const pins = mountDir().findAll('.pin');
    expect(pins).toHaveLength(6);
    pins.forEach((p, i) => {
      expect(p.element.tagName).toBe('BUTTON');
      expect(p.attributes('aria-label')).toBe(area54.spots[i].name);
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
