<template>
  <div>
    <!-- <shared-main-header
      :title="mdContent.title"
      :b_data="breadcrumb_data"
      :description="`Published on ${toDate(
        mdContent.createDate
      )}. Last Modified on ${toDate(mdContent.updateDate)}.`"
      description_right
    >
      <div>
        Tags:
        <ul class="tagsList">
          <li v-for="tag in mdContent.tags" :key="tag">
            <nuxt-link :to="`/blog/tags/${tag}/`">
              <b-icon-tag />
              {{ tag }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </shared-main-header>
    <table-of-contents />
    <b-container>
      <nuxt-content :document="mdContent" />
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
// import { BIconTag } from 'bootstrap-vue'
import Vue from 'vue'
// import toDate from '~/utils/date-format'

export default Vue.extend({
  // async asyncData({ $content, params, error }) {
  //   const { year, month, blog } = params
  //   try {
  //     const mdContent = await $content(
  //       `articles/${year}/${month}/${blog}`
  //     ).fetch()

  //     return {
  //       year,
  //       month,
  //       blogid: blog,
  //       mdContent,
  //       breadcrumb_data: [
  //         { to: '/', text: 'Home' },
  //         { to: '/blog/', text: 'Blog' },
  //         { to: `/blog/${year}/`, text: `${year}` },
  //         { to: `/blog/${year}/${month}/`, text: `${month}`, active: true },
  //         {
  //           to: `/blog/${year}/${month}/${blog}/`,
  //           text: `${(mdContent as any).title}`,
  //           active: true,
  //         },
  //       ],
  //     }
  //   } catch (e) {
  //     error({ statusCode: 404 })
  //   }
  // },
  head() {
    return {
      // title: `${(this as any).mdContent.title} - Blog`,
      // meta: [
      //   {
      //     name: 'description',
      //     content: `${(this as any).mdContent.description}`,
      //   },
      // ],
      title: 'Work in Progress',
    }
  },
  // components: {
  //   BIconTag,
  // },
  // data() {
  //   return {
  //     toDate,
  //   }
  // },
})
</script>

<style lang="scss" scoped>
@import '~/assets/styles/blog.scss';

ul.tagsList {
  list-style: none;
  display: inline-block;
  margin: 0;
  padding: 0;
  li {
    display: inline-block;
    margin-right: 10px;
    border: 1px solid var(--border-color);
    border-radius: 1em;
    padding: 0.2em 1em;
    min-width: 2.5em;
    text-align: center;
    font-size: 0.9em;
  }
}
</style>
