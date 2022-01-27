<template>
  <div
    class="icon_container text-center"
    @mouseover="hover = true"
    @mouseout="hover = false"
    :style="{ color: hover ? hovercolor : 'var(--text-color)' }"
    :data-color="hovercolor"
  >
    <div id="icon"><slot name="icon" /></div>
    <span id="text">
      <slot name="text" />
      <b-icon-chevron-right />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BIconChevronRight } from 'bootstrap-vue'
export default Vue.extend({
  components: {
    BIconChevronRight,
  },
  props: {
    hovercolor: {
      type: String,
    },
  },
  data() {
    return {
      hover: false,
    }
  },
})
</script>

<style lang="scss" scoped>
.icon_container {
  transition: 300ms;
  #icon {
    font-size: 2rem;
    color: inherit;
  }
  #text {
    font-size: 0.9rem;
    color: inherit;
  }
}
</style>
