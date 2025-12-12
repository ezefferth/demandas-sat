import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import fs from 'fs';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Certifique-se de que o diretório de saída é o correto
  },
  server: {
    host: true, // Permite acesso pela rede local
    port: 3010, // Defina a porta desejada
    // https: {
    //   key: fs.readFileSync('./server.key'),
    //   cert: fs.readFileSync('./server.crt'),
    // },
    // hmr: {
    //   clientPort: 443, // Força o WebSocket a usar a porta correta
    //   protocol: 'wss', // Usa WebSocket seguro (wss://)
    //   host: 'admin.cti.dourados.ms.gov.br'
    // },
    // proxy: {
    //   '/api': {
    //     target: 'https://10.21.39.75:4001',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ''), // Remove o prefixo '/api'
    //   },
    // },
  },
})
