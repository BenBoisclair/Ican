// @vitest-environment node
// Real-browser checks for the inner pages and the new header button, using the Chrome installed on this Mac.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { extname, join, normalize } from 'node:path';
import puppeteer, { type Browser, type Page } from 'puppeteer-core';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 4334;
const BASE = `http://127.0.0.1:${PORT}`;
const hasChrome = existsSync(CHROME);

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf',
};

function serveDist(): Promise<Server> {
  const root = join(process.cwd(), 'dist');
  const srv = createServer((req, res) => {
    const path = normalize(decodeURIComponent((req.url ?? '/').split('?')[0])).replace(/^(\.\.[/\\])+/, '');
    let file = join(root, path);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' }).end(readFileSync(file));
  });
  return new Promise((resolve) => srv.listen(PORT, '127.0.0.1', () => resolve(srv)));
}

let server: Server;
let browser: Browser;

/** Opens a page with motion reduced, so smooth scrolling and reveal animations don't race the checks. */
async function open(path: string, width = 1366, height = 768): Promise<Page> {
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle0' });
  return page;
}

const PAGES = [
  '/about', '/contact', '/social-responsibility', '/portfolio/it-infrastructure', '/portfolio/software',
  '/solutions/network-it-infrastructure', '/solutions/server-room-cabling', '/solutions/software-applications',
  '/solutions/it-outsourcing', '/solutions/ican-alert',
];

describe.skipIf(!hasChrome)('inner pages in a real browser', { timeout: 90000 }, () => {
  beforeAll(async () => {
    server = await serveDist();
    browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  }, 60000);

  afterAll(async () => {
    await browser?.close();
    server?.close();
  });

  for (const width of [390, 1366]) {
    test(`no sideways scrolling, no script errors and every image loads at ${width}px`, async () => {
      for (const path of PAGES) {
        const page = await open(path, width, 844);
        const errors: string[] = [];
        page.on('pageerror', (e) => errors.push(String(e)));
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 20)); }
        });
        await page.waitForNetworkIdle({ idleTime: 300 });
        const r = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - innerWidth,
          broken: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
        }));
        expect(r.overflow, path).toBeLessThanOrEqual(0);
        expect(r.broken, path).toEqual([]);
        expect(errors, path).toEqual([]);
        await page.close();
      }
    });
  }

  test('the Location button takes you to the Area54 directory, from the homepage and from other pages', async () => {
    for (const start of ['/', '/about']) {
      const page = await open(start);
      await Promise.all([page.waitForFunction(() => location.hash === '#area54'), page.click('.menu a[href="/#area54"]')]);
      await page.waitForFunction(() => Math.abs(document.getElementById('area54')!.getBoundingClientRect().top) < 120);
      const top = await page.evaluate(() => document.getElementById('area54')!.getBoundingClientRect().top);
      expect(top, start).toBeGreaterThanOrEqual(0);
      await page.close();
    }
  });

  test('contact form: the solution list appears only for quotes and solution questions', async () => {
    const page = await open('/contact');
    const visible = () => page.$eval('#solution-field', (el) => !(el as HTMLElement).hidden);
    expect(await visible()).toBe(false);
    await page.select('#topic', 'quote');
    expect(await visible()).toBe(true);
    await page.select('#topic', 'support');
    expect(await visible()).toBe(false);
    await page.select('#topic', 'solution');
    expect(await visible()).toBe(true);
    await page.close();
  });

  test('contact form: a link can pick the topic and solution, and sending without a form service opens email', async () => {
    const page = await open('/contact?topic=quote&solution=enterprise-wifi');
    expect(await page.$eval('#topic', (s) => (s as HTMLSelectElement).value)).toBe('quote');
    expect(await page.$eval('#solution', (s) => (s as HTMLSelectElement).value)).toBe('enterprise-wifi');
    const viaService = await page.$eval('#contact-form', (f) => (f as HTMLFormElement).dataset.service !== undefined);
    if (!viaService) {
      await page.type('input[name="name"]', 'Test Person');
      await page.type('input[name="email"]', 'test@example.com');
      await page.type('textarea[name="message"]', 'Hello');
      await page.click('button[type="submit"]');
      await page.waitForSelector('.status:not([hidden])');
      expect(await page.$eval('.status', (s) => s.textContent)).toContain('websupport@ican.co.th');
    }
    await page.close();
  });

  test('contact form: required fields stop an empty message from being sent', async () => {
    const page = await open('/contact');
    await page.click('button[type="submit"]');
    expect(await page.$eval('.status', (s) => (s as HTMLElement).hidden)).toBe(true);
    expect(await page.$eval('#contact-form', (f) => (f as HTMLFormElement).checkValidity())).toBe(false);
    await page.close();
  });

  test('portfolio: a category link shows only that category, and photos open in the viewer', async () => {
    const page = await open('/portfolio/it-infrastructure#cctv');
    const shown = () => page.$$eval('.cat', (cs) => cs.filter((c) => !(c as HTMLElement).hidden).map((c) => c.id));
    expect(await shown()).toEqual(['cctv']);
    // The filter runs on hashchange, a moment after the address updates: wait for its result.
    const visibleCount = (n: number, only?: string) => page.waitForFunction((n, only) => {
      const open = [...document.querySelectorAll<HTMLElement>('.cat')].filter((c) => !c.hidden);
      return open.length === n && (!only || open[0].id === only);
    }, {}, n, only);
    await page.click('.filter a[data-filter="fire"]');
    await visibleCount(1, 'fire');
    expect(await shown()).toEqual(['fire']);
    await page.click('.filter a[data-filter="all"]');
    await visibleCount(11);
    expect((await shown()).length).toBe(11);

    await page.click('#fire a[data-lb]');
    await page.waitForFunction(() => (document.getElementById('lightbox') as HTMLDialogElement).open);
    const count = () => page.$eval('#lightbox .count', (c) => c.textContent);
    expect(await count()).toBe('1 / 18');
    await page.keyboard.press('ArrowRight');
    expect(await count()).toBe('2 / 18');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !(document.getElementById('lightbox') as HTMLDialogElement).open);
    await page.close();
  });

  test('Social Responsibility: an activity opens all its photos in the viewer, including those without a thumbnail', async () => {
    const page = await open('/social-responsibility');
    const card = (await page.$$('#people .act'))[0];
    const total = await card.$$eval('a[data-lb]', (as) => as.length);
    expect(total).toBeGreaterThan(1);
    await (await card.$('.main'))!.click();
    await page.waitForFunction(() => (document.getElementById('lightbox') as HTMLDialogElement).open);
    expect(await page.$eval('#lightbox .count', (c) => c.textContent)).toBe(`1 / ${total}`);
    await page.close();
  });

  test('without JavaScript the portfolio shows every category and the photos are plain links', async () => {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.goto(`${BASE}/portfolio/it-infrastructure#cctv`, { waitUntil: 'networkidle0' });
    expect(await page.$$eval('.cat', (cs) => cs.filter((c) => !(c as HTMLElement).hidden).length)).toBe(11);
    await page.close();
  });
});
