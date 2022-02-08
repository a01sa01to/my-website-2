<template>
  <picture class="webpimage" :title="alt">
    <source type="image/webp" :srcset="`${src}.webp`" class="webpimage" />
    <img :src="`${src}.${ext}`" :alt="alt" loading="lazy" class="webpimage" />
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
picture.webpimage {
  > img.webpimage {
    display: inherit;
    width: inherit;
    max-width: inherit;
    margin: 0;
    border: 0;
  }
}
</style>
