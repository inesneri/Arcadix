import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-lazy-load-image-component'],  // Mantieni solo questa dipendenza esterna
    },
  },
});
