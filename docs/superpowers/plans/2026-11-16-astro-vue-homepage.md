# ICAN Homepage (Astro + Vue) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the approved homepage mockup v5 as a static Astro 7 site with Vue islands, matching it visually and behaviourally.

**Architecture:** Every section is an `.astro` component rendered to static HTML; Vue 3 islands only for the mobile menu, the 27+ counter and the Area54 pin/card directory. Copy and data live in typed modules under `src/data/`; images go through `astro:assets`; small page-wide behaviours (scroll reveal, nav compaction, parallax) live in one script.

**Tech Stack:** Node 24 (via nvm, `.nvmrc`), Astro ^7.4, @astrojs/vue ^7.1, Vue ^3.5, lucide-vue-next ^1.0, @fontsource/ibm-plex-sans + @fontsource/ibm-plex-sans-thai ^5.3, Vitest ^5 + @vue/test-utils + jsdom (unit), puppeteer-core with the system Chrome (e2e), @astrojs/check + TypeScript ^5.9.

**Spec:** `docs/superpowers/specs/2026-11-16-astro-vue-conversion-design.md`

**Source of truth for look and copy:** mockup `.superpowers/brainstorm/63379-1794823468/content/homepage-v5.html` (CSS lines 12–239, markup 244–463, behaviour 465–528) and `content/homepage.md`. Button styles: `.combo` and `.lnk.underline` in `.superpowers/brainstorm/63379-1794823468/content/buttons.html`.

## Global Constraints

- Node: `.nvmrc` = `24`; every command runs after `source ~/.nvm/nvm.sh && nvm use` (Astro 7 requires Node ≥ 22.23.4; the machine default is 22.18.0).
- Output: `output: 'static'`; `npm run build` writes `dist/`.
- No runtime requests to third-party hosts: built HTML/CSS/JS must not contain `fonts.googleapis.com`, `fonts.gstatic.com`, `unpkg.com`, `cdnjs`, `jsdelivr`.
- Tokens (exact): `--blue:#143A93; --blue-600:#0F2E78; --blue-800:#0A2160; --blue-500:#2453C4; --accent:#2F63E0; --tint:#F5F8FD; --tint-2:#EEF3FC; --ink:#0F1B33; --muted:#55617A; --line:#E3E8F2; --ease:cubic-bezier(.2,.7,.2,1)`.
- Fonts: IBM Plex Sans 400/500/600/700, IBM Plex Sans Thai 500/600 (Thai strings).
- Buttons = "Recommended mix" (primary: hover `--blue-600`, translateY(-2px), shadow `0 12px 24px -8px rgba(20,58,147,.5)`, arrow translateX(4px); secondary: hover background `--tint-2` + inset 1.5px `--blue` outline; active scale(.98)). Text links = "Underline draw" (2px underline grows 0→100% on hover). Focus ring on all interactive elements: `outline:3px solid #8DB0FF; outline-offset:3px`.
- Client's v5 fixes are requirements: no pill above the headline; hero main photo has no zoom animation; solution cards hover = border tint only (no shadow, no lift); no "Solutions" eyebrow; clients heading "Trusted by"; portfolio photos do not zoom on hover; Chang ICAN secondary photo sits top-right (`top:0; right:0; width:28%`, media padding `8% 4% 0 0`).
- Motion is "Moderate" and fully disabled under `prefers-reduced-motion: reduce`. Reveal-hidden styles apply only under `html.js` so content shows without JavaScript.
- `old-site/`, `content/`, `assets/`, `.superpowers/` are reference only; nothing in `src/` imports from them at runtime (assets are copied into `src/assets/` once in Task 2).
- Commit messages: imperative, no attribution trailers.

## Review Focus

