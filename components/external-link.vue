<template>
  <a :href="to" target="_blank" rel="noopener noreferrer">
    <slot />
    <b-icon-box-arrow-up-right />
  </a>
</template>
<script lang="ts">
import Vue from 'vue'
import { BIconBoxArrowUpRight } from 'bootstrap-vue'
export default Vue.extend({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  components: {
    BIconBoxArrowUpRight,
  },
})
</script>
<style lang="scss" scoped>
a {
  display: inline;
  padding-right: 0.5em;
}
</style>
