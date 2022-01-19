<template>
  <div>
    <p>{{ year }} {{ month }} {{ blogid }}</p>
    <nuxt-content :document="mdContent"></nuxt-content>
    <ul>
      <li v-for="(value, key) in mdContent">{{ key }}: {{ value }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, params, error }) {
    const { year, month, blog } = params
    try {
      const mdContent = await $content(
        `articles/${year}/${month}/${blog}`
      ).fetch()

      return {
        year,
        month,
        blogid: blog,
        mdContent,
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  head() {
    return {
      title: (this as any).mdContent.title,
    }
  },
})
</script>
