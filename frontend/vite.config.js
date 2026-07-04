import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'firebase/app': path.resolve(__dirname, 'src/utils/firebase-mock.js'),
      'firebase/auth': path.resolve(__dirname, 'src/utils/firebase-mock.js'),
    }
  }
})
