module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  root: true,
  // add your custom rules here
  rules: {
    '@typescript-eslint/type-annotation-spacing': [2],
    'arrow-spacing': [2, { after: true, before: true }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, 'stroustrup', { allowSingleLine: true }]
  }
}
