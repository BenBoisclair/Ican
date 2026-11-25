// Renders the branded share image (public/og/ican.jpg, 1200×630) used when a page without its own photo is shared.
// Run with `npm run og` after changing the headline, logo or photo. Uses the Chrome installed on this Mac.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = process.cwd();
const file = (p) => pathToFileURL(join(root, p)).href;
const font = (w) => file(`node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-${w}-normal.woff2`);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: Plex; font-weight: 500; src: url(${font(500)}); }
  @font-face { font-family: Plex; font-weight: 600; src: url(${font(600)}); }
  @font-face { font-family: Plex; font-weight: 700; src: url(${font(700)}); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; display: grid; grid-template-columns: 660px 540px; font-family: Plex, sans-serif; color: #0F1B33; background: #fff; }
  .text { display: flex; flex-direction: column; padding: 56px 56px 48px 64px; background: linear-gradient(180deg, #F5F8FD 0%, #fff 100%); }
  .logo { height: 64px; width: auto; align-self: flex-start; }
  h1 { margin-top: auto; font-size: 54px; line-height: 1.08; font-weight: 700; letter-spacing: -.02em; }
  h1 span { color: #143A93; white-space: nowrap; }
  p { margin-top: 22px; font-size: 25px; line-height: 1.4; color: #3F4B66; font-weight: 500; }
  .foot { margin-top: auto; display: flex; gap: 14px; font-size: 20px; font-weight: 600; color: #2453C4; letter-spacing: .02em; }
  .foot i { font-style: normal; color: #A6B2C9; }
  .photo { background: url(${file('src/assets/images/hero-cabling.jpg')}) center / cover; }
</style></head><body>
  <div class="text">
    <img class="logo" src="${file('src/assets/images/ican-logo.png')}" alt="">
    <h1>Your Trusted Partner<br>in <span>IT Solutions.</span></h1>
    <p>Network, security, server rooms, Wi-Fi and software for businesses in Thailand.</p>
    <div class="foot"><span>Bangkok</span><i>·</i><span>Since 1999</span><i>·</i><span>ican.co.th</span></div>
  </div>
  <div class="photo"></div>
</body></html>`;

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
// Loaded from a file so Chrome lets it use the local fonts and images.
const tmp = mkdtempSync(join(tmpdir(), 'ican-og-'));
writeFileSync(join(tmp, 'og.html'), html);
await page.goto(pathToFileURL(join(tmp, 'og.html')).href, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
mkdirSync(join(root, 'public/og'), { recursive: true });
await page.screenshot({ path: join(root, 'public/og/ican.jpg'), type: 'jpeg', quality: 86 });
await browser.close();
rmSync(tmp, { recursive: true, force: true });
console.log('Wrote public/og/ican.jpg');
