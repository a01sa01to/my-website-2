<template>
  <div>
    <!-- <shared-main-header title="タグ一覧" :b_data="breadcrumb_data" />
    <b-container>
      <b-table
        striped
        hover
        responsive
        :dark="$colorMode.value === 'dark'"
        :items="List"
        :fields="fields"
      >
        <template #cell(tag)="{ item }">
          <nuxt-link :to="`/blog/tags/${item.tag}/`">
            {{ item.tag }}
          </nuxt-link>
        </template>
      </b-table>
    </b-container> -->
    <b-container>
      <h1>Work in Progress</h1>
      <p>{{ $t('このページは現在メンテナンス中です。') }}</p>
      <nuxt-link :to="localePath('/')">
        {{ $t('トップページに戻る') }}
      </nuxt-link>
    </b-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import toDate from '~/utils/date-format'
export default Vue.extend({
  // async asyncData({ $content }) {
  //   const BlogList = await $content('articles', { deep: true })
  //     .only(['tags', 'updateDate'])
  //     .fetch()
  //   const List: {
  //     tag: string
  //     count: number
  //     lastArticle: string
  //   }[] = []

  //   BlogList.forEach((article: any) => {
  //     article.tags.forEach((tag: any) => {
  //       const index = List.findIndex((item) => item.tag === tag)
  //       if (index === -1) {
  //         List.push({
  //           tag,
  //           count: 1,
  //           lastArticle: toDate(article.updateDate),
  //         })
  //       } else {
  //         List[index].count++
  //         if (
  //           new Date(List[index].lastArticle) < new Date(article.updateDate)
  //         ) {
  //           List[index].lastArticle = toDate(article.updateDate)
  //         }
  //       }
  //     })
  //   })

  //   return {
  //     BlogList,
  //     List,
  //     fields: [
  //       {
  //         key: 'tag',
  //         sortable: true,
  //         label: 'タグ',
  //       },
  //       {
  //         key: 'count',
  //         sortable: true,
  //         label: '記事数',
  //       },
  //       {
  //         key: 'lastArticle',
  //         sortable: true,
  //         label: '最終更新',
  //       },
  //     ],
  //   }
  // },
  head() {
    return {
      // title: 'タグ一覧 - Blog',
      title: 'Work in Progress',
    }
  },
  // data() {
  //   return {
  //     breadcrumb_data: [
  //       { to: '/', text: 'Home' },
  //       { to: '/blog/', text: 'Blog' },
  //       { to: '/blog/tags/', text: 'タグ一覧', active: true },
  //     ],
  //   }
  // },
})
</script>
