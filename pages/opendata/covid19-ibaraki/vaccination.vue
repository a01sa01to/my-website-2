<template>
  <div>
    <opendata-metadata
      :breadcrumb_data="breadcrumb_data"
      :last_update="last_update"
      created_date="2021/06/03 21:00"
      :url="dl_url"
      :file_size="size"
      data_format="json"
      :title="title"
      :description="description"
      :keywords="keywords"
      :coverage="coverage"
      :partof="partof"
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
              'こちらのオープンデータは、「ワクチン接種記録システム（VRS）」への報告を、居住地の都道府県別に国が集計し、デジタル庁が公表したものに基づき作成しています。'
            )
          }}
          <i18n path="{opendatabydigitalgov}も併せてご覧ください。">
            <template #opendatabydigitalgov>
              <external-link to="https://info.vrs.digital.go.jp/dashboard/">
                {{ $t('デジタル庁によるオープンデータ') }}
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
        <nuxt-link to="/opendata/api-usage/">
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
    vaccination( [PAGINATION INFO] ) {
      dataset {
        date             <span class="token comment"># {{$t('接種日')}}: String!</span>
        government_code  <span class="token comment"># {{$t('全国地方公共団体コード')}}: String!</span>
        prefecture       <span class="token comment"># {{$t('都道府県名')}}: String!</span>
        city             <span class="token comment"># {{$t('市区町村名')}}: String</span>
        total            <span class="token comment"># {{$t('合計接種者数')}}: Int!</span>
        first            <span class="token comment"># {{$t('1回目接種者数')}}: Int!</span>
        second           <span class="token comment"># {{$t('2回目接種者数')}}: Int!</span>
        third            <span class="token comment"># {{$t('3回目接種者数')}}: Int!</span>
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
    const title = 'ワクチン接種状況'
    return {
      breadcrumb_data: [
        { to: '/', text: 'Home' },
        { to: '/opendata/', text: 'Opendata' },
        {
          to: '/opendata/covid19-ibaraki/',
          text: this.$t('茨城県新型コロナウイルス感染症'),
        },
        {
          to: '/opendata/covid19-ibaraki/vaccination/',
          text: this.$t(title),
          active: true,
        },
      ],
      last_update: FileData.vaccination.lastUpdate,
      size: FileData.vaccination.size,

      title,
      description:
        '国が集計したオープンデータを、「茨城県新型コロナウイルス感染症対策サイト」で用いる形式に改変したものです。',
      coverage: '2021-04-12/..',
      partof:
        'https://data.vrs.digital.go.jp/vaccination/opendata/latest/prefecture.ndjson',
      dl_url:
        'https://a01sa01to.com/opendata/api/raw/covid19_ibaraki/080004_ibaraki_covid19_vaccination.json',
      keywords: ['COVID-19 > JAPAN > IBARAKI > NUMBER OF VACCINATION'],
    }
  },
})
</script>
