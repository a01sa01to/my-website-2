<template>
  <div>
    <SharedMainHeader title="Admin Tools" :b_data="breadcrumb_data" />
    <b-container>
      <b-list-group>
        <b-list-group-item
          :variant="$store.state.darkmode ? 'dark' : 'light'"
          to="./cov19-ibk/"
        >
          Covid19 Ibaraki Updater
        </b-list-group-item>
        <b-list-group-item
          :variant="$store.state.darkmode ? 'dark' : 'light'"
          to="./update-icon/"
        >
          Update Icon List
        </b-list-group-item>
      </b-list-group>
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
