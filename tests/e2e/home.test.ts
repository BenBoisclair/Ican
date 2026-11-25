// @vitest-environment node
// Real-browser checks against the built site, using the Chrome already installed on this Mac.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { extname, join, normalize } from 'node:path';
import puppeteer, { type Browser, type Page } from 'puppeteer-core';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 4330;
const URL = `http://127.0.0.1:${PORT}/`;
const hasChrome = existsSync(CHROME);
if (!hasChrome) console.warn(`Skipping e2e: Chrome not found at ${CHROME}`);

let server: Server;
let browser: Browser;

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.woff': 'font/woff',
};

/** Minimal static server for dist/ (Astro's preview allows only one instance per machine). */
function serveDist(): Promise<Server> {
  const root = join(process.cwd(), 'dist');
  const srv = createServer((req, res) => {
    let path = normalize(decodeURIComponent((req.url ?? '/').split('?')[0])).replace(/^(\.\.[/\\])+/, '');
    let file = join(root, path);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' }).end(readFileSync(file));
  });
  return new Promise((resolve) => srv.listen(PORT, '127.0.0.1', () => resolve(srv)));
}

async function open(width: number, height: number, setup?: (p: Page) => Promise<void>): Promise<Page> {
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  if (setup) await setup(page);
  await page.goto(URL, { waitUntil: 'networkidle0' });
  return page;
}

