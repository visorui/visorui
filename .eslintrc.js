module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: ['@antfu', 'prettier'],
  rules: {
    'import/named': 'off',
    'import/order': 'error',
    'import/first': 'error',
    'import/no-unresolved': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'error'
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.spec.ts'],
      rules: {
        'vue/one-component-per-file': 'off'
      }
    }
  ]
}
