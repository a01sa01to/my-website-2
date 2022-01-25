<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item
        v-for="d in data"
        v-bind:key="d.to"
        :to="d.to"
        :active="d.active"
      >
        {{ d.text }}
      </b-breadcrumb-item>
    </b-breadcrumb>
    <hr />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    data: {
      type: Array,
      default: [{ text: 'Home', to: '/' }],
    },
  },
})
</script>
