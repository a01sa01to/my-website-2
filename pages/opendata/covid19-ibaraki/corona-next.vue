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
    corona_next {
      <span class="token comment"># {{$t('「@deprecated」のついたデータは、現在は用いられていない指標であることを示しています。そのため、予期しないデータが返ってくる場合があります。')}}</span>
      last_update                <span class="token comment"># {{$t('最終更新日時')}}: String!</span>
      stage                      <span class="token comment"># {{$t('現在の対策ステージ')}}: Int!</span>
      move_date                  <span class="token comment"># {{$t('対策ステージの移行日')}}: String!</span>

      severe                     <span class="token comment"># {{$t('重症病床稼働数')}}: Int!</span>
      sickbed                    <span class="token comment"># {{$t('病床稼働数')}}: Int!</span>
      care_rate                  <span class="token comment"># {{$t('入院率')}}: Float!</span> <span class="token keyword">@deprecated</span>
      new_patients               <span class="token comment"># {{$t('陽性者数の直近1週間での平均')}}: Float!</span>
      non_closecontact           <span class="token comment"># {{$t('陽性者のうち、濃厚接触者ではない人の数の直近1週間での平均')}}: Float!</span> <span class="token keyword">@deprecated</span>
      care                       <span class="token comment"># {{$t('療養者数')}}: Int!</span> <span class="token keyword">@deprecated</span>
      positive_rate              <span class="token comment"># {{$t('陽性率の直近1週間での平均')}}: Float!</span> <span class="token keyword">@deprecated</span>

      severe_lastweek            <span class="token comment"># {{$t('1週間前時点での、重症病床稼働数')}}: Int!</span>
      sickbed_lastweek           <span class="token comment"># {{$t('1週間前時点での、病床稼働数')}}: Int!</span>
      care_rate_lastweek         <span class="token comment"># {{$t('1週間前時点での入院率')}}: Float!</span> <span class="token keyword">@deprecated</span>
      new_patients_lastweek      <span class="token comment"># {{$t('1週間前時点での、陽性者数の1週間での平均')}}: Float!</span>
      non_closecontact_lastweek  <span class="token comment"># {{$t('1週間前時点での、陽性者のうち、濃厚接触者ではない人の数の1週間での平均')}}: Float!</span> <span class="token keyword">@deprecated</span>
      care_lastweek              <span class="token comment"># {{$t('1週間前時点での療養者数')}}: Int!</span> <span class="token keyword">@deprecated</span>
      positive_rate_lastweek     <span class="token comment"># {{$t('1週間前時点での、陽性率の1週間での平均')}}: Float!</span> <span class="token keyword">@deprecated</span>
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
    }
  },
  data() {
    const title = '茨城版コロナNext'
    return {
      breadcrumb_data: [
        { to: '/', text: 'Home' },
        { to: '/opendata/', text: 'Opendata' },
        {
          to: '/opendata/covid19-ibaraki/',
          text: this.$t('茨城県新型コロナウイルス感染症'),
        },
        {
          to: '/opendata/covid19-ibaraki/corona-next/',
          text: this.$t(title),
          active: true,
        },
      ],
      last_update: FileData.corona_next.lastUpdate,
      size: FileData.corona_next.size,

      title,
      description:
        '茨城版コロナNextの指標のデータを集計したオープンデータです。',
      dl_url:
        'https://a01sa01to.com/opendata/api/raw/covid19_ibaraki/080004_ibaraki_covid19_corona_next.json',
    }
  },
})
</script>

<style lang="scss" scoped>
// Nuxt-contentが復活するまでの暫定処置
@import '~/assets/styles/markdown-code-highlight.scss';
</style>