- JavaScript disabled or an island failing to load → every section's content still visible (no stuck `opacity:0`). Tests: Task 4 build test, Task 8 e2e.
- `prefers-reduced-motion: reduce` → nothing animates; counter reads `27+` immediately. Tests: Task 4 unit, Task 8 e2e.
- A 375px phone → no sideways scrolling; hero floating cards stay inside the viewport. Test: Task 8 e2e.
- Keyboard-only visitor → Tab reaches the Solutions/Portfolio dropdown items and the mobile menu toggle; Escape closes the mobile menu. Tests: Task 3 unit, Task 8 e2e.
- A broken in-page anchor or unsafe external link → every `href="#x"` has a matching `id="x"`; every `target="_blank"` link has `rel="noopener"`. Test: Task 7 build test.

---

## File Structure

```
.nvmrc, package.json, astro.config.mjs, tsconfig.json, vitest.config.ts
src/
  styles/global.css            tokens, base, .wrap, buttons, links, eyebrow, h2, sec-head, reveal
  layouts/BaseLayout.astro     <head> (meta, fonts, html.js script), SiteHeader, slot, SiteFooter, motion script
  lib/icons.ts                 IconName → lucide-vue-next component map
  lib/assets.ts                img(path) → ImageMetadata from src/assets
  components/Icon.astro        <Icon name size class/> renders a Lucide icon (no hydration)
  components/SiteHeader.astro  desktop nav + dropdowns, hosts MobileMenu island
  components/SiteFooter.astro
  components/home/Hero.astro, Solutions.astro, StartEasy.astro, Clients.astro, WhyIcan.astro, Projects.astro, Area54.astro
  components/islands/MobileMenu.vue, CountUp.vue, Area54Directory.vue
  scripts/motion.ts            reveal observer, nav compaction, parallax
  data/site.ts                 company info, nav, phones
  data/home.ts                 all homepage copy and data
  assets/images/*, assets/logos/*, assets/logos/trusted/*
  pages/index.astro
tests/unit/*.test.ts           jsdom
tests/build.test.ts            reads dist/ (node env)
tests/e2e/home.test.ts         puppeteer-core + system Chrome (node env)
```

---

### Task 1: Project scaffold, global styles, layout shell

**Files:**
- Create: `.nvmrc`, `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `tests/build.test.ts`
- Modify: `.gitignore` (add `node_modules/`, `dist/`, `.astro/`)

**Interfaces:**
- Produces: `BaseLayout` props `{ title: string; description: string }`; global classes `.wrap .btn .btn-primary .btn-ghost .btn-lg .link .eyebrow .sec-head .sec-head.row .rv .in`; npm scripts `dev`, `build`, `check`, `test:unit`, `test:build`, `test:e2e`, `test`.

- [ ] **Step 1: Node + dependencies.** `.nvmrc` = `24`; run `source ~/.nvm/nvm.sh && nvm install && nvm use`. `npm init -y`, set `"type":"module"`, `"private":true`, `"engines":{"node":">=22.23.4"}`; install deps: `astro@^7.4 @astrojs/vue@^7.1 vue@^3.5 lucide-vue-next@^1 @fontsource/ibm-plex-sans@^5.3 @fontsource/ibm-plex-sans-thai@^5.3`; dev deps: `vitest@^5 @vue/test-utils@^2.6 jsdom puppeteer-core @astrojs/check typescript@^5.9`.
- [ ] **Step 2: Config.** `astro.config.mjs`: `integrations:[vue()]`, `output:'static'`, `site:'https://www.ican.co.th'`. `tsconfig.json` extends `astro/tsconfigs/strict`. `vitest.config.ts` uses `getViteConfig` from `astro/config` with `test.environment:'jsdom'`, `include:['tests/**/*.test.ts']`. Scripts: `"test:unit":"vitest run tests/unit"`, `"test:build":"astro build && vitest run tests/build.test.ts"`, `"test:e2e":"astro build && vitest run tests/e2e"`, `"test":"npm run test:unit && npm run test:build"`, `"check":"astro check"`.
- [ ] **Step 3: Write the failing build test** (`// @vitest-environment node` at top) — `tests/build.test.ts`, helper `readDist(): string` concatenating `dist/index.html` + all `dist/**/*.css` + `dist/**/*.js`:

