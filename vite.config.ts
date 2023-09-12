import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  base: '/end-time/',
  plugins: [
    reactRefresh(),
    legacy({
      targets: ['defaults']
    })
  ],
})
