import { NuxtConfig } from '@nuxt/types'
import '@nuxtjs/auth-next'

const config: NuxtConfig = {
  auth: {
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

  bootstrapVue: {
    icons: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
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
    '@nuxtjs/google-analytics',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  content: {
    markdown: {
      prism: {
        theme: '~/assets/styles/markdown-code-highlight.css',
      },
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex'],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/global.scss'],

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    titleTemplate: "%s - Asa's Website",
    script: [
      {
        src: '/twttr_load.js',
      },
    ],
  },

  googleAnalytics: {
    id: 'G-Z23EQDNLQY',
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
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['cookie-universal-nuxt', { parseJSON: false }],
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-clipboard2',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-i18n.ts'],

  privateRuntimeConfig: {
    GITHUB_CLI_ID: process.env.GITHUB_CLI_ID,
    GITHUB_CLI_SEC: process.env.GITHUB_CLI_SEC,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  render: {
    static: {
      setHeaders(res, path) {
        path = path.replace(/\\/g, '/')
        if (path.includes('/opendata/api/')) {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
          res.setHeader(
            'Access-Control-Allow-Headers',
            'Accept, Content-Type, Content-Length'
          )
        }
      },
    },
  },

  router: {
    trailingSlash: true,
    middleware: ['trailingslash-redirect'],
  },

  serverMiddleware: [
    {
      handler: '~/server-middleware/opendata/main.ts',
      path: '/opendata/api/',
    },
  ],
}

export default config
