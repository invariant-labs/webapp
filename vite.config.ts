import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'
import reactRefresh from '@vitejs/plugin-react-refresh'
export default defineConfig({
  plugins: [
    reactRefresh(),
    ViteAliases({
      adjustDuplicates: true,
      depth: 4
    })
  ],
  define: {
    'process.env.NODE_DEBUG': 'false'
  }
})
