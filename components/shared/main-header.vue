<template>
  <b-container>
    <h1>{{ title }}</h1>
    <breadcrumb :data="b_data" />
    <p v-if="description" :class="description_right ? 'text-right' : null">
      {{ description }}
    </p>
    <slot />
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
    description: {
      type: String,
      required: false,
      default: '',
    },
    description_right: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>
