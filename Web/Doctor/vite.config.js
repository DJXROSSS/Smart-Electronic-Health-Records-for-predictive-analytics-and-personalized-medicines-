import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Import the plugin
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // <-- Add it to the plugins array
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})