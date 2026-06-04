import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  envPrefix: ['VITE_', 'PUBLIC_'],
  optimizeDeps: {
    include: [
      '@supabase/supabase-js',
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react-icons',
      'react-icons/fi'
    ],
    force: command === 'serve'
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  server: {
    port: 3000,
    strictPort: true
  }
}));
