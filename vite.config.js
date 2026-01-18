import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    host: true,
    strictPort: false,
    // Proxy API calls to Vercel dev server if running separately
    proxy: process.env.VERCEL_DEV_API_PORT ? {
      '/api': {
        target: `http://localhost:${process.env.VERCEL_DEV_API_PORT}`,
        changeOrigin: true,
      }
    } : undefined,
  },
})

