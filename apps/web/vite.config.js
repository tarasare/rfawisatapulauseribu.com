import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

/**
 * Vite config for the `web` app.
 * - Adds alias `@` -> ./src so imports like `@/App` and `@/index.css` resolve correctly.
 * - Sets server host/port to match package.json dev script.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // `@` will resolve to the `src` directory next to this config file
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true, // allow network access (equivalent to --host ::)
    port: 3000
  }
});
