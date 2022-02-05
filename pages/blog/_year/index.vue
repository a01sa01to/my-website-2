<template>
  <div>
    <SharedMainHeader
      :title="`${year}年の記事一覧`"
      :b_data="breadcrumb_data"
    />
    <table-of-contents />
    <b-container
      v-for="month in months"
      :key="month"
      v-if="BlogMonthlyList[month].length"
    >
      <h2>{{ month + 1 }}月</h2>
      <b-row cols-xl="4" cols-lg="3" cols-md="2" cols-sm="1" cols="1">
        <b-col v-for="(val, key) in BlogMonthlyList[month]" :key="key">
          <BlogCard :article="val" />
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-pagination-nav
        align="center"
        :link-gen="linkGen"
        :page-gen="pageGen"
        :number-of-pages="years.length"
        use-router
      />
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, params, error }) {
    const { year } = params
    try {
      const BlogList = await $content(`articles/${year}`, {
        deep: true,
      })
        .sortBy('createDate', 'desc')
        .fetch()

      const BlogMonthlyList = []
      for (let i = 1; i <= 12; i++) {
        BlogMonthlyList.push(
          BlogList.filter(
            (val: any) => new Date(val.createDate).getUTCMonth() + 1 === i
          )
        )
      }

      return {
        year,
        BlogMonthlyList,
        breadcrumb_data: [
          { to: '/', text: 'Home' },
          { to: '/blog/', text: 'Blog' },
          { to: `/blog/${year}/`, text: `${year}`, active: true },
        ],
        months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reverse(),
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  head() {
    return {
      title: `${(this as any).year}年の記事一覧`,
    }
  },
  data() {
    const years: number[] = []
    for (let i = new Date().getFullYear(); i >= 2020; i--) years.push(i)
    return {
      years,
    }
  },
  methods: {
    linkGen(page: number) {
      return `/blog/${(this as any).years[page - 1]}`
    },
    pageGen(page: number) {
      return (this as any).years[page - 1]
    },
  },
})
</script>

<style lang="scss" scoped src="~/assets/styles/blog.scss" />
