<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item
        v-for="d in data"
        :key="d.to"
        :to="d.to"
        :active="d.active"
      >
        {{ d.text }}
      </b-breadcrumb-item>
    </b-breadcrumb>
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
