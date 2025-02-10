import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: {
      origin: ['https://accounts.google.com', 'http://localhost:5000', 'https://simply-backend-yl91.onrender.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
    }
  }
})