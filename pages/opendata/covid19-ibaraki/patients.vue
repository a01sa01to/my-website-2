<template>
  <div>
    <opendata-metadata
      :breadcrumb_data="breadcrumb_data"
      :last_update="last_update"
      created_date="2020/12/01 21:50"
      :url="dl_url"
      :file_size="size"
      data_format="csv"
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
              <external-link
                to="https://docs.google.com/spreadsheets/d/1fJtqxqh_4OuUwq2LQ_WRx23fwcEB4hNL/"
              >
                {{
                  $t(
                    '「新型コロナウイルス感染症対策に関するオープンデータ項目定義書」'
                  )
                }}
              </external-link>
            </template>
          </i18n>
        </li>
        <li>
          {{
            $t(
              '当データの情報の正確性については万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。また、陽性者の特定等を目的とするものではありません。'
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
        <li>
          {{
            $t(
              '情報の正確性を万全に期すため、当データでは、原則として県が公表しているデータ以上の情報を掲載していません。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              '（2021年7月29日までのデータ）施設名の繰り返しを避けるために「○○例目の施設」と表記しています。決してその全員が「○○例目」の方から感染が広がったとは限りません。ご理解ください。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              '（主に2022年1月19日以降のデータ）備考欄に「年代・性別・職業が異なっている可能性あり」と記載があるものについては、県の公表資料においては概要のみ発表されているため、該当者の詳細情報が正しいことを保証することはできないことを示しています。ただし、その公表日全体での居住地・年代・性別・職業・濃厚接触者それぞれの和は、県の公表資料と一致することが保証されています。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              '公表されていない部分は空欄になっています。記入漏れというわけではありません。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              'CSVファイルをダウンロードした際にExcelで表示すると、文字化けが起きたり、列が異なったりすることがあります。その際には、別のソフトウェアをご利用ください。'
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
      <b-alert show variant="warning">
        {{ $t('容量削減を目的として、月ごとにファイルの分割を行っています。') }}
      </b-alert>
      <opendata-url-dl-copy :url="dl_url" :txt="$t('最新版（当月分）')" />
      <details>
        <summary>{{ $t('年月ごと') }}</summary>
        <opendata-url-dl-copy
          v-for="data in datas"
          :key="data.year + '-' + data.month"
          :url="`https://a01sa01to.com/opendata/api/raw/covid19_ibaraki/archive/080004_ibaraki_covid19_patients_${data.year}${data.month}.csv`"
          :txt="$t('{year}年{month}月（～{e}例目）', data)"
        />
      </details>
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
      <b-alert show variant="warning">
        {{ $t('高速化を目的として、当月分のデータのみを提供しています。') }}
      </b-alert>
      <div class="nuxt-content-highlight">
        <pre class="language-text"><code>query {
  covid19_ibaraki {
    patients( [PAGINATION INFO] ) {
      dataset {
        no                     <span class="token comment"># {{$t('陽性者の通し番号')}}: Int!</span>
        government_code        <span class="token comment"># {{$t('全国地方公共団体コード')}}: String!</span>
        prefecture             <span class="token comment"># {{$t('都道府県名')}}: String!</span>
        city                   <span class="token comment"># {{$t('市区町村名')}}: String</span>
        publish_date           <span class="token comment"># {{$t('公表日')}}: String!</span>
        onset_date             <span class="token comment"># {{$t('発症日')}}: String</span>
        address                <span class="token comment"># {{$t('居住地')}}: String</span>
        age                    <span class="token comment"># {{$t('年代')}}: String!</span>
        gender                 <span class="token comment"># {{$t('性別')}}: String</span>
        occupation             <span class="token comment"># {{$t('職業')}}: String</span>
        status                 <span class="token comment"># {{$t('公表時の患者の状態')}}: String</span>
        symptoms               <span class="token comment"># {{$t('公表時に発症していた症状')}}: String</span>
        travel_abroad_history  <span class="token comment"># {{$t('海外渡航歴があるかどうか')}}: Boolean</span>
        close_contact          <span class="token comment"># {{$t('濃厚接触者かどうか')}}: Boolean</span>
        test_method            <span class="token comment"># {{$t('検査実施方法')}}: String</span>
        note                   <span class="token comment"># {{$t('備考')}}: String</span>
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
    }
  },
  data() {
    const title = '陽性患者属性'
    const datas = [
      { year: '2020', month: '03', e: '24' },
      { year: '2020', month: '04', e: '163' },
      { year: '2020', month: '05', e: '168' },
      { year: '2020', month: '06', e: '174' },
      { year: '2020', month: '07', e: '294' },
      { year: '2020', month: '08', e: '545' },
      { year: '2020', month: '09', e: '657' },
      { year: '2020', month: '10', e: '768' },
      { year: '2020', month: '11', e: '1,561' },
      { year: '2020', month: '12', e: '2,446' },
      { year: '2021', month: '01', e: '4,818' },
      { year: '2021', month: '02', e: '5,755' },
      { year: '2021', month: '03', e: '6,740' },
      { year: '2021', month: '04', e: '8,143' },
      { year: '2021', month: '05', e: '9,734' },
      { year: '2021', month: '06', e: '10,544' },
      { year: '2021', month: '07', e: '12,460' },
      { year: '2021', month: '08', e: '20,627' },
      { year: '2021', month: '09', e: '24,140' },
      { year: '2021', month: '10', e: '24,403' },
      { year: '2021', month: '11', e: '24,449' },
      { year: '2021', month: '12', e: '24,489' },
      { year: '2022', month: '01', e: '36,193' },
      { year: '2022', month: '02', e: '73,241' },
      { year: '2022', month: '03', e: '113,668' },
      { year: '2022', month: '04', e: '143,863' },
      { year: '2022', month: '05', e: '158,770' },
      { year: '2022', month: '06', e: '165,080' },
      { year: '2022', month: '07', e: '208,508' },
      { year: '2022', month: '08', e: '317,489' },
    ]
    return {
      breadcrumb_data: [
        { to: '/', text: 'Home' },
        { to: '/opendata/', text: 'Opendata' },
        {
          to: '/opendata/covid19-ibaraki/',
          text: this.$t('茨城県新型コロナウイルス感染症'),
        },
        {
          to: '/opendata/covid19-ibaraki/patients/',
          text: this.$t(title),
          active: true,
        },
      ],
      last_update: FileData.patients.lastUpdate,
      size: FileData.patients.size,

      title,
      description:
        '茨城県内の、新型コロナウイルス感染症の陽性患者の年代、性別、居住地などの属性情報を一覧化したオープンデータです。',
      coverage: '2020-01-31/..',
      dl_url:
        'https://a01sa01to.com/opendata/api/raw/covid19_ibaraki/080004_ibaraki_covid19_patients.csv',
      keywords: ['COVID-19 > JAPAN > IBARAKI > ATTRIBUTES OF PATIENTS'],
      datas,
    }
  },
})
</script>

<style lang="scss" scoped>
// Nuxt-contentが復活するまでの暫定処置
@import '~/assets/styles/markdown-code-highlight.scss';

details {
  margin: 1rem;
  padding: 1rem;
  border-left: 3px solid #ccc;
}
</style>
