<template>
  <div>
    <SharedMainHeader
      title="Show my report without downloading (WebClass)"
      :b_data="breadcrumb_data"
      :description="
        $t(
          'WebClassで、提出したレポートなどをダウンロードせずに閲覧するChrome拡張機能。'
        )
      "
    />
    <table-of-contents />
    <b-container>
      <h2 id="about">{{ $t('このアプリについての説明') }}</h2>
      <p>
        {{
          $t(
            'WebClassを使う際、「（科目）→『マイレポート』→（ファイル名）」とすることで提出したレポートを見ることができます。しかし、提出したレポートを閲覧するためにはダウンロードする必要があります。'
          )
        }}
        <br />
        {{
          $t(
            'この拡張機能を用いると、ダウンロードすることなくファイルを閲覧することができます。'
          )
        }}
      </p>
      <p>
        {{
          $t(
            'なお、このアプリはスコープの関係上、埼玉大学のWebClassにおいてのみ利用できます。他大学で利用したい場合、Forkしてご利用ください（詳しくはGitHubをご覧ください）。'
          )
        }}
      </p>
    </b-container>
    <b-container>
      <h2 id="how-to-use">{{ $t('使い方') }}</h2>
      <p>
        <i18n path="{chromeWebstore}からインストールするだけで使えます。">
          <template #chromeWebstore>
            <external-link
              to="https://chrome.google.com/webstore/detail/jnfpcbofkkehicfggjmhgaabheodhhpe/"
            >
              Chrome Webstore
            </external-link>
          </template>
        </i18n>
      </p>
    </b-container>
    <b-container>
      <h2 id="related-links">{{ $t('関係するリンク') }}</h2>
      <external-link to="https://github.com/a01sa01to/WebClass-PreventDL">
        {{ $t('ソースコード') }}
      </external-link>
    </b-container>
    <b-container>
      <h2 id="updates">{{ $t('更新情報') }}</h2>
      <ul>
        <li>2021.10.23 - {{ $t('この紹介ページを公開') }}</li>
        <li>2021.10.23 - {{ $t('ソースコードを公開') }}</li>
      </ul>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head: {
    title: 'Show my report without downloading (WebClass) - Apps',
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'Apps', to: '/apps/' },
        {
          text: 'Show my report without downloading (WebClass)',
          to: '/apps/webclass-prevent-dl/',
          active: true,
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/styles/blog.scss';
</style>
