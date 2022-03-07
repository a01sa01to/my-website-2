<template>
  <div>
    <opendata-metadata
      :breadcrumb_data="breadcrumb_data"
      :last_update="last_update"
      created_date="2021/05/23 16:00"
      :url="dl_url"
      :file_size="size"
      data_format="json"
      :title="title"
      :description="description"
      :keywords="keywords"
      :coverage="coverage"
    />
    <b-container>
      <h2>{{ $t('ご利用時の注意点') }}</h2>
      <ul>
        <li>
          <i18n
            path="本データは、{opendatadef}のフォーマットに則り、茨城県内の感染状況などをオープンデータとして公開しているものです。"
          >
            <template #opendatadef>
              <external-link to="https://ibaraki.stopcovid19.jp/">
                {{ $t('「茨城県新型コロナウイルス感染症対策サイト」') }}
              </external-link>
            </template>
          </i18n>
        </li>
        <li>
          {{
            $t(
              '当データの情報の正確性については万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              '当データは、あくまで県の公式情報をもとに作成したものです。県によって公式に公開されているものではありません。'
            )
          }}
        </li>
      </ul>
    </b-container>
    <b-container>
      <h2>{{ $t('ダウンロード') }}</h2>
      <p>
        {{
          $t(
            '以下のボタンからダウンロードできます。また、以下URLからcURL等の各種ライブラリによってダウンロードすることも可能です。'
          )
        }}
      </p>
      <b-alert show variant="warning">
        {{
          $t(
            '2022年1月13日以前にこちらに記載されていたURLは、2022年3月1日をもって利用できなくなりました。以下のURLをご利用ください。'
          )
        }}
      </b-alert>
      <opendata-url-dl-copy :url="dl_url" />
    </b-container>
    <b-container>
      <h2>{{ $t('Opendata APIについて') }}</h2>
      <p>
        {{
          $t(
            '直接ダウンロードするほか、当サイトが提供するOpendata APIもご利用いただけます。'
          )
        }}
        <nuxt-link :to="localePath('/opendata/api-usage/')">
          {{ $t('Opendata APIの使い方についてはこちら') }}
        </nuxt-link>
      </p>
      <p>
        {{
          $t(
            'APIで用いるクエリは以下の通りです。[YOUR QUERY HERE]の部分を、改行文字を適宜エスケープしたうえで、以下の内容に置き換えてください。'
          )
        }}
      </p>
      <div class="nuxt-content-highlight">
        <pre class="language-text"><code>query {
  covid19_ibaraki {
    mutant_positive_number( [PAGINATION INFO] ) {
      dataset {
        date             <span class="token comment"># {{$t('日付')}}: String!</span>
        government_code  <span class="token comment"># {{$t('全国地方公共団体コード')}}: String!</span>
        prefecture       <span class="token comment"># {{$t('都道府県名')}}: String!</span>
        city             <span class="token comment"># {{$t('市区町村名')}}: String</span>
        total            <span class="token comment"># {{$t('合計陽性者数')}}: Int!</span>
        strain_name      <span class="token comment"># {{$t('変異株名')}}: String!</span>
        by_age {         <span class="token comment"># {{$t('年代別の陽性者数')}}</span>
          under_twenties   <span class="token comment"># {{$t('20代以下')}}: Int!</span>
          thirties         <span class="token comment"># {{$t('30代')}}: Int!</span>
          fourties         <span class="token comment"># {{$t('40代')}}: Int!</span>
          fifties          <span class="token comment"># {{$t('50代')}}: Int!</span>
          sixties          <span class="token comment"># {{$t('60代')}}: Int!</span>
          seventies        <span class="token comment"># {{$t('70代')}}: Int!</span>
          eighties         <span class="token comment"># {{$t('80代')}}: Int!</span>
          nineties         <span class="token comment"># {{$t('90代')}}: Int!</span>
          over_hundred     <span class="token comment"># {{$t('100歳以上')}}: Int!</span>
          unknown          <span class="token comment"># {{$t('不明')}}: Int!</span>
        }
        by_gender {      <span class="token comment"># {{$t('性別の陽性者数')}}</span>
          male             <span class="token comment"># {{$t('男性')}}: Int!</span>
          female           <span class="token comment"># {{$t('女性')}}: Int!</span>
          unknown          <span class="token comment"># {{$t('不明')}}: Int!</span>
        }
      }
      pageinfo {
        hasPreviousPage  <span class="token comment"># {{$t('前のページがあるかどうか')}}: Boolean!</span>
        hasNextPage      <span class="token comment"># {{$t('次のページがあるかどうか')}}: Boolean!</span>
        startCursor      <span class="token comment"># {{$t('現在のページの最初のCursor')}}: String!</span>
        endCursor        <span class="token comment"># {{$t('現在のページの最後のCursor')}}: String!</span>
      }
      last_update  <span class="token comment"># {{$t('最終更新日時')}}: String!</span>
    }
  }
}</code></pre>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FileData from '~/data/opendata/covid19-ibaraki.json'

export default Vue.extend({
  head() {
    return {
      title: `${this.$t(this.title)} - ${this.$t(
        '茨城県新型コロナウイルス感染症'
      )} - Opendata`,
      meta: [
        {
          name: 'description',
          content: this.$t(this.description) as string,
        },
      ],
    }
  },
  data() {
    const title = '変異株陽性確認数'

    return {
      breadcrumb_data: [
        { to: '/', text: 'Home' },
        { to: '/opendata/', text: 'Opendata' },
        {
          to: '/opendata/covid19-ibaraki/',
          text: this.$t('茨城県新型コロナウイルス感染症'),
        },
        {
          to: '/opendata/covid19-ibaraki/mutant-positive-number/',
          text: this.$t(title),
          active: true,
        },
      ],
      last_update: FileData.mutant_positive_number.lastUpdate,
      size: FileData.mutant_positive_number.size,

      title,
      description:
        '茨城県の公表日別の変異株陽性確認数を、性別・年代別とともに集計したオープンデータです。',
      coverage: '2021-02-01/2022-01-15',
      dl_url:
        'https://a01sa01to.com/opendata/api/raw/covid19_ibaraki/080004_ibaraki_covid19_mutant_positive_number.json',
      keywords: [
        'COVID-19 > JAPAN > IBARAKI > NUMBER OF CONFIRMED POSITIVE MUTANT STRAINS',
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
// Nuxt-contentが復活するまでの暫定処置
@import '~/assets/styles/markdown-code-highlight.scss';
</style>
