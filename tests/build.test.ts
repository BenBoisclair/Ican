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