```ts
test('page shell', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  expect(html).toContain('<html lang="en"');
  expect(html).toContain('<title>ICAN Group | Your Trusted Partner in IT Solutions</title>');
  expect(html).toMatch(/<meta name="description" content="[^"]+"/);
  expect(html).toContain("document.documentElement.classList.add('js')");
});
test('no third-party CDNs', () => {
  for (const host of ['fonts.googleapis.com','fonts.gstatic.com','unpkg.com','cdnjs','jsdelivr'])
    expect(readDist()).not.toContain(host);
});
test('reveal styles are gated on html.js', () => {
  expect(readDist()).toMatch(/\.js \.rv\{/);
});
```

- [ ] **Step 4: Run** `npm run test:build` → FAIL (no layout yet).
- [ ] **Step 5: Implement.** `global.css`: port mockup lines 12–38 (tokens per Global Constraints, base, `.wrap`, `.btn*`, `.eyebrow`, `h2`, `.sec-head`, `.link`) replacing button hover rules with the Recommended mix and `.link` with Underline draw; port motion lines 229–239 but write reveal as `.js .rv{…}` / `.js .rv.in{…}` inside `@media (prefers-reduced-motion:no-preference)`; omit `@keyframes kb`. `BaseLayout.astro`: imports `@fontsource/ibm-plex-sans/{400,500,600,700}.css`, `@fontsource/ibm-plex-sans-thai/{500,600}.css`, `global.css`; inline `<script is:inline>document.documentElement.classList.add('js')</script>` in `<head>`; `<slot/>`. `index.astro` uses `BaseLayout` with the title above and description `ICAN helps businesses build, assess, and improve their IT systems: infrastructure, security, software and consulting in Bangkok since 1999.`
- [ ] **Step 6: Run** `npm run test:build` → PASS; `npm run check` → 0 errors.
- [ ] **Step 7: Commit** `git add -A && git commit -m "Scaffold Astro + Vue site with global styles and layout"`

---

### Task 2: Data modules and assets

**Files:**
- Create: `src/data/site.ts`, `src/data/home.ts`, `src/lib/assets.ts`, `src/assets/**`, `tests/unit/data.test.ts`

**Interfaces:**
- Produces (exact):

```ts
// src/lib/icons.ts (type only here; map in Task 3)
export type IconName = 'network'|'shield-check'|'server'|'wifi'|'code-xml'|'clipboard-check'|'wrench'|'cable'|'app-window'|'history'|'scan-search'|'file-check'|'users'|'badge-check'|'check'|'plug-zap'|'hammer'|'truck'|'calendar-check'|'phone'|'smartphone'|'map-pin'|'arrow-right'|'arrow-up-right'|'chevron-down'|'menu'|'x'|'message-circle';
// src/lib/assets.ts
export function img(path: string): ImageMetadata; // path relative to src/assets, throws Error(`Missing asset: ${path}`)
// src/data/site.ts
export interface NavLink { label: string; href: string; icon: IconName; separatorBefore?: boolean }
export interface NavItem { label: string; href: string; children?: NavLink[] }
export interface Phone { display: string; note: string; tel: string; icon: IconName }
export const site: { legalName: string; address: string[]; mapsUrl: string; facebookUrl: string; phones: Phone[]; nav: NavItem[]; contact: { label: string; href: string } };
// src/data/home.ts
export interface Cta { label: string; href: string; variant: 'primary'|'ghost'; arrow?: boolean }
export interface Logo { file: string; name: string; white?: boolean; height?: number }
export interface Solution { title: string; blurb: string; icon: IconName; href: string }
export interface Spot { id: number; name: string; thaiName?: string; tag: string; text: string; pin: { left: number; top: number }; link?: { label: string; href: string; external: boolean } }
export const hero: { titleLead: string; titleHighlight: string; lead: string; ctas: Cta[]; trustedText: string; trustedCount: string; trustedLogos: Logo[]; images: { main: string; second: string }; cards: { icon: IconName; value: string; label?: string; countTo?: number }[] };
export const solutions: { heading: string; items: Solution[] };
export const startEasy: { eyebrow: string; thaiName: string; title: string; text: string; chips: { icon: IconName; label: string }[]; phone: { display: string; tel: string }; lineUrl: string; lineQr: string; allServicesHref: string; images: { main: string; second: string } };
export const clients: { eyebrow: string; heading: string; logos: Logo[] };
export const why: { eyebrow: string; heading: string; cta: Cta; certs: { key: string; chips: string[] }[]; items: { icon: IconName; title: string; text: string }[] };
export const projects: { eyebrow: string; heading: string; allHref: string; allLabel: string; items: { image: string; category: string; title: string }[] };
export const area54: { eyebrow: string; heading: string; sub: string; directionsUrl: string; image: string; spots: Spot[] };
```

