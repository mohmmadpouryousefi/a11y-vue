import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.test.ts'],
      restoreMocks: true,
      coverage: { include: ['src/**/*.{ts,vue}'], exclude: ['src/**/*.stories.ts', 'src/test/**'] },
    },
  }),
)
