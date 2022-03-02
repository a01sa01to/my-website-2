<template>
  <b-card
    :bg-variant="$colorMode.value === 'dark' ? 'dark' : 'light'"
    :text-variant="$colorMode.value === 'dark' ? 'light' : 'dark'"
    :title="article.title"
    class="bcard"
  >
    <p class="text-muted">
      Published on {{ toDate(article.createDate) }}.<br />
      Last Modified on
      {{ toDate(article.updateDate) }}.
    </p>
    <div class="text-center">
      <b-button
        :variant="
          $colorMode.value === 'dark' ? 'outline-light' : 'outline-dark'
        "
        pill
        :to="article.path.replace('articles', 'blog')"
      >
        <b-icon-book />
        Read
      </b-button>
    </div>
  </b-card>
</template>
<script lang="ts">
import { BIconBook } from 'bootstrap-vue'
import Vue from 'vue'
import toDate from '~/utils/date-format'
export default Vue.extend({
  components: {
    BIconBook,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toDate,
    }
  },
})
</script>
<style lang="scss" scoped>
.bcard {
  margin: 1rem 0;
  border-color: var(--border-color);
  max-width: 350px;
}
</style>
