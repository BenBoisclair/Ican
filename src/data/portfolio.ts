import type { ImageMetadata } from 'astro';

/*
 * Project photos and design drawings from the 2019 portfolio, resized into src/assets/portfolio/<key>/.
 * Vendor stock photos, near-duplicate drawings and very small images were left out.
 */
export type GalleryKey =
  | 'cabling' | 'datacenter' | 'servers' | 'power' | 'fire' | 'network' | 'cctv' | 'access' | 'ipphone' | 'video'
  | 'alert' | 'software';

/** `best`: photo numbers (1-based) shown first on solution pages; the first is the gallery's cover. */
export interface Gallery { key: GalleryKey; title: string; page: 'it-infrastructure' | 'software'; best: number[] }

export const galleries: Gallery[] = [
  { key: 'cabling', title: 'Structured Cabling & Fiber', page: 'it-infrastructure', best: [22, 33, 45, 51] },
  { key: 'datacenter', title: 'Data Center', page: 'it-infrastructure', best: [22, 8, 15, 21] },
  { key: 'servers', title: 'Servers & PCs', page: 'it-infrastructure', best: [4, 5, 6, 8] },
  { key: 'power', title: 'Power & UPS', page: 'it-infrastructure', best: [5, 1, 2, 6] },
  { key: 'fire', title: 'Fire Suppression', page: 'it-infrastructure', best: [17, 18, 3, 5] },
  { key: 'network', title: 'Network Equipment', page: 'it-infrastructure', best: [18, 6, 13, 1] },
  { key: 'cctv', title: 'CCTV', page: 'it-infrastructure', best: [18, 25, 6, 15] },
  { key: 'access', title: 'Access Control', page: 'it-infrastructure', best: [2, 9, 15, 7] },
  { key: 'ipphone', title: 'IP Phone', page: 'it-infrastructure', best: [4, 7, 1, 5] },
  { key: 'video', title: 'Video Conference', page: 'it-infrastructure', best: [3, 1, 2, 5] },
  { key: 'alert', title: 'ICAN Alert', page: 'it-infrastructure', best: [12, 5, 4, 7] },
  { key: 'software', title: 'Software & Application', page: 'software', best: [1, 7, 10, 22] },
];

/** Both portfolio pages share one header, so switching tabs only changes the tab highlight and the photos. */
export const portfolioHero = { title: 'Our portfolio', lead: 'Photos, drawings and screenshots from our projects.' };

export const portfolioPages = {
  'it-infrastructure': {
    title: 'IT Infrastructure',
    href: '/portfolio/it-infrastructure',
    metaTitle: 'IT Infrastructure Portfolio',
    description: 'Photos and design drawings from ICAN infrastructure projects: data centers, structured cabling, fiber, CCTV, access control, fire suppression and more.',
    note: '',
  },
  software: {
    title: 'Software & Application',
    href: '/portfolio/software',
    metaTitle: 'Software & Application Portfolio',
    description: 'Screenshots of custom applications ICAN has built: SAP interfaces, helpdesk, sales, maintenance and company systems.',
    note: 'Some details are blurred for privacy.',
  },
} as const;

const files = import.meta.glob<ImageMetadata>('/src/assets/portfolio/*/*.jpg', { eager: true, import: 'default' });

/** The photos of one gallery, in order. */
export function photos(key: GalleryKey): ImageMetadata[] {
  return Object.keys(files)
    .filter((path) => path.startsWith(`/src/assets/portfolio/${key}/`))
    .sort()
    .map((path) => files[path]);
}

/** The photos with the best ones first. */
export function bestFirst(key: GalleryKey): ImageMetadata[] {
  const all = photos(key);
  const best = galleries.find((g) => g.key === key)!.best.map((n) => all[n - 1]).filter(Boolean);
  return [...best, ...all.filter((p) => !best.includes(p))];
}

export const galleryHref = (key: GalleryKey): string => {
  const g = galleries.find((x) => x.key === key)!;
  return g.page === 'software' ? portfolioPages.software.href : `${portfolioPages['it-infrastructure'].href}#${key}`;
};
