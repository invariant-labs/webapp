// vite.config.ts
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import { compression } from 'vite-plugin-compression2'
import inject from '@rollup/plugin-inject'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
var vite_config_default = defineConfig({
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
    port: 3e3
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
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHRvcExldmVsQXdhaXQgZnJvbSAndml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0J1xuaW1wb3J0IHdhc20gZnJvbSAndml0ZS1wbHVnaW4td2FzbSdcbmltcG9ydCB7IGNvbXByZXNzaW9uIH0gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24yJ1xuaW1wb3J0IGluamVjdCBmcm9tICdAcm9sbHVwL3BsdWdpbi1pbmplY3QnXG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB0b3BMZXZlbEF3YWl0KCksXG4gICAgd2FzbSgpLFxuICAgIGNvbXByZXNzaW9uKCksXG4gICAgaW5qZWN0KHtcbiAgICAgIGFzc2VydDogWydhc3NlcnQnLCAnZGVmYXVsdCddXG4gICAgfSksXG4gICAgbm9kZVBvbHlmaWxscygpXG4gIF0sXG4gIGRlZmluZToge1xuICAgICdwcm9jZXNzLmVudi5OT0RFX0RFQlVHJzogJ2ZhbHNlJyxcbiAgICAncHJvY2Vzcy5icm93c2VyJzogYFwidGVzdFwiYCxcbiAgICAncHJvY2Vzcy52ZXJzaW9uJzogYFwidGVzdFwiYFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAY29tcG9uZW50cyc6ICcvc3JjL2NvbXBvbmVudHMnLFxuICAgICAgJ0Bjb21tb24nOiAnL3NyYy9jb21tb24nLFxuICAgICAgJ0Bjb250YWluZXJzJzogJy9zcmMvY29udGFpbmVycycsXG4gICAgICAnQHBhZ2VzJzogJy9zcmMvcGFnZXMnLFxuICAgICAgJ0BzdGF0aWMnOiAnL3NyYy9zdGF0aWMnLFxuICAgICAgJ0BzdG9yZSc6ICcvc3JjL3N0b3JlJyxcbiAgICAgICdAd2ViMyc6ICcvc3JjL3dlYjMnLFxuICAgICAgJ0B1dGlscyc6ICcvc3JjL3V0aWxzJyxcbiAgICAgICdALyc6ICcvc3JjJ1xuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgcG9ydDogMzAwMFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzMjAyMCcsXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDAsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsnZnMvcHJvbWlzZXMnLCAncGF0aCddLFxuICAgICAgcGx1Z2luczogW2luamVjdCh7IEJ1ZmZlcjogWydidWZmZXInLCAnQnVmZmVyJ10gfSldXG4gICAgfVxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgdGFyZ2V0OiAnZXMyMDIwJ1xuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsbUJBQW1CO0FBQzVCLE9BQU8sWUFBWTtBQUNuQixTQUFTLHFCQUFxQjtBQUc5QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxLQUFLO0FBQUEsSUFDTCxZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsTUFDTCxRQUFRLENBQUMsVUFBVSxTQUFTO0FBQUEsSUFDOUIsQ0FBQztBQUFBLElBQ0QsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTiwwQkFBMEI7QUFBQSxJQUMxQixtQkFBbUI7QUFBQSxJQUNuQixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsbUJBQW1CO0FBQUEsSUFDbkIsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLGVBQWUsTUFBTTtBQUFBLE1BQ2hDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFVBQVUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUFBLElBQ3BEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
