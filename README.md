# ICAN Group website

The new ican.co.th, built with [Astro](https://astro.build) and Vue. Pages are static HTML; Vue runs only where visitors interact (phone menu, the 27+ counter, the Area54 directory).

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
| Images and logos | `src/assets/images/`, `src/assets/logos/` (referenced by path in the data files) |
| Colours, fonts, buttons, links | `src/styles/global.css` |
| A section's layout | `src/components/home/*.astro` |
| Interactive parts | `src/components/islands/*.vue` |
| Scroll animations, header shrink, photo parallax | `src/scripts/motion.ts` |

Animations switch off automatically for visitors who turn on "reduce motion", and all content stays visible if JavaScript fails to load.

## Reference material (not part of the build)

- `old-site/` — the 2019 ASP.NET site, extracted for its images and content.
- `content/` — approved homepage copy and the Chang ICAN draft.
- `assets/` — original client photos and logos.
- `.superpowers/brainstorm/` — the design mockups (homepage v5 is the approved one).
- `docs/superpowers/` — the design note and build plan.
