<template>
  <b-card
    :bg-variant="$store.state.darkmode ? 'dark' : 'light'"
    :text-variant="$store.state.darkmode ? 'light' : 'dark'"
    style="border-color: var(--border-color); max-width: 350px"
    :title="article.title"
  >
    <p class="text-muted">
      Published on {{ toDate(article.createDate) }}.<br />
      Last Modified on
      {{ toDate(article.updateDate) }}.
    </p>
    <div class="text-center">
      <b-button
        :variant="$store.state.darkmode ? 'outline-light' : 'outline-dark'"
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
import Vue from 'vue'
import { BIconBook } from 'bootstrap-vue'
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
  methods: {
    toDate(isostr: string) {
      const date = new Date(isostr)
      return `${date.getUTCFullYear()}.${String(
        date.getUTCMonth() + 1
      ).padStart(2, '0')}.${String(date.getUTCDate()).padStart(2, '0')}`
    },
  },
})
</script>
