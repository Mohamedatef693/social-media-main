import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

const pagesRouterBasename: Plugin = {
  name: 'pages-router-basename',
  enforce: 'pre',
  transform(code, id) {
    const normalizedId = id.replace(/\\/g, '/')
    if (!normalizedId.endsWith('/src/App.tsx')) return null

    const start = code.indexOf('const router = createBrowserRouter([')
    const close = code.indexOf('  ]);', start)
    if (start < 0 || close < 0) {
      throw new Error('Could not add the GitHub Pages router basename.')
    }

    return code.slice(0, close) +
      '  ], { basename: import.meta.env.BASE_URL });' +
      code.slice(close + 5)
  },
}

export default defineConfig({
  base: '/social-media-main/',
  plugins: [react(), tailwindcss(), pagesRouterBasename],
})
