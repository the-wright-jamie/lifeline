import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
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
