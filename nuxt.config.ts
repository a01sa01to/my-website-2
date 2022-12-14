import { defineNuxtConfig } from '@nuxt/bridge'
import MyConfig from './config/main'

export default defineNuxtConfig({
  buildModules: [
    ['@nuxtjs/google-fonts', MyConfig.modules['@nuxtjs/google-fonts']],
    // ["@nuxtjs/algolia", MyConfig.modules['@nuxtjs/algolia']]
  ],

  components: true,

  css: ['@/assets/styles/global.scss'],

  head: {
    link: [
      {
        rel: 'icon',
        href: '/favicon.png',
        type: 'image/png',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css',
        integrity:
          'sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB',
        crossorigin: 'anonymous',
      },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@a01sa01to' },
      { name: 'twitter:creator', content: '@a01sa01to' },
    ],
    titleTemplate: "%s - Asa's Website",
    script: [
      {
        src: '/twttr-load.js',
      },
    ],
  },

  loading: {
    color: '#0d6efd',
    continuous: true,
    css: true,
    duration: 5000,
    failedColor: '#ff0000',
    height: '2px',
    rtl: false,
    throttle: 200,
  },

  modules: [
    ['bootstrap-vue/nuxt', MyConfig.modules['bootstrap-vue']],
    // ['@nuxt/content', MyConfig.modules['@nuxt/content']],
    '@nuxtjs/axios',
    ['@nuxtjs/auth-next', MyConfig.modules['@nuxtjs/auth-next']],
    ['@nuxtjs/google-gtag', MyConfig.modules['@nuxtjs/google-gtag']],
    '@nuxtjs/color-mode',
    // ['@nuxtjs/redirect-module', MyConfig.modules['@nuxtjs/redirect-module']],
    ['@nuxtjs/i18n', MyConfig.modules['@nuxtjs/i18n']],
    // ['@nuxtjs/sitemap', MyConfig.modules['@nuxtjs/sitemap']], // Should be placed at the last
  ],

  modern: 'server',

  privateRuntimeConfig: {
    GITHUB_CLI_ID: process.env.GITHUB_CLI_ID,
    GITHUB_CLI_SEC: process.env.GITHUB_CLI_SEC,
  },

  publicRuntimeConfig: {
    development: process.env.development,
  },

  router: {
    trailingSlash: true,
    middleware: ['trailingslash-redirect', 'snakecase-redirect'],
  },

  serverMiddleware: [
    '~/server/middleware/redirect.ts',
    '~/server/middleware/add-header.ts',
  ],
})
