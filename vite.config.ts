import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost', 
    port: 4000, 
    open: true, 
    strictPort: false, 
    //服务端代理设置
    proxy: {
      '/api': {
        target: "https://5akxnaj5l4.execute-api.ap-northeast-1.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  },
})