- [ ] **Step 1: Copy assets.** From `.superpowers/brainstorm/63379-1794823468/content/` into `src/assets/images/`: `ican-logo.png hero-cabling.jpg hero-room.jpg pf-datacenter.jpg pf-cabling.jpg pf-rack.jpg pf-fiber.jpg pf-cctv.jpg pf-fire.jpg chang-team.jpg chang-photo.jpg chang-line-qr.png area54.jpg`. Into `src/assets/logos/`: every `logo-*.png` with the `logo-` prefix dropped (`c001.png … c045.png`, `ubon.png`, `partner1–5.png`, `synnex.png`). Into `src/assets/logos/trusted/`: `tlogo-c022.png→scg.png`, `tlogo-c024.png→ptt.png`, `tlogo-c009.png→7-eleven.png`, `tlogo-c016.png→loreal.png`, `tlogo-synnex.png→synnex.png`.
- [ ] **Step 2: Write the failing test** `tests/unit/data.test.ts`:

```ts
test('solutions', () => {
  expect(solutions.heading).toBe('Our Solutions');
  expect(solutions.items.map(s => s.title)).toEqual(['Network & IT Infrastructure','IT Security Assessment','Server Room & Cabling Solutions','Enterprise Wi-Fi Solutions','Software & Application Solutions','IT Consulting & Assessment']);
});
test('clients', () => {
  expect(clients.heading).toBe('Trusted by');
  expect(clients.logos).toHaveLength(52);
  expect(clients.logos[4]).toMatchObject({ file: 'logos/synnex.png', name: 'Synnex' });
  expect(clients.logos.filter(l => l.white)).toHaveLength(5);
  expect(clients.logos.every(l => l.name.length > 0)).toBe(true);
  for (const l of clients.logos) expect(() => img(l.file)).not.toThrow();
});
test('contact data', () => {
  expect(site.phones.map(p => p.tel)).toEqual(['tel:+6622723111','tel:+66846723111']);
  expect(startEasy.phone.tel).toBe('tel:+66816135243');
  expect(startEasy.lineUrl).toBe('https://lin.ee/zk70Gu8');
  expect(site.facebookUrl).toBe('https://www.facebook.com/ICAN.Admin/');
});
test('area54', () => {
  expect(area54.spots.map(s => s.id)).toEqual([1,2,3,4,5,6]);
  expect(area54.spots.filter(s => s.link?.external).map(s => s.id)).toEqual([1,3,5]);
  expect(area54.directionsUrl).toBe('https://www.google.com/maps/search/?api=1&query=Area54+Vibhavadi');
});
test('certs spelled correctly', () => {
  expect(why.certs.flatMap(c => c.chips)).toContain('Panduit');
});
```

