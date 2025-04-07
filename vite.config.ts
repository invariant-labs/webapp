import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import { compression } from 'vite-plugin-compression2'
import inject from '@rollup/plugin-inject'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    topLevelAwait(),
    wasm(),
    compression(),
    inject({
      assert: ['assert', 'default']
    }),
    nodePolyfills()
  ],
  define: {
    'process.env.NODE_DEBUG': 'false',
    'process.browser': `"test"`,
    'process.version': `"test"`
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@common': '/src/common',
      '@containers': '/src/containers',
      '@pages': '/src/pages',
      '@static': '/src/static',
      '@store': '/src/store',
      '@web3': '/src/web3',
      '@utils': '/src/utils',
      '@/': '/src'
    }
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      external: ['fs/promises', 'path'],
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })]
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  }
})
