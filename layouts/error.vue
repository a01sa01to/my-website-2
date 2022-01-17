<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>{{ statuscode2message(error.statusCode) }}</p>
    <nuxt-link to="/">{{ $t('トップページに戻る') }}</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StatusCode from '~/assets/status-code.json'
export default Vue.extend({
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    statuscode2message(statusCode: number) {
      return (
        (StatusCode as { [key: string]: string })[String(statusCode)] ||
        'Unknown Error'
      )
    },
  },
})
</script>
