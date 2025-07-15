import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //base: '/TP7-Productos-RR-Axios-Azubel/home', // 👈 IMPORTANTE: el nombre del repositorio con slashs
  plugins: [react()],
})

// github pages