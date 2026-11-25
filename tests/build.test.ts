// @vitest-environment node
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { analytics } from '../src/data/analytics';

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

/** Outer HTML of the element with this id, matching nested tags of the same name. */
function section(id: string): string {
  const page = html();
  const start = page.indexOf(`id="${id}"`);
  expect(start, `#${id} exists`).toBeGreaterThan(-1);
  const tag = page.lastIndexOf('<', start);
  const name = page.slice(tag + 1).match(/^[a-z0-9]+/)![0];
  const re = new RegExp(`<${name}[\\s>]|</${name}>`, 'g');
  re.lastIndex = tag + 1;
  let depth = 1;
  for (let m = re.exec(page); m; m = re.exec(page)) {
    depth += m[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return page.slice(tag, m.index + m[0].length);
  }
  return page.slice(tag);
}
const text = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ');

describe('hero', () => {
  test('shows the headline, lead and trusted-by logos', () => {
    const hero = section('hero');
    const t = text(hero);
    expect(t).toContain('Your Trusted Partner in');
    expect(t).toContain('IT Solutions.');
    expect(t).toContain('ICAN helps businesses build, assess, and improve their IT systems and cybersecurity.');
    expect(t).toContain('Trusted by');
    expect(t).toContain('50+ organizations');
    for (const alt of ['SCG', 'PTT', '7-Eleven', "L'Oréal Thailand", 'Synnex']) {
      expect(hero, alt).toContain(`alt="${alt}"`);
    }
    expect(t).toContain('27+');
    expect(t).toContain('CCIE · CCNP · CCNA');
  });

  test('keeps the space between "in" and the highlighted "IT Solutions."', () => {
    expect(section('hero')).toMatch(/Partner in\s+<span class="hl"/);
  });

  test('keeps the client fixes: no pill above the headline, no zoom on the main photo', () => {
    expect(text(html())).not.toContain('Established 1999 · Bangkok');
    expect(readDist()).not.toContain('@keyframes kb');
  });

  test('serves resized WebP photos instead of the original JPGs', () => {
    const hero = section('hero');
    expect(hero).toMatch(/<img[^>]*src="[^"]*hero-cabling[^"]*\.webp"/);
    expect(hero).not.toMatch(/src="[^"]*\.jpg"/);
  });
});

/** Every CSS rule (selector + body) in the build whose selector matches `pattern`. */
function cssRules(pattern: RegExp): string[] {
  const css = walk(DIST).filter((f) => f.endsWith('.css')).map((f) => readFileSync(f, 'utf8')).join('\n')
    + [...html().matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter((m) => pattern.test(m[1])).map((m) => `${m[1]}{${m[2]}}`);
}

describe('shadows', () => {
  // Flat design (client request 2026-11-25): only the hero photos and their floating cards, the About photo, and things that float
  // over the page — the Solutions dropdown, the phone menu, the cookie banner, the LINE QR pop-up, the Area54 card
  // on the map — keep a shadow, plus focus rings.
  test('no shadows on cards, icons, inner-page photos or the header', () => {
    const files = walk(DIST);
    const css = files.filter((f) => f.endsWith('.css')).map((f) => readFileSync(f, 'utf8')).join('\n')
      + files.filter((f) => f.endsWith('.html')).flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1])).join('\n');
    const shadowed = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
      .filter((m) => /box-shadow:\s*(?!inset|none)/.test(m[2]))
      .map((m) => m[1].trim());
    const floating = /\.c-main|\.c-second|\.fcard|\.what|\.drop|\.mobile-panel|\.consent|\.pop|\.spot|:focus/;
    expect(shadowed.filter((sel) => !floating.test(sel))).toEqual([]);
  });
});

