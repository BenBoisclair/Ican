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
    page.on('request', (req) => {
      if (req.resourceType() !== 'document') { req.continue(); return; }
      const broken = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf8')
        .replace(/<script type="module">[\s\S]*?<\/script>/, '<script type="module">throw new Error("simulated motion failure")</script>');
      req.respond({ status: 200, contentType: 'text/html; charset=utf-8', body: broken });
    });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 3500));
    const hidden = await page.evaluate(() => [...document.querySelectorAll('.rv')].filter((el) => getComputedStyle(el).opacity !== '1').length);
    expect(hidden).toBe(0);
    await page.close();
  });
});
