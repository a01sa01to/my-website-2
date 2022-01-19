<template>
  <div :data-darkmode="String(isDarkmode)">
    <SharedHeader />
    <main><Nuxt /></main>
    <SharedFooter />
    <div id="darkmode-dummy" />
  </div>
</template>

<style lang="scss" scoped>
main {
  margin-top: calc(64px + 1em);
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isDarkmode: false,
    }
  },
  mounted() {
    const darkmodeDOM = document.getElementById('darkmode-dummy')
    if (darkmodeDOM) {
      const observer = new IntersectionObserver(() => {
        this.isDarkmode = getComputedStyle(darkmodeDOM).display === 'block'
      })
      observer.observe(darkmodeDOM)
    }
  },
})
</script>
