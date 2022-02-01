<template>
  <picture>
    <source type="image/webp" :srcset="`${src}.webp`" />
    <img :src="`${src}.${ext}`" :alt="alt" loading="lazy" />
  </picture>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
    },
    ext: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
img {
  width: inherit;
  max-width: inherit;
}
</style>
