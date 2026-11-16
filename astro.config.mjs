// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'https://www.ican.co.th',
  output: 'static',
  integrations: [vue()],
});