- [ ] **Step 3: Run** `npm run test:unit -- data` → FAIL (modules missing).
- [ ] **Step 4: Implement** `img()` with `import.meta.glob('/src/assets/**/*.{png,jpg}', { eager: true, import: 'default' })`. Fill `site.ts`/`home.ts` with copy exactly as in `content/homepage.md` and mockup markup (nav from mockup lines 244–288; pins/links/tags from lines 413–438; certs/items from 371–394; projects 395–411; hero cards: `{history, '27+', 'Years in IT services', countTo:27}`, `{badge-check, 'CCIE · CCNP · CCNA', 'Cisco-certified experts'}`, `{check, 'Assessment first'}`). Trusted logos with heights: SCG 26, PTT 30, 7-Eleven 36, L'Oréal 22, Synnex 19. Client order: c001–c004, synnex, c005–c045, ubon, partner1–5 (white). Client names in that order: B.Grimm, INSEE (Siam City Cement), Lucky Resources & Logistics, Merck, Synnex, Lyreco, UNIS Thai, Jacto, Thoresen Thai Agencies, 7-Eleven, INSEE Concrete, EGCO Group, Roongthong Wattana, World Health Organization Thailand, Bangkok Airways, PTT Digital, L'Oréal Thailand, Conwood, Central Marketing Group, BIG, AACP, Embassy of the United States, SCG, Bank of Thailand, PTT, Siam Shoreside Services, LafargeHolcim, MSD, Magotteaux, INSEE Ecocycle, Nipat Associates, CPF, Dextra, Nokia, TenCate, Federal Electric Corp, Ovaltine, Beko, True, Nielsen, Mead Johnson Nutrition, Red Bull, X-Speed, Sharp, Soiha Intergroup, Team Group, Ubon Bio Ethanol, AkzoNobel, Alberta Centennial, Alamo Water, ASTD, Health.
- [ ] **Step 5: Run** `npm run test:unit -- data` → PASS.
- [ ] **Step 6: Commit** `git commit -m "Add homepage data modules and web assets"`

---

### Task 3: Icons, header with mobile menu, footer

**Files:**
- Create: `src/lib/icons.ts` (map), `src/components/Icon.astro`, `src/components/SiteHeader.astro`, `src/components/islands/MobileMenu.vue`, `src/components/SiteFooter.astro`, `tests/unit/MobileMenu.test.ts`
- Modify: `src/layouts/BaseLayout.astro` (render header/footer), `tests/build.test.ts`

**Interfaces:**
- Consumes: `site`, `IconName`, `img()`.
- Produces: `<Icon name={IconName} size?={number} class?={string} />`; `MobileMenu.vue` props `{ nav: NavItem[]; contact: { label: string; href: string } }`, mounted with `client:media="(max-width: 960px)"`.

- [ ] **Step 1: Write failing tests.** `MobileMenu.test.ts`: toggle button has `aria-expanded="false"` and `aria-controls` pointing at the panel; click → `"true"` and panel visible; pressing Escape → `"false"`; clicking a panel link → closed; panel lists every nav item and child plus the contact link. Build test additions: header contains the 7 Solutions dropdown labels (6 solutions + `Chang ICAN — Home & Office Technicians` after a separator) and Portfolio children `IT Infrastructure`, `Software & Application`; footer contains `International Computing And Networking Co., Ltd.`, both `tel:` hrefs, the Facebook URL with `target="_blank"` and `rel="noopener"`, and `© 2026`.
- [ ] **Step 2: Run** `npm run test:unit -- MobileMenu` and `npm run test:build` → FAIL.
- [ ] **Step 3: Implement.** `icons.ts` maps each `IconName` to its `lucide-vue-next` export (`network→Network`, `shield-check→ShieldCheck`, …, `x→X`). `Icon.astro` renders the Vue component without a client directive (static SVG). Header/footer markup and CSS from mockup lines 39–69 / 211–228 and 244–288 / 440–463; dropdowns open on `:hover` and `:focus-within`; ICAN logo via `<Image>` (height 44, `alt="ICAN — International Computing And Networking Co., Ltd."`). Nav compaction styles (`.nav.scrolled`) stay in header CSS; the class is toggled by `motion.ts` (Task 4).
- [ ] **Step 4: Run** both test commands → PASS.
- [ ] **Step 5: Commit** `git commit -m "Add site header with mobile menu island and footer"`

---

### Task 4: Hero, counter island, motion script

**Files:**
- Create: `src/components/home/Hero.astro`, `src/components/islands/CountUp.vue`, `src/scripts/motion.ts`, `tests/unit/CountUp.test.ts`
- Modify: `src/pages/index.astro`, `src/layouts/BaseLayout.astro` (load `motion.ts` via `<script>`), `tests/build.test.ts`

