import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: 'spa',
  resolve: {
    alias: {
      '@studio': path.resolve(__dirname, '..'),
    },
  },
})
