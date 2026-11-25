import { describe, expect, test } from 'vitest';
import { site } from '../../src/data/site';
import { area54, clients, hero, projects, solutions, startEasy, why } from '../../src/data/home';
import { img } from '../../src/lib/assets';

describe('homepage data', () => {
  test('solutions keep the client-approved titles and heading', () => {
    expect(solutions.heading).toBe('Our Solutions');
    expect(solutions.items.map((s) => s.title)).toEqual([
      'Network & IT Infrastructure',
      'IT Security Assessment',
      'Server Room & Cabling Solutions',
      'Enterprise Wi-Fi Solutions',
      'Software & Application Solutions',
      'IT Consulting & Assessment',
    ]);
  });

  test('client logos: 52, Synnex fifth, five white logos, every logo named and present', () => {
    expect(clients.heading).toBe('Trusted by');
    expect(clients.logos).toHaveLength(52);
    expect(clients.logos[4]).toMatchObject({ file: 'logos/synnex.png', name: 'Synnex' });
    expect(clients.logos.filter((l) => l.white)).toHaveLength(5);
    expect(clients.logos.every((l) => l.name.length > 0)).toBe(true);
    for (const l of clients.logos) expect(() => img(l.file)).not.toThrow();
  });

  test('contact details', () => {
    expect(site.phones.map((p) => p.tel)).toEqual(['tel:+6622723111', 'tel:+66846723111']);
    expect(startEasy.phone.tel).toBe('tel:+66816135243');
    expect(startEasy.lineUrl).toBe('https://lin.ee/zk70Gu8');
    expect(site.facebookUrl).toBe('https://www.facebook.com/ICAN.Admin/');
  });

  test('Chang ICAN: line without a head count, 4.5 stars from 22 Google reviews, every chip has its full service list', () => {
    expect(startEasy.text).toBe('ICAN technicians for everyday home and office jobs. Book by the job or by the day.');
    expect(startEasy.rating).toEqual({ value: 4.5, count: 22, source: 'Google' });
    expect(area54.spots.find((s) => s.id === 6)?.tag).toBe('Technicians · ★ 4.5 Google');
    expect(startEasy.services.map((s) => s.label)).toEqual(['Electrical & network', 'Handyman', 'Moving', 'Event setup']);
    for (const s of startEasy.services) expect(s.items.length, s.label).toBeGreaterThanOrEqual(3);
  });

  test('hero lead mentions cybersecurity', () => {
    expect(hero.lead).toContain('cybersecurity');
  });

  test('Area54 directory: six spots, Maps links on 1, 3 and 5', () => {
    expect(area54.spots.map((s) => s.id)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(area54.spots.filter((s) => s.link?.external).map((s) => s.id)).toEqual([1, 3, 5]);
    expect(area54.directionsUrl).toBe('https://www.google.com/maps/search/?api=1&query=Area54+Vibhavadi');
  });

  test('certifications are spelled correctly', () => {
    const chips = why.certs.flatMap((c) => c.chips);
    expect(chips).toContain('Panduit');
    expect(chips).not.toContain('Penduit');
  });

  test('every image referenced by the data exists', () => {
    const paths = [
      hero.images.main, hero.images.second, ...hero.trustedLogos.map((l) => l.file),
      startEasy.images.main, startEasy.images.second, startEasy.lineQr,
      ...projects.items.map((p) => p.image), area54.image,
    ];
    for (const p of paths) expect(() => img(p), p).not.toThrow();
  });

  test('img() fails loudly for a missing asset', () => {
    expect(() => img('images/nope.jpg')).toThrow('Missing asset: images/nope.jpg');
  });
});
