<template>
  <div>
    <opendata-metadata
      :breadcrumb_data="breadcrumb_data"
      :last_update="last_update"
      created_date="2020/12/01 21:50"
      :url="dl_url"
      :file_size="size"
      data_format="json"
      :title="title"
      :description="description"
      disableJSON
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
    summary {
      last_update   <span class="token comment"># {{$t('最終更新日時')}}: String!</span>
      total         <span class="token comment"># {{$t('累計陽性者数')}}: Int!</span>
      care          <span class="token comment"># {{$t('療養中の陽性者数')}}: Int!</span>
      hospitalized  <span class="token comment"># {{$t('療養中のうち、入院中の陽性者数')}}: Int!</span>
      severe        <span class="token comment"># {{$t('入院中のうち、重症者数')}}: Int!</span>
      moderate      <span class="token comment"># {{$t('入院中のうち、中等症者数')}}: Int!</span>
      light         <span class="token comment"># {{$t('入院中のうち、軽症者数')}}: Int!</span>
      home          <span class="token comment"># {{$t('療養中のうち、自宅療養者数')}}: Int!</span>
      hotel         <span class="token comment"># {{$t('療養中のうち、宿泊療養者数')}}: Int!</span>
      recovered     <span class="token comment"># {{$t('回復者数')}}: Int!</span>
      death         <span class="token comment"># {{$t('死亡者数')}}: Int!</span>
      other         <span class="token comment"># {{$t('その他')}}: Int!</span>
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
    const title = '陽性者の状況'
    return {
      breadcrumb_data: [
        { to: '/', text: 'Home' },
        { to: '/opendata/', text: 'Opendata' },
        {
          to: '/opendata/covid19-ibaraki/',
          text: this.$t('茨城県新型コロナウイルス感染症'),
        },
        {
          to: '/opendata/covid19-ibaraki/patients-summary/',
          text: this.$t(title),
          active: true,
        },
      ],
      last_update: FileData.main_summary.lastUpdate,
      size: FileData.main_summary.size,

      title,
      description:
        '茨城県の陽性者の状況を集計したオープンデータです。療養中、回復済、死亡、その他などに分けてあります。',
      dl_url:
        'https://a01sa01to.com/opendata/api/raw/covid19_ibaraki/080004_ibaraki_covid19_summary.json',
    }
  },
})
</script>
