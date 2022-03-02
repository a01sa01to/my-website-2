<template>
  <div>
    <shared-main-header
      :title="$t('当サイトのOpendata APIの使い方')"
      :b_data="breadcrumb_data"
      :description="
        $t(
          '当サイトでは、GraphQLを用い、Opendata APIを提供しています。本ページではその使い方を紹介しています。'
        )
      "
    />
    <table-of-contents />
    <b-container>
      <h2 id="basic-spec">{{ $t('基本仕様') }}</h2>
      <ul>
        <li>
          {{ $t('（wwwなし）a01sa01to.comドメイン配下で提供されます。') }}
        </li>
        <li>{{ $t('HTTPSで提供されます。') }}</li>
        <li>{{ $t('日付等はすべて日本時間（UTC+09:00）です。') }}</li>
        <li>
          {{ $t('応答ヘッダには、以下のヘッダが設定されています。') }}
          <ul>
            <li><code>Access-Control-Allow-Origin: *</code></li>
            <li>
              <code>Access-Control-Allow-Methods: GET, POST, OPTIONS</code>
            </li>
            <li>
              <code>
                Access-Control-Allow-Headers: Accept, Content-Type,
                Content-Length, Accept-Encoding, X-CSRF-Token, Authorization
              </code>
            </li>
          </ul>
        </li>
        <li>
          <i18n path="何か疑問点やご要望があれば、{mail}にお寄せください。">
            <template #mail>
              <external-link to="mailto:info%40a01sa01to.com">
                info@a01sa01to.com
              </external-link>
            </template>
          </i18n>
        </li>
      </ul>
    </b-container>
    <b-container>
      <h2 id="get-raw">{{ $t('生のデータを取得する') }}</h2>
      <p>
        {{
          $t(
            '当サイトでは、Opendata APIとしてAPIを提供していますが、APIを用いることなく、「生の」データも取得することができます。'
          )
        }}
      </p>
      <p>
        {{
          $t(
            'GraphQLを用いたOpendata APIでは必要なデータのみを取得することができますが、互換性等の観点から生のデータを好まれることもあるでしょう。そのような場合は、以下の手順で取得することができます。'
          )
        }}
      </p>
      <ol>
        <li>{{ $t('利用したいオープンデータのページにアクセスします。') }}</li>
        <li>
          {{
            $t(
              'ファイルに関する情報・利用時の注意点をよく読み、下にスクロールします。'
            )
          }}
        </li>
        <li>
          <webp-image
            src="/images/opendata/api-usage/download-raw"
            ext="png"
            :alt="$t('ダウンロード画面')"
            style="display: inline-block"
          />
          <p>
            {{
              $t(
                '「Copy」をクリックすると、掲載されている生データのダウンロードリンクをコピーします。「Download」をクリックすると、掲載されているURLから生データをダウンロードします。'
              )
            }}
          </p>
        </li>
      </ol>
    </b-container>
    <b-container>
      <h2 id="opendata-api">{{ $t('Opendata APIを用いる（推奨）') }}</h2>
      <b-container>
        <h3 id="opendata-api-endpoint">{{ $t('エンドポイント') }}</h3>
        <p>
          {{
            $t(
              'GraphQLを用いたOpendata APIは、どのようなデータにアクセスする場合でも、以下の単一のエンドポイントです。JSON形式でデータが返されます。'
            )
          }}
        </p>
        <p><code>https://a01sa01to.com/api/opendata/</code></p>
      </b-container>
      <b-container>
        <h3 id="opendata-api-com">{{ $t('Opendata APIでの通信') }}</h3>
        <p>
          {{ $t('GraphQLの操作では、複数行のJSONを扱うことになります。') }}
          <i18n path="そのため、{graphqlPlayground}の利用をお勧めします。">
            <template #graphqlPlayground>
              <external-link to="./playground/">
                Playground{{ $t('（サイト内リンク）') }}
              </external-link>
            </template>
          </i18n>
          {{
            $t(
              'このPlaygroundでは、各データのクエリについての説明を見られたり、cURLのコードをコピーしたりすることができます。'
            )
          }}
          {{
            $t(
              'もちろん、このPlaygroundを用いずに、cURLなどの各種ライブラリを利用することもできます。'
            )
          }}
        </p>
        <p>
          {{
            $t(
              'Opendata APIには、基本的にPOSTメソッドで通信することになります。'
            )
          }}
          {{
            $t(
              'cURLを用いてクエリを送信するには、JSONのペイロードを持つPOSTリクエストを送信してください。形式は、以下の通りです。改行文字は適宜エスケープしてください。また、[YOUR QUERY HERE]の部分については、各ページに掲載されているクエリに置き換えてください。'
            )
          }}<br />
          <code>
            curl 'https://a01sa01to.com/api/opendata/' -X POST -d '{"query":
            "[YOUR QUERY HERE]"}'
          </code>
        </p>
      </b-container>
      <b-container>
        <h3 id="opendata-api-query">{{ $t('クエリについて') }}</h3>
        <p>
          {{
            $t(
              'GraphQLでは、クエリに指定されたデータのみを返します。すなわち、クエリから不要なデータを削除することによって、必要なデータのみ取得することができます。この結果、データ通信量削減などの効果が期待できます。返されるデータについては、各データのページを参照してください。'
            )
          }}
        </p>
      </b-container>
      <b-container>
        <h3 id="opendata-api-pagination">{{ $t('ページ付けについて') }}</h3>
        <p>
          {{
            $t(
              '当APIでは、一部のデータにおいて、多くのデータを複数のページに分けて返す、「ページ付け（Pagination）」機能をサポートしています。'
            )
          }}
        </p>
        <div>
          {{
            $t(
              'ページ付け機能は、以下の4つの引数のいずれかを指定して利用します。基本的には、[before]と[last]を組み合わせるか、[first]と[after]を組み合わせて利用します。'
            )
          }}
          <ul>
            <li>
              <code>before</code>
              {{
                $t(
                  '指定されたcursorよりも前のデータを返す（cursorのデータは含まれない）'
                )
              }}
            </li>
            <li>
              <code>after</code>
              {{
                $t(
                  '指定されたcursorよりも後のデータを返す（cursorのデータは含まれない）'
                )
              }}
            </li>
            <li>
              <code>first</code>
              {{ $t('前から数えて、指定された数のデータを返す') }}
            </li>
            <li>
              <code>last</code>
              {{ $t('後ろから数えて、指定された数のデータを返す') }}
            </li>
          </ul>
        </div>
        <div>
          {{
            $t(
              'cursorは、データのpageinfoから取得できます。pageinfoで得られるデータは、以下の通りです。'
            )
          }}
          <ul>
            <li>
              <code>hasPreviousPage</code>
              {{ $t('前のページがあるかどうか') }}
            </li>
            <li>
              <code>hasNextPage</code>
              {{ $t('次のページがあるかどうか') }}
            </li>
            <li>
              <code>startCursor</code>
              {{ $t('現在表示しているページの先頭のデータのcursor') }}
            </li>
            <li>
              <code>endCursor</code>
              {{ $t('現在表示しているページの最後のデータのcursor') }}
            </li>
          </ul>
        </div>
        <p>
          {{
            $t(
              '対応する各データのクエリにおいて、[PAGINATION INFO]と記述されている部分があるかと思います。その部分を、以下のように書いてください。ただし、利用しない引数を削除したり、[CURSOR]や[NUMBER]の部分を置き換えるなど、適宜変更してください。'
            )
          }}<br />
          <code>([PAGINATION INFO])</code>→<br />
          <code>
            (before: [CURSOR], after: [CURSOR], first: [NUMBER], last: [NUMBER])
          </code>
          <br />
          {{
            $t(
              'ページ付けの機能が必要なく、すべてのデータを一括で取得する場合は、([PAGINATION INFO])の部分をすべて削除してください。'
            )
          }}
        </p>
        <div>
          <b-carousel
            controls
            indicators
            :interval="5000"
            v-if="this.$i18n.locale === 'ja'"
            fade
          >
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/01.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/02.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/03.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/04.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/05.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/06.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/07.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/08.png"
            />
          </b-carousel>
          <b-carousel
            controls
            indicators
            :interval="5000"
            v-else
            fade
            class="carousel"
          >
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/01.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/02.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/03.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/04.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/05.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/06.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/07.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/08.png"
            />
          </b-carousel>
          <p class="text-muted text-center">
            {{ $t('ページ付け機能のイメージ') }}
          </p>
        </div>
        <div>
          <b-carousel
            controls
            indicators
            :interval="5000"
            v-if="this.$i18n.locale === 'ja'"
            fade
          >
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/01.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/09.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/10.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/11.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/12.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/13.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/14.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/15.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/ja/16.png"
            />
          </b-carousel>
          <b-carousel
            controls
            indicators
            :interval="5000"
            v-else
            fade
            class="carousel"
          >
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/01.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/09.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/10.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/11.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/12.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/13.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/14.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/15.png"
            />
            <b-carousel-slide
              img-src="/images/opendata/api-usage/pagination/en/16.png"
            />
          </b-carousel>
          <p class="text-muted text-center">
            {{ $t('ページ付け機能の主な利用法') }}
          </p>
        </div>
      </b-container>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head() {
    return {
      title: `${this.$t('当サイトのOpendata APIの使い方')} - Opendata`,
      meta: [
        {
          name: 'description',
          content: this.$t(
            '当サイトでは、GraphQLを用い、Opendata APIを提供しています。本ページではその使い方を紹介しています。'
          ) as string,
        },
      ],
    }
  },
  data() {
    return {
      breadcrumb_data: [
        { to: '/', text: 'Home' },
        { to: '/opendata/', text: 'Opendata' },
        {
          to: '/opendata/api-usage/',
          text: this.$t('当サイトのOpendata APIの使い方'),
          active: true,
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped src="~/assets/styles/blog.scss" />
