import type { APIRoute } from 'astro';
import { solutions } from '../data/solutions';
import { portfolioPages } from '../data/portfolio';
import { canonical } from '../lib/seo';

/** Every public page, for search engines (submit https://www.ican.co.th/sitemap.xml in Google Search Console). */
export const pages = [
  '/', '/about', '/contact', '/social-responsibility',
  ...Object.values(portfolioPages).map((p) => p.href),
  ...solutions.filter((s) => s.page).map((s) => `/solutions/${s.slug}`),
];

export const GET: APIRoute = ({ site }) => {
  const urls = pages.map((p) => `  <url><loc>${canonical(p, site)}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
