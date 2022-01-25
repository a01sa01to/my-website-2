<template>
  <div>
    <h1>Admin Tools</h1>
    <breadcrumb :data="breadcrumb_data" />
    <b-list-group>
      <b-list-group-item
        :variant="$store.state.darkmode ? 'dark' : 'light'"
        to="./cov19-ibk"
        >Covid19 Ibaraki Updater</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head: {
    title: 'Admin Home',
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
