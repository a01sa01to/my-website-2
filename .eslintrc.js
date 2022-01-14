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
    'arrow-spacing': [2, { after: true, before: true }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, 'stroustrup', { allowSingleLine: true }],
    'sort-keys': [1, 'asc', { caseSensitive: true, minKeys: 2, natural: false }]
  }
}
