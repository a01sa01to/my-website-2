<template>
  <div
    class="icon_container text-center"
    v-b-hover="hoverhandler"
    :style="{ color: hover ? hovercolor : 'var(--text-color)' }"
    :data-color="hovercolor"
  >
    <div class="icon"><slot name="icon" /></div>
    <span class="text">
      <slot name="text" />
      <b-icon-chevron-right />
    </span>
  </div>
</template>

<script lang="ts">
import { BIconChevronRight } from 'bootstrap-vue'
import Vue from 'vue'
export default Vue.extend({
  components: {
    BIconChevronRight,
  },
  props: {
    hovercolor: {
      type: String,
      default: '#6c757d',
    },
  },
  data() {
    return {
      hover: false,
    }
  },
  methods: {
    hoverhandler(hovered: boolean) {
      this.hover = hovered
    },
  },
})
</script>

<style lang="scss" scoped>
.icon_container {
  transition: 300ms;
  .icon {
    font-size: 2rem;
    color: inherit;
  }
  .text {
    font-size: 0.9rem;
    color: inherit;
  }
}
</style>
