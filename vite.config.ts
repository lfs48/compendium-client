import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default {
  plugins: [
    react(),
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@atoms': path.resolve(__dirname, './src/components/UI/atoms'),
      "@molecules": path.resolve(__dirname, './src/components/UI/molecules'),
      "@organisms": path.resolve(__dirname, './src/components/UI/organisms'),
      "@pages": path.resolve(__dirname, './src/components/pages')
    }
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  }
}
