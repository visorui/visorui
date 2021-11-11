import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./scripts/setupJestEnv.ts'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest'
  }
}

export default config
