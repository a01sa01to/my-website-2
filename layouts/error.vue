<template>
  <h1>{{ error.statusCode }}</h1>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>
