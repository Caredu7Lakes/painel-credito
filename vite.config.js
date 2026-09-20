import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// A API do BCB (SGS) permite CORS (access-control-allow-origin: *), então o app
// chama a API diretamente, sem proxy — funciona igual em dev e em produção.
export default defineConfig({
  plugins: [react()],
})