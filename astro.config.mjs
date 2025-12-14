// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import react from '@astrojs/react';

// Read site config to check if Tailwind is enabled
// This is done at build time, not runtime
const siteConfigPath = resolve('./src/config/site.ts');
let tailwindEnabled = true; // Default to enabled

try {
  const siteConfigContent = readFileSync(siteConfigPath, 'utf-8');
  // Check for explicit `tailwind: false` in the features section
  tailwindEnabled = !siteConfigContent.includes('tailwind: false');
} catch (e) {
  // If we can't read the config, default to enabled
  console.warn('Could not read site.ts, defaulting Tailwind to enabled');
}

// Conditionally import Tailwind CSS Vite plugin
const vitePlugins = [];
if (tailwindEnabled) {
  const tailwindcss = (await import('@tailwindcss/vite')).default;
  vitePlugins.push(tailwindcss());
}

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  devToolbar: {
    enabled: false
  },

  // Match production trailing slash behavior
  trailingSlash: 'always',

  vite: {
    plugins: vitePlugins
  }
});
