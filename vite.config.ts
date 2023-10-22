import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import del from 'rollup-plugin-delete'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'data-grid-vue',
      fileName: 'data-grid-vue',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      plugins: [del({ targets: ['dist/favicon.png', 'dist/favicon.svg'], hook: 'generateBundle' })],
    },
  },
})
