// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'https://www.ican.co.th',
  output: 'static',
  // The portfolio menu item itself opens the infrastructure portfolio.
  redirects: { '/portfolio': '/portfolio/it-infrastructure' },
  integrations: [vue()],
});
