<template>
  <div>
    <h1>Admin Login</h1>
    <breadcrumb :data="breadcrumb_data" />
    <p>
      You cannot view this page without logging in.<br />
      Of cource, you cannot view if you are not admin.
    </p>
    <b-button variant="primary" @click="$auth.login()">
      Continue with GitHub
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head: {
    title: 'Admin Login',
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'Admin Login', to: '/admin/login/', active: true },
      ],
    }
  },
})
</script>
