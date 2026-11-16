# ICAN website: Astro + Vue conversion (homepage) — design

Date: 2026-11-16 · Status: approved by client ("A")

## Intent

Turn the approved homepage mockup (`.superpowers/brainstorm/63379-1794823468/content/homepage-v5.html`) into a real Astro + Vue codebase that becomes the foundation for the rest of the ICAN website. The homepage is a directory and the trustworthy face of ICAN Group; inner pages come later.

## Goals

- Visually and behaviourally match homepage v5 as it stands now, including the client's latest fixes:
  no pill above the headline; hero main photo static (no zoom); solution cards show only a border tint on hover (no shadow, no lift); no "Solutions" eyebrow; client section heading "Trusted by"; portfolio photos don't zoom on hover; Chang ICAN secondary photo sits top-right so all five faces stay visible.
- Moderate motion level: scroll fade-up, counter, nav compaction, gentle floating hero cards, underline draw, portfolio parallax, Area54 pin pulse. All motion off under `prefers-reduced-motion`.
- Responsive from 320px to wide desktop; keyboard accessible with visible focus rings.
- Buttons use the "Recommended mix" (primary: lift + arrow slide; secondary: tint fill + blue outline); text links use "Underline draw".
- Text lives in content files, not in component markup, so copy edits don't touch code and Thai can be added later.

## Non-goals (this step)

- Inner pages (solutions, portfolio, about, contact, Chang ICAN). Homepage links point at their future routes or in-page anchors.
- Thai translation, CMS, contact-form backend, hosting/deployment setup.

## Anti-goals

- A JavaScript-heavy single-page app.
- Visual drift from v5.
- Runtime calls to third-party CDNs (fonts, icons, scripts).

## Constraints

- Node 22, npm. Static output (`astro build` → `dist/`), hostable anywhere including ICAN's existing server.
- Astro app at the repo root (`src/`, `public/`). `old-site/`, `content/`, `assets/` and `.superpowers/` stay as reference and must not break the build.

## Approaches considered

- **A. Astro components + Vue islands (chosen).** Every section is an `.astro` component rendered to static HTML. Vue only where the visitor interacts: mobile menu, Area54 pin ↔ card highlighting, the 27+ counter. Near-zero JS, best load speed and SEO.
- **B. Vue for every section.** Same output speed if hydrated sparingly, but more boilerplate; chosen only if maintainers prefer Vue everywhere. Not chosen.
- **C. One hydrated Vue app inside Astro.** Dropped: ships the whole page as JS, defeating Astro's purpose.

## Decisions (made by Claude, approved with "A")

- Keep the mockup's hand-written CSS: design tokens as CSS custom properties in a global stylesheet, section styles scoped in each component. No Tailwind rewrite.
- Self-host fonts (IBM Plex Sans, IBM Plex Sans Thai) via Fontsource packages; icons via the Lucide packages (Astro + Vue) instead of the CDN.
- Images go through Astro's image pipeline (`astro:assets`) for resized, compressed WebP/AVIF output.
- Small global behaviours (scroll reveal, nav compaction, parallax) as one lightweight script; interactive widgets as Vue islands.

## Left to the builder

Component breakdown and file names, content-file format, exact image sizes and formats, test approach.
