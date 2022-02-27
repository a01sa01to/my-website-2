import bootstrapvue from './modules/bootstrap-vue'
import cookieuniversalnuxt from './modules/cookie-universal-nuxt'
import nuxtcontent from './modules/nuxt-content'
import nuxtjsauthnext from './modules/nuxtjs-auth-next'
import nuxtjsgooglefonts from './modules/nuxtjs-google-fonts'
import nuxtjsgooglegtag from './modules/nuxtjs-google-gtag'
import nuxtjsredirectmodule from './modules/nuxtjs-redirect-module'

export default {
  modules: {
    'bootstrap-vue': bootstrapvue,
    'cookie-universal-nuxt': cookieuniversalnuxt,
    '@nuxtjs/google-fonts': nuxtjsgooglefonts,
    '@nuxt/content': nuxtcontent,
    '@nuxtjs/auth-next': nuxtjsauthnext,
    '@nuxtjs/google-gtag': nuxtjsgooglegtag,
    '@nuxtjs/redirect-module': nuxtjsredirectmodule,
  },
}
