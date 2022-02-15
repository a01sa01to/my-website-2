<template>
  <div>
    <b-container>
      <h1>503</h1>
      <p>{{ $t('このページは現在メンテナンス中です。') }}</p>
      <nuxt-link to="/">{{ $t('トップページに戻る') }}</nuxt-link>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head() {
    return {
      title: '503 Service Unavailable',
    }
  },
})
</script>
