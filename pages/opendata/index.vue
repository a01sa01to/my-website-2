<template>
  <div>
    <b-container>
      <b-jumbotron
        :text-variant="$store.state.darkmode ? 'light' : 'dark'"
        :bg-variant="$store.state.darkmode ? 'dark' : 'light'"
      >
        <template #header>Asa's Opendata Catalog</template>
        <template #lead>Scroll down to explore this site</template>
      </b-jumbotron>
      <scroll-next-animation />
    </b-container>
    <b-container>
      <h2>About</h2>
      <p>
        {{
          $t(
            'このサイトは、Asaがオープンデータを提供するために立ち上げたサイトです。'
          )
        }}<br />
        {{
          $t(
            '公式には提供されていないデータを、まとめて提供しています。ファイル形式はCSVやJSONを用紙しています。'
          )
        }}
      </p>
    </b-container>
    <b-container>
      <h2>What is Open data?</h2>
      <p>
        {{
          $t(
            'オープンデータとは、営利目的、非営利目的を問わず二次利用可能なルールが適用され、機械判読に適しており、無償で利用できるデータのことです。'
          )
        }}<br />
        {{
          $t(
            '当サイトで公開しているデータの情報の正確性については万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。'
          )
        }}
      </p>
    </b-container>
    <b-container>
      <h2>Available Resources</h2>
      <ul>
        <li>
          <nuxt-link to="./covid19-ibaraki/">
            {{ $t('茨城県新型コロナウイルス感染症') }}
          </nuxt-link>
        </li>
      </ul>
    </b-container>
    <b-container>
      <h2>Available API</h2>
      <p>
        {{
          $t(
            'このサイトでは、GraphQLを用い、APIを提供しています。利用方法については、以下のページをご覧ください。'
          )
        }}<br />
        <nuxt-link to="/opendata/api-usage">
          {{ $t('当サイトのOpendata APIの使い方') }}
        </nuxt-link>
      </p>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head() {
    return {
      title: 'Opendata',
      meta: [
        {
          name: 'description',
          content: this.$t(
            'Asaがオープンデータを提供するために立ち上げたサイトです。'
          ) as string,
        },
      ],
    }
  },
})
</script>