describe.skipIf(!hasChrome)('homepage in a real browser', { timeout: 60000 }, () => {
  beforeAll(async () => {
    server = await serveDist();
    browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  }, 60000);

  afterAll(async () => {
    await browser?.close();
    server?.close();
  });

  for (const [w, h] of [[375, 800], [1440, 900]] as const) {
    test(`no sideways scrolling and floating cards stay on screen at ${w}px`, async () => {
      const page = await open(w, h);
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        cards: [...document.querySelectorAll('.fcard')]
          .map((el) => el.getBoundingClientRect())
          .filter((r) => r.width > 0)
          .map((r) => ({ left: Math.round(r.left), right: Math.round(r.right) })),
        vw: window.innerWidth,
      }));
      expect(result.overflow).toBeLessThanOrEqual(0);
      expect(result.cards.length).toBeGreaterThan(0);
      for (const c of result.cards) {
        expect(c.left).toBeGreaterThanOrEqual(0);
        expect(c.right).toBeLessThanOrEqual(result.vw);
      }
      await page.close();
    });
  }

  // Laptop 1366x768 minus ~110px of browser toolbars; iPhone 14 with Safari's bars showing.
  for (const [w, h] of [[1366, 658], [390, 664]] as const) {
    test(`all client logos fit on one screen below the sticky header at ${w}x${h}`, async () => {
      const page = await open(w, h);
      const fit = await page.evaluate(() => {
        const header = document.querySelector('.nav')!.getBoundingClientRect().height;
        const head = document.querySelector('#clients .sec-head')!.getBoundingClientRect();
        const card = document.querySelector('#clients .logo-card')!.getBoundingClientRect();
        return { needed: card.bottom - head.top, available: window.innerHeight - Math.min(header, 64) };
      });
      expect(fit.needed).toBeLessThanOrEqual(fit.available);
      await page.close();
    });
  }

  // Reduced motion keeps scrolling instant and skips the reveal slide, so pins stay put while the mouse moves.
  const still = (p: Page) => p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  test('Area54 on desktop: hovering a pin opens its card on the photo, one at a time', async () => {
    const page = await open(1440, 900, still);
    await page.$eval('#area54', (el) => el.scrollIntoView());
    await page.waitForSelector('astro-island[component-url*="Area54"]:not([ssr])');
    for (const id of [1, 2, 3, 4, 5, 6]) {
      await page.hover(`.pin[data-spot="${id}"]`);
      const r = await page.evaluate((id) => {
        const photo = document.querySelector('.directory .photo')!.getBoundingClientRect();
        const card = document.getElementById(`spot-${id}`)!.getBoundingClientRect();
        const visible = [...document.querySelectorAll('.spot')].filter((el) => getComputedStyle(el).display !== 'none').length;
        return { visible, inside: card.left >= photo.left && card.right <= photo.right && card.top >= photo.top && card.bottom <= photo.bottom };
      }, id);
      expect(r, `spot ${id}`).toEqual({ visible: 1, inside: true });
    }
    await page.close();
  });

  for (const width of [1200, 1366, 1440, 1920]) {
    test(`Area54 on desktop: an open card never covers another pin, and stays on the photo (${width}px)`, async () => {
      const page = await open(width, 900, still);
      await page.$eval('#area54', (el) => el.scrollIntoView());
      await page.waitForSelector('astro-island[component-url*="Area54"]:not([ssr])');
      const ids = await page.$$eval('.pin', (ps) => ps.map((p) => (p as HTMLElement).dataset.spot!));
      for (const id of ids) {
        await page.$eval(`.pin[data-spot="${id}"]`, (p) => p.dispatchEvent(new MouseEvent('mouseenter')));
        await page.waitForSelector(`.directory[data-open] .spot[data-spot="${id}"][data-shown]`, { visible: true });
        const r = await page.evaluate((id) => {
          const card = document.querySelector(`.spot[data-spot="${id}"]`)!.getBoundingClientRect();
          const photo = document.querySelector('.directory .photo')!.getBoundingClientRect();
          const covered = [...document.querySelectorAll<HTMLElement>('.pin')].filter((p) => p.dataset.spot !== id).filter((p) => {
            const b = p.getBoundingClientRect();
            return b.left < card.right && b.right > card.left && b.top < card.bottom && b.bottom > card.top;
          }).map((p) => p.dataset.spot);
          return { covered, inside: card.top >= photo.top - 1 && card.bottom <= photo.bottom + 1 && card.left >= photo.left - 1 && card.right <= photo.right + 1 };
        }, id);
        expect(r, `card ${id}`).toEqual({ covered: [], inside: true });
      }
      await page.close();
    });
  }

  test('Area54 on phones: only the picked card shows, under the photo', async () => {
    const page = await open(375, 800, still);
    await page.$eval('#area54', (el) => el.scrollIntoView());
    await page.waitForSelector('astro-island[component-url*="Area54"]:not([ssr])');
    await page.tap('.pin[data-spot="3"]');
    const r = await page.evaluate(() => {
      const photo = document.querySelector('.directory .photo')!.getBoundingClientRect();
      const visible = [...document.querySelectorAll<HTMLElement>('.spot')].filter((el) => getComputedStyle(el).display !== 'none');
      return { ids: visible.map((el) => el.dataset.spot), below: visible[0].getBoundingClientRect().top >= photo.bottom };
    });
    expect(r).toEqual({ ids: ['3'], below: true });
    await page.close();
  });

  test('"All services" opens the full Chang ICAN service list', async () => {
    const page = await open(1440, 900, still);
    expect(await page.$eval('#chang .svc-list', (el) => el.checkVisibility())).toBe(false);
    await page.click('#chang summary .all');
    expect(await page.$eval('#chang .svc-list', (el) => el.checkVisibility())).toBe(true);
    await page.close();
  });

  test('"All services" slides open and closed instead of jumping', async () => {
    const page = await open(1440, 900, (p) => p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]));
    const height = () => page.$eval('#chang .svc-list', (el) => el.getBoundingClientRect().height);
    await page.click('#chang summary .all');
    await new Promise((r) => setTimeout(r, 90));
    const mid = await height();
    await new Promise((r) => setTimeout(r, 450));
    const full = await height();
    expect(full).toBeGreaterThan(40);
    expect(mid).toBeLessThan(full);
    await page.click('#chang summary .all');
    await page.waitForFunction(() => !(document.querySelector('#chang details') as HTMLDetailsElement).open, { timeout: 2000 });
    await page.close();
  });

  test('scrolling a few pixels never makes the header flicker or the page shake', async () => {
    for (const delta of [12, 18, 24]) {
      const page = await open(1440, 900);
      await page.mouse.move(700, 600);
      await page.mouse.wheel({ deltaY: delta });
      const flips = await page.evaluate(() => new Promise<number>((done) => {
        const nav = document.querySelector('.nav')!;
        let last = nav.classList.contains('scrolled');
        let n = 0;
        const id = setInterval(() => { const now = nav.classList.contains('scrolled'); if (now !== last) { n++; last = now; } }, 5);
        setTimeout(() => { clearInterval(id); done(n); }, 800);
      }));
      expect(flips, `${delta}px`).toBeLessThanOrEqual(1);
      await page.close();
    }
  });

  test('every image on the page loads after scrolling through it', async () => {
    const page = await open(1440, 900);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
    });
    await page.waitForNetworkIdle({ idleTime: 500 });
    const broken = await page.evaluate(() =>
      [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.alt || i.src));
    expect(broken).toEqual([]);
    await page.close();
  });

  test('keyboard: Tab goes from "Solutions" straight into its menu, even when held down', async () => {
    const page = await open(1440, 900);
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      if (await page.evaluate(() => document.activeElement?.textContent?.trim() === 'Solutions')) break;
    }
    expect(await page.evaluate(() => document.activeElement?.textContent?.trim())).toBe('Solutions');
    await page.keyboard.press('Tab'); // immediately, like a held-down key
    expect(await page.evaluate(() => !!document.activeElement?.closest('.drop'))).toBe(true);
    await page.close();
  });

  test('reduced motion: everything is visible at once and the counter reads 27+', async () => {
    const page = await open(1440, 900, (p) => p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]));
    const hidden = await page.evaluate(() => [...document.querySelectorAll('.rv')].filter((el) => getComputedStyle(el).opacity !== '1').length);
    expect(hidden).toBe(0);
    expect(await page.$eval('.fc1 strong', (el) => el.textContent?.trim())).toBe('27+');
    await page.close();
  });

  test('without JavaScript every section is still visible', async () => {
    const page = await open(1440, 900, (p) => p.setJavaScriptEnabled(false));
    const hidden = await page.evaluate(() => [...document.querySelectorAll('.rv')].filter((el) => getComputedStyle(el).opacity !== '1').length);
    expect(hidden).toBe(0);
    await page.close();
  });

  test('phone menu opens from the button and closes with Escape', async () => {
    const page = await open(375, 800);
    await page.waitForSelector('astro-island[component-url*="MobileMenu"]:not([ssr])');
    await page.click('button.burger');
    expect(await page.$eval('#mobile-panel', (el) => getComputedStyle(el).display)).not.toBe('none');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => getComputedStyle(document.getElementById('mobile-panel')!).display === 'none');
    expect(await page.$eval('button.burger', (el) => el.getAttribute('aria-expanded'))).toBe('false');
    await page.close();
  });

  test('phone menu closes when the window widens past 960px (e.g. tablet rotation)', async () => {
    const page = await open(375, 800);
    await page.waitForSelector('astro-island[component-url*="MobileMenu"]:not([ssr])');
    await page.click('button.burger');
    await page.setViewport({ width: 1024, height: 768 });
    await page.waitForFunction(() => getComputedStyle(document.getElementById('mobile-panel')!).display === 'none');
    expect(await page.$eval('button.burger', (el) => el.getAttribute('aria-expanded'))).toBe('false');
    await page.close();
  });

  test('printing the page shows every section', async () => {
    const page = await open(1440, 900);
    await page.emulateMediaType('print');
    const hidden = await page.evaluate(() => [...document.querySelectorAll('.rv')].filter((el) => getComputedStyle(el).opacity !== '1').length);
    expect(hidden).toBe(0);
    await page.close();
  });

  test('if the animation script fails, content still appears within a few seconds', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.setRequestInterception(true);
    // The motion script ships either inline or as its own file, depending on its size: break it either way.
    page.on('request', (req) => {
      if (req.url().includes('/_astro/BaseLayout')) { req.abort(); return; }
      if (req.resourceType() !== 'document') { req.continue(); return; }
      const broken = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf8')
        .replace(/<script type="module">[\s\S]*?initMotion[\s\S]*?<\/script>/, '<script type="module">throw new Error("simulated motion failure")</script>');
      req.respond({ status: 200, contentType: 'text/html; charset=utf-8', body: broken });
    });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 3500));
    const hidden = await page.evaluate(() => [...document.querySelectorAll('.rv')].filter((el) => getComputedStyle(el).opacity !== '1').length);
    expect(hidden).toBe(0);
    await page.close();
  });
});
