<template>
  <div>
    <SharedMainHeader
      :title="`タグ「${tag}」のついた記事一覧`"
      :b_data="breadcrumb_data"
    />
    <b-container>
      <b-row>
        <b-col v-for="(val, key) in BlogList" :key="key">
          <BlogCard :article="val" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData({ $content, params }) {
    const { tag } = params
    const BlogList = await $content('articles', { deep: true })
      .where({ tags: { $contains: tag } })
      .sortBy('createDate', 'desc')
      .fetch()
    return {
      BlogList,
      breadcrumb_data: [
        { to: '/', text: 'Home' },
        { to: '/blog/', text: 'Blog' },
        { to: `/blog/tags/`, text: `タグ一覧` },
        { text: tag, active: true },
      ],
      tag,
    }
  },
  head() {
    return {
      title: `タグ「${(this as any).tag}」のついた記事一覧 - Blog`,
    }
  },
})
</script>
