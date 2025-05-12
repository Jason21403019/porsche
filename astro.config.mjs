// @ts-check
import { defineConfig } from 'astro/config'

import relativeLinks from 'astro-relative-links'

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      include: ['gsap'],
    },
    server: {
      hmr: {
        preserveScroll: true,
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },

  integrations: [relativeLinks()],
})
