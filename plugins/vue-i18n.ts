import { Plugin } from '@nuxt/types'
import 'cookie-universal-nuxt'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n: Plugin = ({ app }) => {
  const locale = app.$cookies.get('locale') || 'ja'
  app.i18n = new VueI18n({
    locale,
    fallbackLocale: 'ja',
    messages: {
      ja: require('~/locales/ja.json'),
      en: require('~/locales/en.json'),
    },
  })
}

export default i18n
