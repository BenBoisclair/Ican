import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import MobileMenu from '../../src/components/islands/MobileMenu.vue';
import { site } from '../../src/data/site';

const mountMenu = () => mount(MobileMenu, { props: { nav: site.nav, contact: site.contact }, attachTo: document.body });

describe('MobileMenu', () => {
  afterEach(() => { document.body.innerHTML = ''; vi.unstubAllGlobals(); });

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

  test('closes when the screen grows past the phone breakpoint (e.g. iPad rotated)', async () => {
    let onChange: ((e: { matches: boolean }) => void) | undefined;
    vi.stubGlobal('matchMedia', (q: string) => ({
      matches: true, media: q,
      addEventListener: (_: string, cb: (e: { matches: boolean }) => void) => { onChange = cb; },
      removeEventListener() {},
    }));
    const w = mountMenu();
    await w.get('button.burger').trigger('click');
    expect(onChange).toBeTypeOf('function');
    onChange!({ matches: false });
    await w.vm.$nextTick();
    expect(w.get('button.burger').attributes('aria-expanded')).toBe('false');
    expect(w.get('.mobile-panel').isVisible()).toBe(false);
  });

  test('Escape returns keyboard focus to the menu button', async () => {
    const w = mountMenu();
    const toggle = w.get('button.burger');
    await toggle.trigger('click');
    (w.get('.mobile-panel a').element as HTMLElement).focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await w.vm.$nextTick();
    expect(document.activeElement).toBe(toggle.element);
  });

  test('Escape leaves focus alone when the menu is already closed', async () => {
    const w = mountMenu();
    const other = document.createElement('button');
    document.body.appendChild(other);
    other.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await w.vm.$nextTick();
    expect(document.activeElement).toBe(other);
  });
});
