module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['standard', 'vue', 'prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    indent: 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'comma-dangle': ['error', 'never'],
    'generator-star-spacing': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'space-before-function-paren': 'off',
    'declaration-colon-newline-after': 'off'
  }
}
