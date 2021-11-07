import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest'
  }
}

export default config
