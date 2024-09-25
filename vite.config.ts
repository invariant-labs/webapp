import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

export default defineConfig({
  plugins: [
    react(),
    ViteAliases({
      adjustDuplicates: true,
      depth: 4
    }),
    nodePolyfills()
  ],
  define: {
    'process.env.NODE_DEBUG': 'false'
  },
  build: {
    minify: false,
    sourcemap: true,
    target: 'es2020',
    rollupOptions: {
      plugins: [
        inject({
          Buffer: ['buffer/', 'Buffer'],
          process: 'process/browser'
        })
      ]
    }
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer'
    }
  }
})
