<template>
  <div>
    <SharedMainHeader :title="$t('免責事項等')" :b_data="breadcrumb_data" />
    <b-container>
      <h2>{{ $t('利用上の注意') }}</h2>
      <ul>
        <li>
          {{
            $t(
              '当サイトは個人のサイトであり、個人の発言です。所属する団体等を代表するものではありません。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              '当サイトに掲載されている情報の正確性については、ある程度万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              '当サイトに掲載されている情報は、予告なしに変更又は削除することがあります。'
            )
          }}
        </li>
      </ul>
    </b-container>
    <b-container>
      <h2>{{ $t('推奨ブラウザ環境') }}</h2>
      <ul>
        <li>
          {{
            $t(
              '当サイトは、EdgeやChrome、Firefoxなどのいわゆる「モダンブラウザ」の最新版でご覧いただくことを推奨しています。それ以外の環境では、正しく表示されない可能性があります。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              '当サイトでは、JavaScriptを利用しています。JavaScriptを無効化してご利用された場合、各ページが正しく表示されないことがあります。'
            )
          }}
        </li>
      </ul>
    </b-container>
    <b-container>
      <h2>{{ $t('Google Analyticsの利用について') }}</h2>
      <ul>
        <li>{{ $t('当サイトでは、Google Analyticsを利用しています。') }}</li>
        <li>
          {{
            $t(
              'Google Analyticsでは、当サイトの利用状況を分析しています。詳細な住所や氏名などの個人情報は含まれません。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              '取得したデータは、Webサイト利用状況を分析し、サービスの改善につなげるために利用されます。または、サイト運営者へのレポートを作成するため、その他のサービスの提供に関わる目的にも利用されます。利用範囲はこれらに限られます。'
            )
          }}
        </li>
        <li>
          {{
            $t(
              'Google Analyticsの利用規約及びプライバシーポリシーに関する説明については、Google Analyticsのサイトをご覧ください。'
            )
          }}
        </li>
      </ul>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head() {
    return {
      title: this.$t('免責事項') as string,
    }
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: this.$t('免責事項等'), to: '/disclaimer/', active: true },
      ],
    }
  },
})
</script>
<style lang="scss" scoped src="~/assets/styles/blog.scss" />
