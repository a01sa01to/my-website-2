<template>
  <div>
    <breadcrumb :data="breadcrumb_data" jsononly />
    <b-container>
      <h1 id="jumbotitle">Asa's Opendata Catalog</h1>
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
            '公式には提供されていないデータを、まとめて提供しています。ファイル形式はCSVやJSONを用意しています。'
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
          <nuxt-link :to="localePath('/opendata/covid19-ibaraki/')">
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
        <nuxt-link :to="localePath('/opendata/api-usage')">
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
    }
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'Opendata', to: '/opendata/' },
      ],
    }
  },
})
</script>
