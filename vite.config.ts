import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vite-entry-injector',
      transformIndexHtml: {
        order: 'pre',
        handler (html) {
          if (!html.includes('/src/main.tsx')) {
            return html.replace(
              '</body>',
              '  <div id="apppopupmax"></div>\n  <script type="module" src="/src/main.tsx"></script>\n</body>'
            )
          }
          return html
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  build: {
    outDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'index-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
      },
    },
  },
})
