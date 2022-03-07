<template>
  <header>
    <b-navbar
      class="shadow"
      fixed="top"
      :type="navbarTheme"
      :variant="navbarTheme"
      toggleable="lg"
    >
      <b-navbar-brand :to="localePath('/')" style="color: var(--text-color)">
        Asa's Website
      </b-navbar-brand>
      <b-navbar-toggle target="header-nav-collapse" />
      <b-collapse id="header-nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="localePath('/')">Home</b-nav-item>
          <b-nav-item :to="localePath('/apps/')">Apps</b-nav-item>
          <b-nav-item :to="localePath('/blog/')">Blog</b-nav-item>
          <b-nav-item :to="localePath('/opendata/')">Opendata</b-nav-item>
          <b-nav-item-dropdown
            text="Language"
            right
            v-if="!$route.path.includes('/blog/')"
          >
            <b-dropdown-item
              :to="switchLocalePath('ja')"
              :disabled="$i18n.locale === 'ja'"
            >
              Japanese
            </b-dropdown-item>
            <b-dropdown-item
              :to="switchLocalePath('en')"
              :disabled="$i18n.locale === 'en'"
            >
              English
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Theme" right>
            <b-dropdown-item
              @click="$colorMode.preference = 'system'"
              href="#"
              :disabled="$colorMode.preference === 'system'"
            >
              <b-icon-display />
              System (<span id="system-color-config" />)
            </b-dropdown-item>
            <b-dropdown-item
              @click="$colorMode.preference = 'light'"
              href="#"
              :disabled="$colorMode.preference === 'light'"
            >
              <b-icon-sun />
              Light
            </b-dropdown-item>
            <b-dropdown-item
              @click="$colorMode.preference = 'dark'"
              href="#"
              :disabled="$colorMode.preference === 'dark'"
            >
              <b-icon-moon />
              Dark
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script lang="ts">
import { BIconDisplay, BIconMoon, BIconSun } from 'bootstrap-vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    BIconSun,
    BIconMoon,
    BIconDisplay,
  },
  computed: {
    navbarTheme() {
      return this.$colorMode.value === 'dark' ? 'dark' : 'light'
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

#system-color-config::before {
  content: 'Light';
}
@media (prefers-color-scheme: dark) {
  #system-color-config::before {
    content: 'Dark';
  }
}
</style>
