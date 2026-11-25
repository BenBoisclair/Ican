import { describe, expect, test } from 'vitest';
import { site } from '../../src/data/site';
import { area54, clients, hero, projects, solutions, startEasy, why } from '../../src/data/home';
import { img } from '../../src/lib/assets';
import { solutionHref, solutions as allSolutions } from '../../src/data/solutions';
import { galleries, photos } from '../../src/data/portfolio';
import { contact } from '../../src/data/contact';
import { about } from '../../src/data/about';
import { csr } from '../../src/data/csr';

describe('homepage data', () => {
  test('eight solutions, the two recommended ones first, under the approved heading', () => {
    expect(solutions.heading).toBe('Our Solutions');
    expect(solutions.items.map((s) => s.title)).toEqual([
      'IT Security Assessment',
      'Network & IT Infrastructure',
      'Server Room & Cabling',
      'Enterprise Wi-Fi',
      'Software & Applications',
      'IT Consulting & Assessment',
      'IT Outsourcing',
      'ICAN Alert',
    ]);
    expect(solutions.items.filter((s) => s.recommended).map((s) => s.title)).toEqual(['IT Security Assessment', 'Network & IT Infrastructure']);
  });

  test('solutions with content link to their page; the rest open the contact form with the solution picked', () => {
    const withPage = allSolutions.filter((s) => s.page).map((s) => s.slug);
    expect(withPage).toEqual(['network-it-infrastructure', 'server-room-cabling', 'software-applications', 'it-outsourcing', 'ican-alert']);
    for (const s of allSolutions) {
      expect(solutionHref(s)).toBe(s.page ? `/solutions/${s.slug}` : `/contact?topic=quote&solution=${s.slug}`);
    }
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
    expect(site.facebookUrl).toBe('https://www.facebook.com/ican.co.th');
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

  test('every solution, portfolio and About image exists, and every gallery has photos', () => {
    for (const s of allSolutions) if (s.page?.image) expect(() => img(s.page!.image!), s.slug).not.toThrow();
    for (const p of [about.image, about.what.image]) expect(() => img(p), p).not.toThrow();
    for (const g of galleries) {
      const n = photos(g.key).length;
      expect(n, g.key).toBeGreaterThan(0);
      for (const b of g.best) expect(b, `${g.key} best photo ${b}`).toBeLessThanOrEqual(n);
    }
  });

  test('contact form: topics, and the solution list (all eight plus Other) for quotes and solution questions', () => {
    expect(contact.form.topics.map((t) => t.label)).toEqual(['Get a quote', 'Ask about a solution', 'Book a consultation', 'Get technical help', 'Something else']);
    expect(contact.form.topics.filter((t) => t.askSolution).map((t) => t.value)).toEqual(['quote', 'solution']);
    expect(contact.form.solutions.map((s) => s.value)).toEqual([...allSolutions.map((s) => s.slug), 'other']);
    expect(contact.form.to).toBe(site.email);
  });

  test('Social Responsibility: charity and staff activities, newest first, each with a date and photos that exist', () => {
    for (const key of ['charity', 'people'] as const) {
      const list = csr.activities.filter((a) => a.category === key);
      expect(list.length, key).toBeGreaterThan(0);
      expect(list.map((a) => a.date), key).toEqual([...list.map((a) => a.date)].sort().reverse());
    }
    for (const a of csr.activities) {
      expect(a.date, a.title).toMatch(/^\d{4}-\d{2}(-\d{2})?$/);
      expect(a.photos.length, a.title).toBeGreaterThan(0);
      for (const p of a.photos) expect(() => img(p), p).not.toThrow();
    }
  });

  test('img() fails loudly for a missing asset', () => {
    expect(() => img('images/nope.jpg')).toThrow('Missing asset: images/nope.jpg');
  });
});
