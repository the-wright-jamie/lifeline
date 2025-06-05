import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
// For future reference:
// vueTsc needs to be defined here or else the error checking won't work
export default defineConfig({
  plugins: [
    vue(),
    checker({
      typescript: true,
      vueTsc: {
        tsconfigPath: './tsconfig.app.json'
      }
    })
  ],
  base: '/lifeline/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
