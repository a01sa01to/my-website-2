<template>
  <div>
    <b-container>
      <b-jumbotron
        :text-variant="$store.state.darkmode ? 'light' : 'dark'"
        :bg-variant="$store.state.darkmode ? 'dark' : 'light'"
      >
        <template #header>Asa's Blog</template>
        <template #lead>Scroll down to explore this site</template>
      </b-jumbotron>
      <scroll-next-animation />
      <b-container v-if="$i18n.locale !== 'ja'">
        <h2>Caution</h2>
        <p>
          For the sake of translation effort, this blog is available in Japanese
          only.
        </p>
      </b-container>
      <b-container>
        <h2>Latest Articles</h2>
        <b-row cols-xl="3" cols-lg="3" cols-md="2" cols-sm="1" cols="1">
          <b-col v-for="(val, key) in BlogList" :key="key">
            <BlogCard :article="val" />
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <h2>Find more...</h2>
        <ul>
          <li>
            <nuxt-link :to="`/blog/${thisYear}/`"
              >{{ thisYear }}年の記事一覧</nuxt-link
            >
          </li>
          <li><nuxt-link to="/blog/tags/">タグ一覧</nuxt-link></li>
        </ul>
      </b-container>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import toDate from '~/utils/date_format'

export default Vue.extend({
  async asyncData({ $content }) {
    const BlogList = await $content('articles', { deep: true })
      .sortBy('createDate', 'desc')
      .limit(3)
      .fetch()
    return {
      BlogList,
    }
  },
  head: {
    title: 'Blog',
  },
  data() {
    return {
      thisYear: new Date().getFullYear(),
      toDate,
    }
  },
})
</script>
