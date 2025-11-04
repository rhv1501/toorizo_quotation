import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
    }),
  ],
  optimizeDeps: {
    // avoid pre-bundling everything unnecessarily in dev; keep smaller dev prebundle
    include: [],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Split vendor and large libs into separate chunks to keep main chunk small
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // PDF-related libs (loaded dynamically)
            if (id.includes('@react-pdf') || id.includes('react-pdf') || id.includes('@react-pdf/renderer')) {
              return 'vendor-react-pdf';
            }
            // Core React libs
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // Date handling libs  
            if (id.includes('date-fns') || id.includes('react-datepicker')) {
              return 'vendor-date';
            }
            // Icon library
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // Router
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // Form handling
            if (id.includes('react-hook-form')) {
              return 'vendor-forms';
            }
            // Everything else
            return 'vendor-misc';
          }
        }
      }
    }
  }
});