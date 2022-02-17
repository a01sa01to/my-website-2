import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Muli: true,
          'Noto Sans JP': [300],
          'Open Sans': true,
          Quicksand: true,
        },
        display: 'swap',
      },
    ],
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/global.scss'],

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    link: [
      {
        rel: 'icon',
        href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:60px;font-family:cursive;%22 fill=%22%230d47a1%22>Asa</text></svg>',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css',
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
        src: '/twttr_load.js',
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

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    ['bootstrap-vue/nuxt', { icons: false }],
    ['cookie-universal-nuxt', { parseJSON: false }],
    // [
    //   '@nuxt/content',
    //   {
    //     markdown: {
    //       prism: {
    //         theme: '~/assets/styles/markdown-code-highlight.scss',
    //       },
    //       remarkPlugins: ['remark-math'],
    //       rehypePlugins: ['rehype-katex'],
    //     },
    //   },
    // ],
    '@nuxtjs/axios',
    [
      '@nuxtjs/auth-next',
      {
        strategies: {
          github: {
            cliendId: process.env.GITHUB_CLI_ID,
            clientSecret: process.env.GITHUB_CLI_SEC,
          },
        },
        cookie: {
          options: {
            path: '/admin/',
            maxAge: 60 * 60 * 24 * 7,
          },
        },
        localStorage: false,
        redirect: {
          home: '/admin/',
          callback: '/admin/callback/',
          login: '/admin/login/',
          logout: '/admin/login/',
        },
      },
    ],
    'nuxt-clipboard2',
    [
      '@nuxtjs/google-gtag',
      {
        id: 'G-Z23EQDNLQY',
      },
    ],
    '@nuxtjs/color-mode',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-i18n.ts'],

  privateRuntimeConfig: {
    GITHUB_CLI_ID: process.env.GITHUB_CLI_ID,
    GITHUB_CLI_SEC: process.env.GITHUB_CLI_SEC,
  },

  router: {
    trailingSlash: true,
    middleware: ['trailingslash-redirect', 'blog-redirect-temp'],
  },

  serverMiddleware: [
    {
      handler: '~/server-middleware/opendata/main.ts',
      path: '/opendata/api/',
    },
  ],
})
