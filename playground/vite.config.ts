import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [Vue(), WindiCSS()],
  resolve: {
    alias: [
      {
        find: /^@visorui\/([^/]+)\/?(.+)?/,
        replacement: resolve(__dirname, '../packages/$1/src/$2')
      }
    ]
  }
})
