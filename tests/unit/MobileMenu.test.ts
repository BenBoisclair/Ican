import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';
import MobileMenu from '../../src/components/islands/MobileMenu.vue';
import { site } from '../../src/data/site';

const mountMenu = () => mount(MobileMenu, { props: { nav: site.nav, contact: site.contact }, attachTo: document.body });

describe('MobileMenu', () => {
  afterEach(() => { document.body.innerHTML = ''; });

  test('starts closed, with the toggle wired to the panel', () => {
    const w = mountMenu();
    const toggle = w.get('button.burger');
    expect(toggle.attributes('aria-expanded')).toBe('false');
    const panelId = toggle.attributes('aria-controls');
    expect(panelId).toBeTruthy();
    expect(w.get(`#${panelId}`).isVisible()).toBe(false);
  });

  test('opens on click', async () => {
    const w = mountMenu();
    await w.get('button.burger').trigger('click');
    expect(w.get('button.burger').attributes('aria-expanded')).toBe('true');
    expect(w.get('.mobile-panel').isVisible()).toBe(true);
  });

  test('closes on Escape', async () => {
    const w = mountMenu();
    await w.get('button.burger').trigger('click');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await w.vm.$nextTick();
    expect(w.get('button.burger').attributes('aria-expanded')).toBe('false');
  });

  test('closes when a link is chosen', async () => {
    const w = mountMenu();
    await w.get('button.burger').trigger('click');
    await w.get('.mobile-panel a').trigger('click');
    expect(w.get('button.burger').attributes('aria-expanded')).toBe('false');
  });

  test('lists every nav item, every child and the contact link', () => {
    const w = mountMenu();
    const labels = w.findAll('.mobile-panel a').map((a) => a.text());
    const expected = site.nav.flatMap((i) => [i.label, ...(i.children ?? []).map((c) => c.label)]);
    expect(labels).toEqual([...expected, site.contact.label]);
  });
});
