<template>
  <div>
    <div id="loader" :data-loading="loading" v-if="showing">
      <b-spinner variant="primary" class="m-2" />
      <span>Loading...</span>
    </div>
    <shared-header />
    <main><nuxt /></main>
    <shared-footer />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      loading: true,
      showing: true,
    }
  },
  mounted() {
    this.loading = false
    setTimeout(() => {
      this.showing = false
    }, 3000)
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      link: [
        {
          rel: 'canonical',
          href: `https://a01sa01to.com${this.$route.path}`,
        },
        ...i18nHead.link,
      ],
      meta: [...i18nHead.meta],
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

div#loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f8f9fa;
  z-index: 9999;
  color: #343a40;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 1s;
  transition-delay: 1.5s;
  &[data-loading='true'] {
    opacity: 1;
  }
  span {
    font-size: 1.5rem;
  }
}
@media (prefers-color-scheme: dark) {
  div#loader {
    background-color: #343a40;
    color: #f8f9fa;
  }
}
</style>
