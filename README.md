# ICAN Group website

The new ican.co.th, built with [Astro](https://astro.build) and Vue. Pages are static HTML; Vue runs only where visitors interact (phone menu, the 27+ counter, the Area54 directory). Small plain scripts run the portfolio filter, the photo viewer and the contact form.

## Setup

Requires Node 24 (Astro 7 needs ≥ 22.23.4). With nvm:

```bash
nvm install    # reads .nvmrc
nvm use
npm install
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server at http://localhost:4321 with live reload |
| `npm run build` | Builds the static site into `dist/` (upload this folder to any web host) |
| `npm run preview` | Serves the built `dist/` locally |
| `npm run check` | Type-checks Astro, Vue and TypeScript files |
| `npm test` | Unit tests (Vue islands, data) + build checks on `dist/` |
| `npm run test:e2e` | Real-browser checks with your installed Chrome (layout, keyboard, reduced motion, no-JS, images) |

## Where things live

| To change… | Edit |
| --- | --- |
| Homepage wording, links, phone numbers, client list, Area54 businesses | `src/data/home.ts` and `src/data/site.ts` |
| The eight solutions (cards, menu and solution pages) | `src/data/solutions.ts` — a solution without `page` opens the contact form instead |
| Portfolio categories and which photos lead | `src/data/portfolio.ts` (photos in `src/assets/portfolio/<category>/`) |
| About and Contact pages, contact form options | `src/data/about.ts`, `src/data/contact.ts` |
| Make the contact form send directly | Add a free [Web3Forms](https://web3forms.com) access key to `web3formsKey` in `src/data/contact.ts` |
| Images and logos | `src/assets/images/`, `src/assets/logos/` (referenced by path in the data files) |
| Colours, fonts, buttons, links | `src/styles/global.css` |
| A section's layout | `src/components/home/*.astro`; inner-page blocks in `src/components/page/*.astro` |
| Interactive parts | `src/components/islands/*.vue` |
| Scroll animations, header shrink, photo parallax | `src/scripts/motion.ts` |

Animations switch off automatically for visitors who turn on "reduce motion", and all content stays visible if JavaScript fails to load.

## Reference material (not part of the build)

- `old-site/` — the 2019 ASP.NET site, extracted for its images and content.
- `content/` — homepage copy, inner page notes (`pages.md`), the Chang ICAN draft, and what we still need for three solution pages (`solution-briefs.md`).
- `assets/` — original client photos and logos.
- `.superpowers/brainstorm/` — the design mockups (homepage v5 is the approved one).
- `docs/superpowers/` — the design note and build plan.
