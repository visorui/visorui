import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'

export default defineConfig({
  plugins: [Vue(), WindiCSS()],
  resolve: {
    alias: [
      {
        find: /^@visorui\/([^\/]+)\/?(.+)?/,
        replacement: resolve(__dirname, '../packages/$1/src/$2')
      }
    ]
  }
})
