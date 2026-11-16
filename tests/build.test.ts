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
    expect(t).toContain('ICAN helps businesses build, assess, and improve their IT systems.');
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

describe('solutions', () => {
  test('heading "Our Solutions" with no eyebrow above it', () => {
    const s = section('solutions');
    expect(s).toMatch(/<h2[^>]*>Our Solutions<\/h2>/);
    expect(s.slice(0, s.indexOf('Our Solutions'))).not.toContain('eyebrow');
  });

  test('six cards with the approved titles and blurbs', () => {
    const t = text(section('solutions'));
    for (const [title, blurb] of [
      ['Network & IT Infrastructure', 'Resilient networks, from IP planning to fiber redundancy.'],
      ['IT Security Assessment', 'Find weak spots across firewalls, servers, and Wi-Fi.'],
      ['Server Room & Cabling Solutions', 'Racks, cabling, power, and cooling, assessed and improved.'],
      ['Enterprise Wi-Fi Solutions', 'Access point and controller design for business Wi-Fi.'],
      ['Software & Application Solutions', 'Custom applications built around your business.'],
      ['IT Consulting & Assessment', 'Clear findings and a roadmap before you invest.'],
    ]) { expect(t, title).toContain(title); expect(t, blurb).toContain(blurb); }
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
    for (const chip of ['Electrical & network', 'Handyman', 'Moving', 'Event setup']) expect(t, chip).toContain(chip);
    expect(s).toContain('href="tel:+66816135243"');
    expect(s).toMatch(/<a[^>]*href="https:\/\/lin\.ee\/zk70Gu8"[^>]*target="_blank"[^>]*rel="noopener"/);
  });

  test('secondary photo sits top-right so no technician face is covered', () => {
    const rules = cssRules(/\.second/).join('\n');
    expect(rules).toMatch(/top:0/);
    expect(rules).toMatch(/right:0/);
    expect(rules).toMatch(/width:28%/);
  });
});

describe('Trusted by, Why ICAN, projects', () => {
  test('"Trusted by" shows all 52 client logos, each with alt text', () => {
    const s = section('clients');
    expect(s).toMatch(/<h2[^>]*>Trusted by<\/h2>/);
    const imgs = [...s.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
    expect(imgs).toHaveLength(52);
    for (const tag of imgs) expect(tag).toMatch(/alt="[^"]+"/);
  });

  test('Why ICAN: heading, CTA, certifications and four points', () => {
    const t = text(section('why'));
    for (const s of [
      'Experience, Technical Expertise, and Practical Solutions', 'Contact Our Team',
      'Cisco CCIE', 'CCNP', 'CCNA', 'Systimax', 'Panduit', 'TQS / ISO 15504', 'Management level', 'Working level',
      'Established in 1999', 'Assessment First', 'Approved Design', 'One Team, One Contact',
    ]) expect(t, s).toContain(s);
  });

  test('projects: six captioned photos and a portfolio link', () => {
    const t = text(section('work'));
    for (const s of ['Data Center', 'Structured Cabling', 'Server & Storage Racks', 'Fiber Optic Installation', 'CCTV Control Room', 'Server Room Fire Suppression', 'View full portfolio']) {
      expect(t, s).toContain(s);
    }
  });

  test('project photos do not zoom on hover', () => {
    for (const rule of cssRules(/\.tile[^,{]*:hover/)) expect(rule).not.toMatch(/--s|scale/);
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

describe('phone menu sizing', () => {
  test('menu height uses the dynamic viewport so iPhone toolbars never cover "Contact Us"', () => {
    expect(cssRules(/mobile-panel/).join('\n')).toContain('100dvh');
  });
});

describe('header and footer', () => {
  test('desktop navigation lists every solution, Chang ICAN after a separator, and portfolio', () => {
    const nav = section('site-nav');
    const t = text(nav);
    for (const label of [
      'Network & IT Infrastructure', 'IT Security Assessment', 'Server Room & Cabling Solutions',
      'Enterprise Wi-Fi Solutions', 'Software & Application Solutions', 'IT Consulting & Assessment',
      'Chang ICAN — Home & Office Technicians', 'IT Infrastructure', 'Software & Application', 'About Us', 'Contact Us',
    ]) expect(t, label).toContain(label);
    expect(nav).toMatch(/class="sep"[^>]*>\s*<\/li>\s*<li[^>]*>\s*<a[^>]*href="#chang"/);
  });

  test('footer has company, phones, maps and Facebook', () => {
    const footer = section('contact');
    const t = text(footer);
    expect(t).toContain('International Computing And Networking Co., Ltd.');
    expect(footer).toContain('href="tel:+6622723111"');
    expect(footer).toContain('href="tel:+66846723111"');
    expect(footer).toMatch(/<a[^>]*href="https:\/\/www\.facebook\.com\/ICAN\.Admin\/"[^>]*target="_blank"[^>]*rel="noopener"/);
    expect(t).toContain('© 2026');
  });
});
