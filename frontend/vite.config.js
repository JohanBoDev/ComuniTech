import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/sitemap.xml',
          dest: '.' // se copiará directo a /dist
        }
      ]
    })
  ],
  base: '/',
});
