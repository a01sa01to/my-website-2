<template>
  <div>
    <p>Please wait...</p>
  </div>
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
