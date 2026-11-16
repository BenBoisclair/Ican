import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('/src/assets/**/*.{png,jpg}', { eager: true, import: 'default' });

/** Look up an image by its path relative to `src/assets`, e.g. `images/hero-room.jpg`. */
export function img(path: string): ImageMetadata {
  const found = files[`/src/assets/${path}`];
  if (!found) throw new Error(`Missing asset: ${path}`);
  return found;
}
