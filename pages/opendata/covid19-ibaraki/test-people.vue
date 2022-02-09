<template>
  <div>
    <shared-main-header
      :title="$t('検査実施人数（県衛生研究所・水戸市保健所実施分）')"
      :b_data="breadcrumb_data"
    />
    <b-container>
      <p>
        {{
          $t(
            '県衛生研究所及び水戸市保健所で実施しているPCR検査を受けた人の数を日別に集計したオープンデータです。'
          )
        }}
      </p>
    </b-container>
    <b-container>
      <h2>{{ $t('ファイルに関する情報') }}</h2>
      <opendata-metadata
        :last_update="last_update"
        created_date="2020/12/01 21:50"
        file_name="080004_ibaraki_covid19_test_people.csv"
        :file_size="size"
        data_format="csv"
      />
    </b-container>
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
        <li>
          {{
            $t(
              'CSVファイルをダウンロードした際にExcelで表示すると、文字化けが起きたり、列が異なったりすることがあります。その際には、別のソフトウェアをご利用ください。'
            )
          }}
        </li>
        <li>
          {{
            $t('当データには、民間の検査機関における検査分は含まれていません。')
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
      <opendata-url-dl-copy
        url="https://a01sa01to.com/opendata/api/raw/covid19_ibaraki/080004_ibaraki_covid19_test_people.csv"
        file_name="080004_ibaraki_covid19_test_people.csv"
      />
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
    test_people( [PAGINATION INFO] ) {
      dataset {
        date             <span class="token comment"># {{$t('公表日')}}: String!</span>
        government_code  <span class="token comment"># {{$t('全国地方公共団体コード')}}: String!</span>
        prefecture       <span class="token comment"># {{$t('都道府県名')}}: String!</span>
        city             <span class="token comment"># {{$t('市区町村名')}}: String</span>
        value            <span class="token comment"># {{$t('検査実施件数')}}: Int!</span>
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
import FileData from '~/data/opendata/covid19_ibaraki.json'

export default Vue.extend({
  head() {
    return {
      title: `${this.$t(
        '検査実施人数（県衛生研究所・水戸市保健所実施分）'
      )} - ${this.$t('茨城県新型コロナウイルス感染症')} - Opendata`,
    }
  },
  data() {
    return {
      breadcrumb_data: [
        { to: '/', text: 'Home' },
        { to: '/opendata/', text: 'Opendata' },
        {
          to: '/opendata/covid19-ibaraki/',
          text: this.$t('茨城県新型コロナウイルス感染症'),
        },
        {
          to: '/opendata/covid19-ibaraki/test-people/',
          text: this.$t('検査実施人数（県衛生研究所・水戸市保健所実施分）'),
          active: true,
        },
      ],
      last_update: FileData.test_people.lastUpdate,
      size: FileData.test_people.size,
    }
  },
})
</script>