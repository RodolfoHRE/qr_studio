import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tauri espera uma porta fixa e não deve engolir os erros do Rust.
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      // não re-disparar o dev server quando o lado Rust muda
      ignored: ['**/src-tauri/**'],
    },
  },
  envPrefix: ['VITE_', 'TAURI_ENV_'],
})
