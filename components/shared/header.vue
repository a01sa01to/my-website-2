<template>
  <div>
    <p>header</p>
    <p @click="changeLocale('ja')">Jap</p>
    <p @click="changeLocale('en')">Eng</p>
  </div>
</template>

<script lang="ts">
import 'cookie-universal-nuxt'
import Vue from 'vue'
import 'vue-i18n'
import 'cookie-universal-nuxt'
import 'vue-i18n'
export default Vue.extend({
  methods: {
    changeLocale(lang: string) {
      this.$cookies.set('locale', lang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      })
      this.$i18n.locale = lang
    },
  },
})
</script>