**Interfaces:**
- Consumes: `hero`, `Icon`, `img()`.
- Produces: `CountUp.vue` props `{ to: number; suffix?: string /* default '+' */; duration?: number /* default 1400 */ }`, `client:visible`; `motion.ts` exports `initMotion(): void` (adds `.in` to `.rv` on intersect with `threshold:.12, rootMargin:'0px 0px -6% 0px'`; toggles `.nav.scrolled` when `scrollY > 10`; parallax for `.tile img` — used by Task 6).

- [ ] **Step 1: Write failing tests.** `CountUp.test.ts`: initial render text is `27+` (no-JS fallback); with `matchMedia('(prefers-reduced-motion: reduce)')` mocked true, text stays `27+` after mount and timers; with motion allowed, mount then advance fake timers/rAF by 1400ms → text `27+`, and mid-way (700ms) text is a number < 27 without `+`. Build test additions: hero contains `Your Trusted Partner in`, `IT Solutions.`, `ICAN helps businesses build, assess, and improve their IT systems.`, `Trusted by`, `50+ organizations`, five `<img` with alts `SCG`, `PTT`, `7-Eleven`, `L'Oréal Thailand`, `Synnex`; does **not** contain `Established 1999 · Bangkok`; built CSS does not contain `@keyframes kb`.
- [ ] **Step 2: Run** unit + build tests → FAIL.
- [ ] **Step 3: Implement.** Hero markup/CSS from mockup lines 70–108 and 289–319 minus the pill (h1 `margin:0 0 22px`), main image without animation; underline SVG path `M4 16 C 90 6, 200 4, 396 12`, drawn via `.js h1.in .hl path{stroke-dashoffset:0}`; floating cards float only under `prefers-reduced-motion:no-preference`; images via `<Image>` with `widths` so `dist` serves resized WebP. `CountUp` renders `{{ display }}` starting at `${to}${suffix}`, animates with rAF and cubic ease-out when visible and motion allowed.
- [ ] **Step 4: Run** unit + build tests → PASS.
- [ ] **Step 5: Commit** `git commit -m "Add hero section, count-up island and motion script"`

---

### Task 5: Solutions and Start easy

**Files:**
- Create: `src/components/home/Solutions.astro`, `src/components/home/StartEasy.astro`
- Modify: `src/pages/index.astro`, `tests/build.test.ts`

**Interfaces:**
- Consumes: `solutions`, `startEasy`, `Icon`, `img()`.

- [ ] **Step 1: Write failing build tests.** Section `id="solutions"` contains `<h2>Our Solutions</h2>` with no `eyebrow` element before it inside that section; six titles and blurbs from `home.ts`; every built CSS rule whose selector contains `.sol` and `:hover` contains neither `box-shadow` nor `translate`; `id="chang"` contains `Start easy`, `ช่างไอแคน`, `href="tel:+66816135243"`, `href="https://lin.ee/zk70Gu8"` with `target="_blank"` and `rel="noopener"`, and four chips `Electrical & network`, `Handyman`, `Moving`, `Event setup`.
- [ ] **Step 2: Run** `npm run test:build` → FAIL.
- [ ] **Step 3: Implement** from mockup lines 109–145 and 321–361, with the hover and photo-position rules from Global Constraints; LINE QR popover on hover/focus.
- [ ] **Step 4: Run** `npm run test:build` → PASS.
- [ ] **Step 5: Commit** `git commit -m "Add solutions directory and Start easy band"`

---

### Task 6: Trusted by, Why ICAN, projects

**Files:**
- Create: `src/components/home/Clients.astro`, `src/components/home/WhyIcan.astro`, `src/components/home/Projects.astro`
- Modify: `src/pages/index.astro`, `tests/build.test.ts`

**Interfaces:**
- Consumes: `clients`, `why`, `projects`, `img()`; parallax from `initMotion()`.

