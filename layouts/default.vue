<template>
  <div>
    <shared-header />
    <main><nuxt /></main>
    <shared-footer />
    <div id="darkmode-dummy" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isDarkmode: false,
    }
  },
  mounted() {
    this.isDarkmode = window.matchMedia('(prefers-color-scheme: dark)').matches
    this.$store.commit('setdarkmode', this.isDarkmode)
    const darkmodeDOM = document.getElementById('darkmode-dummy')
    if (darkmodeDOM) {
      const observer = new IntersectionObserver(() => {
        this.isDarkmode = getComputedStyle(darkmodeDOM).display === 'block'
        this.$store.commit('setdarkmode', this.isDarkmode)
      })
      observer.observe(darkmodeDOM)
    }
  },
})
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-flow: column;
  min-height: 100%;
}
main {
  flex: 1;
  padding-top: calc(64px + 1rem);
}
</style>
