import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react({
    // Treat .js files as JSX for dev tools like fast-refresh
    babel: { presets: [] }
  })],
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  server: {
    port: 3000,
  },
  build: {
    outDir: 'build', // keep same output dir previously used by CRA
  },
});
