<template>
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    focusable="false"
    :aria-label="data.title"
    fill="currentColor"
    class="b-icon bi"
  >
    <g>
      <path :d="data.path" />
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
})
</script>
