<template>
  <b-container>
    <h1>{{ title }}</h1>
    <breadcrumb :data="b_data" />
    <hr />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    b_data: {
      type: Array,
      required: true,
    },
  },
})
</script>
