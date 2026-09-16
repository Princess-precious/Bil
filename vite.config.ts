import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({
      presets: [reactCompilerPreset()],
      plugins: [
        ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
        ['@babel/plugin-transform-class-properties', { loose: true }]
      ]
    })
  ],
})