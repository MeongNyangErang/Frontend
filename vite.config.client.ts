import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  root: 'src/client',
  publicDir: '../../public',
  define: {
    global: 'window',
  },
  base: '/',
  build: {
    outDir: '../../../dist/client',
  },
});
