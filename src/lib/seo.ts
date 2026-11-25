import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { site } from '../data/site';

/*
 * Search and sharing helpers: canonical URLs, the 1200×630 share image, and Google structured data (JSON-LD).
 */

export const SITE_NAME = 'ICAN Group';
/** Branded share image for pages without a photo of their own (made by scripts/og-default.mjs). */
export const DEFAULT_SHARE = { path: '/og/ican.jpg', alt: 'ICAN Group: Your Trusted Partner in IT Solutions', width: 1200, height: 630 };

/** The page's address without a trailing slash, matching how the site links to its pages. */
export function canonical(pathname: string, base: URL | undefined): string {
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '').replace(/\/index\.html$/, '');
  return new URL(clean, base ?? 'https://www.ican.co.th').href;
}

/** A page photo cropped to the share shape (1200×630 or smaller), or the branded default. */
export async function shareImage(photo: ImageMetadata | undefined, alt: string | undefined, base: URL | undefined) {
  if (!photo) return { url: new URL(DEFAULT_SHARE.path, base).href, alt: DEFAULT_SHARE.alt, width: 1200, height: 630 };
  // 1.91:1 like the default, never larger than the photo itself (images are not enlarged).
  const width = Math.min(1200, photo.width, Math.floor(photo.height * 1200 / 630));
  const height = Math.round(width * 630 / 1200);
  const out = await getImage({ src: photo, width, height, fit: 'cover', format: 'jpg', quality: 80 });
  return { url: new URL(out.src, base).href, alt: alt ?? SITE_NAME, width, height };
}

/** The company, for Google's knowledge panel and local results. Shown on the homepage. */
export function organizationLd(base: URL | undefined) {
  const url = new URL('/', base).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${url}#organization`,
    name: SITE_NAME,
    legalName: site.legalName,
    alternateName: 'ICAN',
    url,
    logo: new URL('/ican-logo.png', base).href,
    image: new URL(DEFAULT_SHARE.path, base).href,
    description: 'IT solutions in Bangkok since 1999: network and IT infrastructure, security assessment, server rooms and cabling, Wi-Fi, software and IT outsourcing.',
    foundingDate: '1999',
    email: site.email,
    telephone: site.phones[0].tel.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '102 Soi Yasoob 1, Vibhavadi Rangsit Road, Chom Phon Subdistrict',
      addressLocality: 'Chatuchak, Bangkok',
      addressRegion: 'Bangkok',
      postalCode: '10900',
      addressCountry: 'TH',
    },
    areaServed: 'TH',
    sameAs: [site.facebookUrl],
  };
}

export function websiteLd(base: URL | undefined) {
  const url = new URL('/', base).href;
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${url}#website`, name: SITE_NAME, url, inLanguage: 'en' };
}

/**
 * Breadcrumb trail for Google, from the crumbs the page shows. Steps that are not pages of their own (a homepage
 * section like "Solutions", or plain-text "Portfolio") are left out; the last crumb is the current page.
 */
export function breadcrumbLd(crumbs: { label: string; href?: string }[], pathname: string, base: URL | undefined) {
  const steps = crumbs.filter((c, i) => i === crumbs.length - 1 || (c.href && !c.href.includes('#')));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: steps.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? canonical(c.href.split('#')[0] || '/', base) : canonical(pathname, base),
    })),
  };
}

/** JSON for a <script type="application/ld+json">, safe to inline in HTML. */
export const ld = (data: unknown): string => JSON.stringify(data).replace(/</g, '\\u003c');
