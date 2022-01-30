<template>
  <b-container>
    <p>Please wait...</p>
  </b-container>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head: {
    title: 'Please wait...',
  },
  middleware: 'auth',
})
</script>
