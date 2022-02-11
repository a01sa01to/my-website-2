<template>
  <div>
    <shared-main-header title="Admin Tools" :b_data="breadcrumb_data" />
    <b-container>
      <ul>
        <li>
          <nuxt-link to="./cov19-ibk/">Covid19 Ibaraki Updater</nuxt-link>
        </li>
        <li><nuxt-link to="./update-icon/">Update Icon List</nuxt-link></li>
      </ul>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head: {
    title: 'Home - Admin',
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'Admin Home', to: '/admin/', active: true },
      ],
    }
  },
  middleware: 'auth',
})
</script>
