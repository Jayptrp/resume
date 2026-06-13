import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages project path (jayptrp.github.io/resume)
// only in build; dev server stays at root for convenience.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/resume/' : '/',
  plugins: [react()],
}))
