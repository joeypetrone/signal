import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    // Served from play.joeydev.net/signal/, alongside future games on the same site.
    outDir: 'dist/signal',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2000,
  },
});
