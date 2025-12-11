// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  devToolbar: {
    enabled: false
  },

  // Match production trailing slash behavior
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  }
});
