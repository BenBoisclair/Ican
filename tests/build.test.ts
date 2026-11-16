// @vitest-environment node
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const DIST = 'dist';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

/** The built page plus every CSS and JS file it ships. */
function readDist(): string {
  return walk(DIST)
    .filter((f) => /\.(html|css|js)$/.test(f))
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n');
}

const html = () => readFileSync(join(DIST, 'index.html'), 'utf8');

describe('page shell', () => {
  test('has language, title, description and the no-JS gate', () => {
    const page = html();
    expect(page).toContain('<html lang="en"');
    expect(page).toContain('<title>ICAN Group | Your Trusted Partner in IT Solutions</title>');
    expect(page).toMatch(/<meta name="description" content="[^"]+"/);
    expect(page).toContain("document.documentElement.classList.add('js')");
  });

  test('makes no requests to third-party CDNs', () => {
    const all = readDist();
    const found = ['fonts.googleapis.com', 'fonts.gstatic.com', 'unpkg.com', 'cdnjs', 'jsdelivr'].filter((h) => all.includes(h));
    expect(found).toEqual([]);
  });

  test('reveal styles only hide content when JavaScript is running', () => {
    expect(/\.js \.rv\{/.test(readDist())).toBe(true);
  });
});

/** Inner HTML of the first element with this id (good enough for our flat sections). */
function section(id: string): string {
  const page = html();
  const start = page.indexOf(`id="${id}"`);
  expect(start, `#${id} exists`).toBeGreaterThan(-1);
  const tag = page.lastIndexOf('<', start);
  const name = page.slice(tag + 1).match(/^[a-z0-9]+/)![0];
  const end = page.indexOf(`</${name}>`, start);
  return page.slice(tag, end);
}
const text = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ');

describe('header and footer', () => {
  test('desktop navigation lists every solution, Chang ICAN after a separator, and portfolio', () => {
    const nav = section('site-nav');
    const t = text(nav);
    for (const label of [
      'Network & IT Infrastructure', 'IT Security Assessment', 'Server Room & Cabling Solutions',
      'Enterprise Wi-Fi Solutions', 'Software & Application Solutions', 'IT Consulting & Assessment',
      'Chang ICAN — Home & Office Technicians', 'IT Infrastructure', 'Software & Application', 'About Us', 'Contact Us',
    ]) expect(t, label).toContain(label);
    expect(nav).toMatch(/class="sep"[^>]*>\s*<\/li>\s*<li[^>]*>\s*<a[^>]*href="#chang"/);
  });

  test('footer has company, phones, maps and Facebook', () => {
    const footer = section('contact');
    const t = text(footer);
    expect(t).toContain('International Computing And Networking Co., Ltd.');
    expect(footer).toContain('href="tel:+6622723111"');
    expect(footer).toContain('href="tel:+66846723111"');
    expect(footer).toMatch(/<a[^>]*href="https:\/\/www\.facebook\.com\/ICAN\.Admin\/"[^>]*target="_blank"[^>]*rel="noopener"/);
    expect(t).toContain('© 2026');
  });
});
