import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import fs from 'fs'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Certifique-se de que o diretório de saída é o correto
  },
  server: {
    host: true, // Permite acesso pela rede local
    port: 3000, // Defina a porta desejada
/*     https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    }, */
    proxy: {
      '/api': {
        target: 'https://10.21.39.75:4001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o prefixo '/api'
      },

    },
  },
})
