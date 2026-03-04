import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` evita tela em branco em deploy estático (ex.: GitHub Pages)
// quando o site não está na raiz do domínio.
export default defineConfig({
  base: './',
export default defineConfig({
  plugins: [react()],
});
