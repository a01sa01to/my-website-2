import bootstrapvue from './modules/bootstrap-vue'
import nuxtcontent from './modules/nuxt-content'
import nuxtjsauthnext from './modules/nuxtjs-auth-next'
import nuxtjsgooglefonts from './modules/nuxtjs-google-fonts'
import nuxtjsgooglegtag from './modules/nuxtjs-google-gtag'
import nuxtjsredirectmodule from './modules/nuxtjs-redirect-module'
import nuxtjssitemap from './modules/nuxtjs-sitemap'
import nuxtjsi18n from './modules/nuxtjs-i18n'

export default {
  modules: {
    'bootstrap-vue': bootstrapvue,
    '@nuxtjs/google-fonts': nuxtjsgooglefonts,
    '@nuxt/content': nuxtcontent,
    '@nuxtjs/auth-next': nuxtjsauthnext,
    '@nuxtjs/google-gtag': nuxtjsgooglegtag,
    '@nuxtjs/redirect-module': nuxtjsredirectmodule,
    '@nuxtjs/sitemap': nuxtjssitemap,
    '@nuxtjs/i18n': nuxtjsi18n,
  },
}