- [ ] **Step 1: Write failing build tests.** `id="clients"` has `<h2>Trusted by</h2>` and exactly 52 logo `<img` elements each with a non-empty `alt`; `id="why"` contains `Experience, Technical Expertise, and Practical Solutions`, `Contact Our Team`, chips `Cisco CCIE`, `CCNP`, `CCNA`, `Systimax`, `Panduit`, `TQS / ISO 15504`, `Management level`, `Working level`, and the four item titles; `id="work"` has six captions from `home.ts` and `View full portfolio`; no built CSS rule with `.tile` and `:hover` changes `--s` or `scale`.
- [ ] **Step 2: Run** `npm run test:build` → FAIL.
- [ ] **Step 3: Implement** from mockup lines 146–186 and 363–411 (logo grid flex-centred, last row centred; white partner logos `filter:brightness(0);opacity:.72`).
- [ ] **Step 4: Run** `npm run test:build` → PASS.
- [ ] **Step 5: Commit** `git commit -m "Add client logos, Why ICAN and projects sections"`

---

### Task 7: Area54 directory island

**Files:**
- Create: `src/components/home/Area54.astro`, `src/components/islands/Area54Directory.vue`, `tests/unit/Area54Directory.test.ts`
- Modify: `src/pages/index.astro`, `tests/build.test.ts`

**Interfaces:**
- Consumes: `area54`, `Spot`; `Area54.astro` passes `imageSrc: string` from `getImage({ src: img(area54.image), width: 2200 })`.
- Produces: `Area54Directory.vue` props `{ spots: Spot[]; imageSrc: string; imageAlt: string }`, `client:visible`; exposes highlighted spot as `data-active` on the root for tests.

- [ ] **Step 1: Write failing tests.** Unit: hovering card 3 → pin 3 and card 3 get `.hl`, others don't; mouseleave clears; clicking pin 5 highlights pin 5 and card 5 only; external links have `target="_blank"` and `rel="noopener"`; pins are `<button>` with `aria-label` = spot name. Build: `id="area54"` contains `Visit Area54`, six names, the directions URL; across the page every `href="#x"` has a matching `id="x"` and every `target="_blank"` anchor has `rel` containing `noopener`.
- [ ] **Step 2: Run** unit + build tests → FAIL.
- [ ] **Step 3: Implement** from mockup lines 187–210 and 413–438 plus behaviour 515–527; pin pulse only under `prefers-reduced-motion:no-preference`; on screens < 960px a pin click scrolls its card into view.
- [ ] **Step 4: Run** unit + build tests → PASS.
- [ ] **Step 5: Commit** `git commit -m "Add Area54 directory island"`

---

### Task 8: End-to-end checks, visual comparison, README

**Files:**
- Create: `tests/e2e/home.test.ts`, `README.md`

**Interfaces:**
- Consumes: built `dist/`; system Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` (test file skips with a clear message if absent).

- [ ] **Step 1: Write e2e tests** (`// @vitest-environment node`; serve `dist/` with `astro preview --port 4329` started in `beforeAll`): at 375×800 and 1440×900, `document.documentElement.scrollWidth <= innerWidth` and every `.fcard` box is within `[0, innerWidth]`; at 1440, focusing the Solutions nav link via Tab makes the first dropdown link visible; with `page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}])` all `.rv` elements have computed opacity `1` and the counter reads `27+`; with `page.setJavaScriptEnabled(false)` all `.rv` elements have opacity `1`; at 375 the menu button opens the mobile panel and Escape closes it.
- [ ] **Step 2: Run** `npm run test:e2e` → PASS (fix the owning component if not).
- [ ] **Step 3: Visual comparison.** Screenshot `dist` and the v5 mockup at 1440 and 500 widths with headless Chrome (reveal forced visible); review side by side, section by section; fix drift in the owning component.
- [ ] **Step 4: README.** Prerequisites (nvm, `nvm use`), `npm install`, `npm run dev` / `build` / `test` / `test:e2e`, where copy lives (`src/data/`), where images live (`src/assets/`), and that `old-site/`, `content/`, `.superpowers/` are reference only.
- [ ] **Step 5: Run** `npm run check && npm test && npm run test:e2e` → all pass.
- [ ] **Step 6: Commit** `git commit -m "Add end-to-end checks and README"`
