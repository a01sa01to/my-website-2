<template>
  <div>
    <SharedMainHeader title="Admin Login" :b_data="breadcrumb_data" />
    <b-container>
      <p>
        You cannot view this page without logging in.<br />
        Of cource, you cannot view if you are not admin.
      </p>
      <b-button variant="primary" @click="$auth.login()">
        Continue with GitHub
      </b-button>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head: {
    title: 'Login - Admin',
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