describe('solutions', () => {
  test('heading "Our Solutions" with no eyebrow above it', () => {
    const s = section('solutions');
    expect(s).toMatch(/<h2[^>]*>Our Solutions<\/h2>/);
    expect(s.slice(0, s.indexOf('Our Solutions'))).not.toContain('eyebrow');
  });

  test('eight cards with their titles and blurbs, each linking to its page or the contact form', () => {
    const sec = section('solutions');
    const t = text(sec);
    for (const [title, blurb, href] of [
      ['IT Security Assessment', 'Find weak spots across firewalls, servers, and Wi-Fi.', '/contact?topic=quote&amp;solution=it-security-assessment'],
      ['Network & IT Infrastructure', 'Resilient networks, from IP planning to fiber redundancy.', '/solutions/network-it-infrastructure'],
      ['Server Room & Cabling', 'Racks, cabling, power, and cooling, assessed and improved.', '/solutions/server-room-cabling'],
      ['Enterprise Wi-Fi', 'Access point and controller design for business Wi-Fi.', '/contact?topic=quote&amp;solution=enterprise-wifi'],
      ['Software & Applications', 'Custom applications built around your business.', '/solutions/software-applications'],
      ['IT Consulting & Assessment', 'Clear findings and a roadmap before you invest.', '/contact?topic=quote&amp;solution=it-consulting-assessment'],
      ['IT Outsourcing', 'IT support, service desk, SAP and programmers, on site or remote.', '/solutions/it-outsourcing'],
      ['ICAN Alert', 'Our own alarm for smoke, heat, power cuts and break-ins.', '/solutions/ican-alert'],
    ]) {
      expect(t, title).toContain(title);
      expect(t, blurb).toContain(blurb);
      expect(sec, href).toContain(`href="${href}"`);
    }
  });

  test('IT Security Assessment and Network & IT Infrastructure lead as the recommended cards', () => {
    const featured = section('solutions').match(/<div class="sol-grid featured[\s\S]*?<div class="sol-grid more/)?.[0] ?? '';
    const titles = [...featured.matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
    expect(titles).toEqual(['IT Security Assessment', 'Network & IT Infrastructure']);
    expect([...featured.matchAll(/class="badge[^"]*"[^>]*>Recommended</g)]).toHaveLength(2);
  });

  test('compact cards: no repeated "Learn more" label', () => {
    expect(text(section('solutions'))).not.toContain('Learn more');
  });

  test('card hover only tints the border: no shadow, no lift', () => {
    const hovers = cssRules(/\.sol[^,{]*:hover(?![^,{]*\.)/);
    expect(hovers.length).toBeGreaterThan(0);
    for (const rule of hovers) {
      expect(rule).not.toMatch(/box-shadow|translate/);
    }
  });
});

describe('Start easy (Chang ICAN)', () => {
  test('title, Thai name, chips, phone and LINE', () => {
    const s = section('chang');
    const t = text(s);
    expect(t).toContain('Start easy');
    expect(t).toContain('ช่างไอแคน');
    expect(t).toContain('ICAN technicians for everyday home and office jobs.');
    expect(t).not.toMatch(/\bFive\b/);
    for (const chip of ['Electrical & network', 'Handyman', 'Moving', 'Event setup']) expect(t, chip).toContain(chip);
    expect(s).toContain('href="tel:+66816135243"');
    expect(s).toMatch(/<a[^>]*href="https:\/\/lin\.ee\/zk70Gu8"[^>]*target="_blank"[^>]*rel="noopener"/);
  });

  test('rating: 4.5 of 5 stars from 22 Google reviews, readable by screen readers', () => {
    const s = section('chang');
    expect(s).toMatch(/role="img"[^>]*aria-label="Rated 4\.5 out of 5 from 22 Google reviews"/);
    expect(s).toContain('--fill:90%');
    expect(text(s)).toContain('(22 Google reviews)');
  });

  test('"All services" sits with the service chips and opens the full list, not with the contact buttons', () => {
    const s = section('chang');
    const details = s.match(/<details[\s\S]*?<\/details>/)?.[0] ?? '';
    const summary = details.match(/<summary[\s\S]*?<\/summary>/)?.[0] ?? '';
    expect(text(summary)).toContain('All services');
    expect(text(summary)).toContain('Handyman');
    for (const item of ['LAN & fiber cabling', 'Furniture assembly', 'Heavy items, any floor', 'Exhibition & fair move-in']) {
      expect(text(details), item).toContain(item);
    }
    const ctas = s.slice(s.indexOf('class="ctas'));
    expect(text(ctas)).not.toContain('All services');
    expect(s).not.toContain('href="#chang"');
  });

  test('secondary photo sits top-right so no technician face is covered', () => {
    const rules = cssRules(/\.second/).join('\n');
    expect(rules).toMatch(/top:0/);
    expect(rules).toMatch(/right:0/);
    expect(rules).toMatch(/width:28%/);
  });
});

describe('Trusted by, Why ICAN, projects', () => {
  test('"Trusted by" shows all 52 client logos in one card, each with alt text', () => {
    const s = section('clients');
    expect(s).toMatch(/<h2[^>]*>Trusted by<\/h2>/);
    const imgs = [...s.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
    expect(imgs).toHaveLength(52);
    for (const tag of imgs) expect(tag).toMatch(/alt="[^"]+"/);
    const card = s.match(/<ul class="logo-card[\s\S]*?<\/ul>/)?.[0] ?? '';
    expect([...card.matchAll(/<img/g)]).toHaveLength(52);
  });

  test('Why ICAN: heading, CTA, certifications and four points', () => {
    const t = text(section('why'));
    for (const s of [
      'Experience, Technical Expertise, and Practical Solutions', 'Contact Our Team',
      'Cisco CCIE', 'CCNP', 'CCNA', 'Systimax', 'Panduit', 'TQS / ISO 15504', 'Management level', 'Working level',
      'Established in 1999', 'Assessment First', 'Approved Design', 'One Team, One Contact',
    ]) expect(t, s).toContain(s);
  });

  test('projects: six captioned photos, each opening its portfolio gallery, and a portfolio link', () => {
    const w = section('work');
    const t = text(w);
    for (const s of ['Data Center', 'Structured Cabling', 'Server & Storage Racks', 'Fiber Optic Installation', 'CCTV Control Room', 'Server Room Fire Suppression', 'View full portfolio']) {
      expect(t, s).toContain(s);
    }
    const tiles = [...w.matchAll(/<a class="tile[^"]*"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
    expect(tiles).toEqual(['datacenter', 'cabling', 'servers', 'cabling', 'cctv', 'fire'].map((k) => `/portfolio/it-infrastructure#${k}`));
    expect(w).toContain('href="/portfolio/it-infrastructure"');
  });

  test('project photos do not zoom on hover', () => {
    for (const rule of cssRules(/\.tile[^,{]*:hover/)) expect(rule).not.toMatch(/--s|scale/);
  });

  test('project photos never move on scroll: no parallax offset, no oversizing', () => {
    expect(readDist()).not.toContain('--py');
    for (const rule of cssRules(/\.imgbox[^,{]*img/)) expect(rule).not.toMatch(/transform|scale/);
  });
});

describe('Area54 directory', () => {
  test('heading, six businesses and directions', () => {
    const s = section('area54');
    const t = text(s);
    expect(t).toContain('Visit Area54');
    for (const name of ['Tidnuad Thai Massage', 'ICAN Group', "Chef's Place", 'Rice & Curry', 'Carfé Area54 Specialty Coffee', 'Chang ICAN']) {
      expect(t, name).toContain(name);
    }
    expect(s).toContain('href="https://www.google.com/maps/search/?api=1&amp;query=Area54+Vibhavadi"');
  });

  test('pins are flat (no shadow, no pulsing ring) and the photo has no shadow', () => {
    expect(readDist()).not.toMatch(/@keyframes ping/);
    for (const rule of cssRules(/\.pin(?![\w-])/)) expect(rule).not.toMatch(/box-shadow/);
    for (const rule of cssRules(/\.photo(?![\w-])/)) expect(rule).not.toMatch(/box-shadow/);
  });

  test('subtitle reads "Six businesses. Tap a number to see more details."', () => {
    expect(text(section('area54'))).toContain('Six businesses. Tap a number to see more details.');
  });

  test('"Get directions" starts with a map symbol', () => {
    expect(section('area54')).toMatch(/<a class="link"[^>]*Area54\+Vibhavadi[^>]*>\s*<svg[^>]*class="lucide lucide-map"[^>]*>[\s\S]*?<\/svg>\s*Get directions/);
  });
});

describe('links across the page', () => {
  test('every in-page anchor has a target', () => {
    const page = html();
    const ids = new Set([...page.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const anchors = [...new Set([...page.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))];
    expect(anchors.length).toBeGreaterThan(0);
    expect(anchors.filter((a) => !ids.has(a))).toEqual([]);
  });

  test('every new-tab link uses rel="noopener"', () => {
    const tags = [...html().matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((m) => m[0]);
    expect(tags.length).toBeGreaterThan(0);
    expect(tags.filter((t) => !/rel="[^"]*noopener/.test(t))).toEqual([]);
  });
});

describe('smoothness', () => {
  test('page changes cross-fade with the header held still, and the portfolio tab highlight slides', () => {
    const css = readDist();
    expect(css).toMatch(/@view-transition\s*\{\s*navigation:\s*auto/);
    expect(cssRules(/\.nav(?![\w-])/).join('\n')).toContain('view-transition-name:site-nav');
    expect(css).toMatch(/aria-current="?page"?\][^{]*\{[^}]*view-transition-name:portfolio-tab/);
  });

  test('"All services" is marked to open smoothly', () => {
    expect(section('chang')).toMatch(/<details class="svc"[^>]*data-smooth/);
  });
});

describe('buttons', () => {
  test('hovering a button only changes its colour: no lift, no drop shadow', () => {
    const rules = cssRules(/\.btn[\w-]*:hover(?![^,{]*(svg|\.lucide))/);
    expect(rules.length).toBeGreaterThan(0);
    for (const rule of rules) {
      expect(rule).not.toMatch(/translateY|scale\(1/);
      expect(rule).not.toMatch(/box-shadow:(?!inset)/);
    }
  });

  test('the menu hover tint never applies to the Contact Us button', () => {
    const tint = cssRules(/\.menu[^{,]*>li[^{,]*>a[^{,]*:hover/).filter((r) => /background/.test(r));
    expect(tint.length).toBeGreaterThan(0);
    for (const rule of tint) expect(rule).toMatch(/:not\(\.cta\)/);
  });
});

describe('phone menu sizing', () => {
  test('menu height uses the dynamic viewport so iPhone toolbars never cover "Contact Us"', () => {
    expect(cssRules(/mobile-panel/).join('\n')).toContain('100dvh');
  });
});

describe('header and footer', () => {
  test('desktop navigation lists every solution, Chang ICAN after a separator, portfolio and About', () => {
    const nav = section('site-nav');
    const t = text(nav);
    for (const label of [
      'IT Security Assessment', 'Network & IT Infrastructure', 'Server Room & Cabling', 'Enterprise Wi-Fi',
      'Software & Applications', 'IT Consulting & Assessment', 'IT Outsourcing', 'ICAN Alert',
      'Chang ICAN — Home & Office Technicians', 'IT Infrastructure', 'Software & Application',
      'About Us', 'About ICAN', 'Social Responsibility', 'Location', 'Contact Us',
    ]) expect(t, label).toContain(label);
    expect(nav).toMatch(/class="sep"[^>]*>\s*<\/li>\s*<li[^>]*>\s*<a[^>]*href="\/#chang"/);
    expect(nav).toContain('href="/contact"');
  });

  test('a Location button with a pin sits between About Us and Contact Us and goes to the Area54 directory', () => {
    const nav = section('site-nav');
    const menu = nav.slice(nav.indexOf('class="menu'));
    const location = menu.match(/<a[^>]*href="\/#area54"[^>]*>[\s\S]*?<\/a>/)?.[0] ?? '';
    expect(location).toContain('lucide-map-pin');
    expect(text(location).trim()).toBe('Location');
    const about = menu.indexOf('>About Us');
    const loc = menu.indexOf('href="/#area54"');
    const contact = menu.indexOf('href="/contact"', loc);
    expect(about).toBeGreaterThan(-1);
    expect(loc).toBeGreaterThan(about);
    expect(contact).toBeGreaterThan(loc);
  });

  test('footer has company, phones, maps and Facebook', () => {
    const footer = section('contact');
    const t = text(footer);
    expect(t).toContain('International Computing And Networking Co., Ltd.');
    expect(footer).toContain('href="tel:+6622723111"');
    expect(footer).toContain('href="tel:+66846723111"');
    expect(footer).toMatch(/<a[^>]*href="https:\/\/www\.facebook\.com\/ican\.co\.th"[^>]*target="_blank"[^>]*rel="noopener"/);
    expect(t).toContain('© 2026');
  });
});

// ---------- every page ----------

const pages = () => walk(DIST).filter((f) => f.endsWith('.html') && !f.startsWith(join(DIST, 'portfolio', 'index.html')));
const pageFor = (href: string): string | undefined => {
  const path = href.split(/[?#]/)[0];
  const candidates = path.endsWith('/') ? [join(DIST, path, 'index.html')] : [join(DIST, path, 'index.html'), join(DIST, path)];
  return candidates.find((c) => { try { return statSync(c).isFile(); } catch { return false; } });
};

describe('inner pages', () => {
  test('all pages are built, and solutions without content have no page yet', () => {
    for (const p of ['about', 'contact', 'social-responsibility', 'portfolio/it-infrastructure', 'portfolio/software',
      ...['network-it-infrastructure', 'server-room-cabling', 'software-applications', 'it-outsourcing', 'ican-alert'].map((s) => `solutions/${s}`)]) {
      expect(pageFor(`/${p}`), p).toBeDefined();
    }
    for (const s of ['it-security-assessment', 'enterprise-wifi', 'it-consulting-assessment']) expect(pageFor(`/solutions/${s}`), s).toBeUndefined();
  });

  test('every page has its own title, a description, one h1, the shared header and footer', () => {
    const titles = new Set<string>();
    for (const f of pages()) {
      const html = readFileSync(f, 'utf8');
      const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
      expect(title, f).toBeTruthy();
      expect(titles.has(title!), `duplicate title ${title}`).toBe(false);
      titles.add(title!);
      expect(html, f).toMatch(/<meta name="description" content="[^"]{40,}"/);
      expect([...html.matchAll(/<h1[\s>]/g)], f).toHaveLength(1);
      expect(html, f).toContain('id="site-nav"');
      expect(html, f).toContain('<footer id="contact"');
    }
  });

  test('every internal link on every page leads to a built page, and every #anchor to an element there', () => {
    const broken: string[] = [];
    for (const f of pages()) {
      const html = readFileSync(f, 'utf8');
      for (const [, raw] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
        const href = raw.replace(/&amp;/g, '&');
        if (/^(https?:|mailto:|tel:|\/\/)/.test(href)) continue;
        if (href.startsWith('/_astro/')) continue;
        const target = href.startsWith('#') ? f : pageFor(href);
        if (!target) { broken.push(`${f}: ${href}`); continue; }
        const hash = href.split('#')[1];
        if (hash && hash !== 'all' && !readFileSync(target, 'utf8').includes(`id="${hash}"`)) broken.push(`${f}: ${href} (no #${hash})`);
      }
    }
    expect(broken).toEqual([]);
  });

  test('every new-tab link on every page uses rel="noopener"', () => {
    for (const f of pages()) {
      const tags = [...readFileSync(f, 'utf8').matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((m) => m[0]);
      expect(tags.filter((t) => !/rel="[^"]*noopener/.test(t)), f).toEqual([]);
    }
  });

  test('solution pages: breadcrumb, a quote button with the solution picked, and links to the other solutions', () => {
    const html = readFileSync(join(DIST, 'solutions', 'server-room-cabling', 'index.html'), 'utf8');
    expect(html).toMatch(/<nav class="crumbs"[^>]*aria-label="Breadcrumb"/);
    expect(html).toContain('href="/contact?topic=quote&amp;solution=server-room-cabling"');
    expect(text(html)).toContain('How we work');
    expect(html).toContain('href="/portfolio/it-infrastructure#datacenter"');
    expect(html).toContain('href="/solutions/ican-alert"');
    expect(html).toContain('href="/contact?topic=quote&amp;solution=enterprise-wifi"');
  });

  test('ICAN Alert offers the brochure, small enough to download on a phone', () => {
    const html = readFileSync(join(DIST, 'solutions', 'ican-alert', 'index.html'), 'utf8');
    expect(html).toMatch(/<a[^>]*href="\/downloads\/ican-alert-brochure\.pdf"[^>]*download/);
    expect(statSync(join(DIST, 'downloads', 'ican-alert-brochure.pdf')).size).toBeLessThan(2_000_000);
  });

  test('portfolio: every category is a section the filter links to, with its photos', () => {
    const html = readFileSync(join(DIST, 'portfolio', 'it-infrastructure', 'index.html'), 'utf8');
    for (const key of ['cabling', 'datacenter', 'servers', 'power', 'fire', 'network', 'cctv', 'access', 'ipphone', 'video', 'alert']) {
      expect(html, key).toContain(`href="#${key}"`);
      const sec = html.slice(html.indexOf(`id="${key}"`));
      expect(sec.slice(0, sec.indexOf('</section>')), key).toMatch(/<a href="[^"]+\.webp" data-lb/);
    }
    expect(html).toContain('id="lightbox"');
  });

  test('Social Responsibility: both groups, every activity with a date, a title and a photo that opens full size', () => {
    const html = readFileSync(join(DIST, 'social-responsibility', 'index.html'), 'utf8');
    const t = text(html);
    for (const s of ['Community and charity', 'Life at ICAN', 'Computers for Kids: Ban Thung Kham School', 'New Year Party 2023']) expect(t, s).toContain(s);
    const acts = [...html.matchAll(/<li class="act[\s\S]*?<\/li>/g)].map((m) => m[0]);
    expect(acts.length).toBeGreaterThanOrEqual(10);
    for (const a of acts) {
      expect(a).toMatch(/<time datetime="\d{4}-\d{2}/);
      expect(a).toMatch(/<a class="main" href="[^"]+\.webp" data-lb/);
    }
    expect(html).toMatch(/<a[^>]*href="https:\/\/www\.facebook\.com\/ican\.co\.th"[^>]*target="_blank"[^>]*rel="noopener"/);
  });

  test('contact form: topic, solution list, the fields, and a fallback that still sends without JavaScript', () => {
    const html = readFileSync(join(DIST, 'contact', 'index.html'), 'utf8');
    const form = html.match(/<form[\s\S]*?<\/form>/)?.[0] ?? '';
    expect(form).toMatch(/action="(mailto:websupport@ican\.co\.th|https:\/\/api\.web3forms\.com\/submit)"/);
    for (const name of ['topic', 'solution', 'name', 'company', 'email', 'phone', 'message']) expect(form, name).toContain(`name="${name}"`);
    for (const label of ['Get a quote', 'Ask about a solution', 'Book a consultation', 'Get technical help', 'Something else', 'Enterprise Wi-Fi', 'ICAN Alert', 'Other']) {
      expect(text(form), label).toContain(label);
    }
    expect(form).toMatch(/name="email"[^>]*type="email"[^>]*required|type="email"[^>]*required/);
    expect(form).toContain('data-ask-solution="quote solution"');
    // With the form service on, a robot check (hCaptcha, through Web3Forms' free site key) guards sending.
    if (form.includes('api.web3forms.com')) {
      expect(form).toMatch(/<div[^>]*class="h-captcha"[^>]*data-sitekey="[0-9a-f-]{36}"/);
    }
    // Length caps keep oversized junk out of the inbox.
    for (const name of ['name', 'company', 'email', 'phone']) expect(form, name).toMatch(new RegExp(`<input[^>]*name="${name}"[^>]*maxlength="\\d+"`));
    expect(form).toMatch(/<textarea[^>]*name="message"[^>]*maxlength="\d+"/);
  });
});

describe('analytics', () => {
  test('Google Analytics never loads before a visitor accepts the banner', () => {
    const page = html();
    // Only the bundled script adds Google's tag, and only after Accept.
    expect(page).not.toContain('googletagmanager.com');
    if (analytics.measurementId) {
      // The GA4 Measurement ID, not the "GTM-…" Google tag container that GA's setup dialog shows.
      expect(analytics.measurementId).toMatch(/^G-[A-Z0-9]+$/);
      expect(page).toMatch(new RegExp(`id="consent"[^>]*data-ga="${analytics.measurementId}"[^>]*hidden`));
      expect(page).toContain('data-consent-open');
    } else {
      expect(page).not.toContain('id="consent"');
      expect(page).not.toContain('data-consent-open');
    }
  });
});
