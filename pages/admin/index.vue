<template>
  <div>
    <h1>Admin Tools</h1>
    <b-breadcrumb>
      <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
      <b-breadcrumb-item active>Admin Home</b-breadcrumb-item>
    </b-breadcrumb>
    <hr />

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
  middleware: 'auth',
})
</script>
