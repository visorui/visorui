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
  extends: [
    'standard',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  rules: {
    'import/named': 'off',
    'import/order': 'error',
    'import/first': 'error',
    'import/no-unresolved': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  }
}
