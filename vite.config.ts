import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000', // din backend-port
    },
    fs: {
      strict: false, // Tillåter att Vite serverar filer utanför root (inklusive public/)
    },
  },
});
