<template>
  <div>
    <!-- <breadcrumb :data="breadcrumb_data" jsononly />
    <b-container>
      <b-jumbotron
        :text-variant="$colorMode.value === 'dark' ? 'light' : 'dark'"
        :bg-variant="$colorMode.value === 'dark' ? 'dark' : 'light'"
      >
        <template #header>Asa's Blog</template>
        <template #lead>Scroll down to explore this site</template>
      </b-jumbotron>
      <scroll-next-animation />
    </b-container>
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
          <blog-card :article="val" />
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <h2>Find more...</h2>
      <ul>
        <li>
          <nuxt-link :to="localePath(`/blog/${thisYear}/`)"
            >{{ thisYear }}年の記事一覧</nuxt-link
          >
        </li>
        <li><nuxt-link :to="localePath('/blog/tags/')">タグ一覧</nuxt-link></li>
      </ul>
    </b-container> -->
    <b-container>
      <h1>Work in Progress</h1>
      <p>{{ $t('このページは現在メンテナンス中です。') }}</p>
      <nuxt-link :to="localePath('/')">{{
        $t('トップページに戻る')
      }}</nuxt-link>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import toDate from '~/utils/date-format'

export default Vue.extend({
  // async asyncData({ $content }) {
  //   const BlogList = await $content('articles', { deep: true })
  //     .sortBy('createDate', 'desc')
  //     .limit(3)
  //     .fetch()
  //   return {
  //     BlogList,
  //   }
  // },
  head() {
    return {
      title: 'Blog',
      meta: [
        {
          name: 'description',
          content: "Asa's Blogトップページ",
        },
      ],
    }
  },
  data() {
    return {
      // thisYear: new Date().getFullYear(),
      // toDate,
      breadcrumb_data: [
        { name: 'Home', to: '/' },
        { name: 'Blog', to: '/blog/' },
      ],
    }
  },
})
</script>
