module.exports = {
  root: true,
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
  // add your custom rules here
  rules: {
    'arrow-spacing': [2, { before: true, after: true }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, 'stroustrup', { allowSingleLine: true }]
  }
}
