import { NuxtConfig } from '@nuxt/types'
import '@nuxtjs/i18n'

const config: NuxtConfig = {
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/global.scss'
  ],

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    /* eslint-disable sort-keys */
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    titleTemplate: '%s - Asa\'s Website'
    /* eslint-enable sort-keys */
  },

  i18n: {
    defaultLocale: 'ja',
    /* eslint-disable sort-keys */
    locales: [{ code: 'ja', iso: 'ja-JP', file: 'locales/ja.json' }, { code: 'en', iso: 'en-US', file: 'locales/en.json' }]
    /* eslint-enable sort-keys */
  },

  loading: {
    color: '#0d6efd',
    continuous: true,
    css: true,
    duration: 5000,
    failedColor: '#ff0000',
    height: '2px',
    rtl: false,
    throttle: 200
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/i18n'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  render: {
    static: {
      setHeaders (res, path) {
        path = path.replace(/\\/g, '/')
        if (path.includes('/opendata/api/')) {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Content-Length')
        }
      }
    }
  },

  router: {
    trailingSlash: true
  },

  serverMiddleware: ['~/server-middleware/log.ts', {
    handler: '~/server-middleware/opendata/main.ts',
    path: '/opendata/api/'
  }]
}

export default config
