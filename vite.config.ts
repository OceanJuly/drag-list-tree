import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        additionalData: `@import "${path.resolve(__dirname, "./src/assets/css/variables.less")}";`
      }
    }
  }
})
