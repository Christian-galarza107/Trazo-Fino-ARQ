import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config/dominio.mjs';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  image: { responsiveStyles: false },
  // Sin recursos incrustados como data: (fuentes, imágenes): la CSP no necesita permitir data: fonts.
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-AR', en: 'en', pt: 'pt-BR' } },
    }),
  ],
});
