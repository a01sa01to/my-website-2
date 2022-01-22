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

const _statusCode2Message = (statusCode: number) =>
  (StatusCode as { [key: string]: string })[String(statusCode)] ||
  'Unknown Error'

export default Vue.extend({
  head() {
    return {
      title: `${this.error.statusCode} ${_statusCode2Message(
        this.error.statusCode as number
      )}`,
    }
  },
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    statuscode2message(statusCode: number) {
      return _statusCode2Message(statusCode)
    },
  },
})
</script>
