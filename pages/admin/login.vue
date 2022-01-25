<template>
  <div>
    <h1>Admin Login</h1>
    <b-breadcrumb>
      <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
      <b-breadcrumb-item active>Admin Home</b-breadcrumb-item>
    </b-breadcrumb>
    <hr />
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
})
</script>
