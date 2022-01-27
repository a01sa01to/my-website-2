<template>
  <header>
    <b-navbar
      class="shadow"
      fixed="top"
      :type="navbarTheme"
      :variant="navbarTheme"
      toggleable="lg"
    >
      <b-navbar-brand href="#">Asa's Website</b-navbar-brand>
      <b-navbar-toggle target="header-nav-collapse" />
      <b-collapse id="header-nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">hogehoge</b-nav-item>
          <b-nav-item href="#">hogehoge</b-nav-item>
          <b-nav-item href="#">hogehoge</b-nav-item>
          <b-nav-item href="#">hogehoge</b-nav-item>
          <b-nav-item-dropdown text="Language" right>
            <b-dropdown-item @click="changeLocale('ja')" href="#"
              >Japanese</b-dropdown-item
            >
            <b-dropdown-item @click="changeLocale('en')" href="#"
              >English</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script lang="ts">
import 'cookie-universal-nuxt'
import Vue from 'vue'
import 'vue-i18n'
export default Vue.extend({
  computed: {
    navbarTheme() {
      return this.$store.state.darkmode ? 'dark' : 'light'
    },
  },
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

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 100;
}
</style>
