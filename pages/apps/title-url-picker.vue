<template>
  <div>
    <SharedMainHeader
      title="Title & URL Picker"
      :b_data="breadcrumb_data"
      :description="
        $t(
          'その名の通りのChrome拡張機能。開いているタブのタイトル・URLを取得でき、またMarkdown形式でリンクを作成できる。'
        )
      "
    />
    <TableOfContents />
    <b-container>
      <h2 id="how-to-use">{{ $t('使い方') }}</h2>
      <b-container>
        <h3 id="getting-title">{{ $t('ページのタイトルを取得する') }}</h3>
        <webp-image
          src="/images/apps/title-url-picker/01"
          ext="jpg"
          :alt="$t('ページのタイトルを取得する')"
          class="img-fluid"
          style="display: inline-block"
        />
        <ol style="display: inline-block">
          <li>{{ $t('拡張機能を開きます。') }}</li>
          <li>{{ $t('「Get Title」ボタンをクリックします。') }}</li>
          <li>{{ $t('テキストボックスから、タイトルをコピーできます。') }}</li>
        </ol>
      </b-container>
      <b-container>
        <h3 id="getting-url">{{ $t('ページのURLを取得') }}</h3>
        <webp-image
          src="/images/apps/title-url-picker/02"
          ext="jpg"
          :alt="$t('URLを取得')"
          class="img-fluid"
          style="display: inline-block"
        />
        <ol style="display: inline-block">
          <li>{{ $t('拡張機能を開きます。') }}</li>
          <li>{{ $t('「Get URL」ボタンをクリックします。') }}</li>
          <li>{{ $t('テキストボックスから、URLをコピーできます。') }}</li>
        </ol>
      </b-container>
      <b-container>
        <h3 id="getting-markdown">
          {{ $t('Markdown形式でページへのリンクを作成') }}
        </h3>
        <webp-image
          src="/images/apps/title-url-picker/03"
          ext="jpg"
          :alt="$t('リンクを作成')"
          class="img-fluid"
          style="display: inline-block"
        />
        <ol style="display: inline-block">
          <li>{{ $t('拡張機能を開きます。') }}</li>
          <li>
            {{ $t('「Get both with Markdown」ボタンをクリックします。') }}
          </li>
          <li>{{ $t('テキストボックスから、リンクをコピーできます。') }}</li>
        </ol>
      </b-container>
    </b-container>
    <b-container>
      <h2 id="how-to-install">{{ $t('導入方法') }}</h2>
      <p>
        <i18n path="{chromeWebstore}からインストールしてください。">
          <template #chromeWebstore>
            <external-link
              to="https://chrome.google.com/webstore/detail/apegdmeimjlklboalimnaokfnnngajcg"
            >
              Chrome Webstore
            </external-link>
          </template>
        </i18n>
      </p>
    </b-container>
    <b-container>
      <h2 id="related-links">{{ $t('関係するリンク') }}</h2>
      <ul>
        <li>
          <external-link
            to="https://qiita.com/a01sa01to/items/bd7b18b4ec3dc6c46b32"
          >
            Qiita
          </external-link>
          - {{ $t('私がどのようにこのアプリを作ったかが書いてあります。') }}
        </li>
        <li>
          <external-link to="https://github.com/a01sa01to/TitleAndURL_Picker/">
            GitHub
          </external-link>
        </li>
      </ul>
    </b-container>
    <b-container>
      <h2 id="updates">{{ $t('更新情報') }}</h2>
      <ul>
        <li>2021.05.06 - {{ $t('この紹介ページを公開') }}</li>
        <li>2019.03.16 - {{ $t('ソースコードを公開') }}</li>
      </ul>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import externalLink from '~/components/external-link.vue'
import WebpImage from '~/components/WebpImage.vue'
export default Vue.extend({
  components: { externalLink, WebpImage },
  head: {
    title: 'Title & URL Picker - Apps',
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'Apps', to: '/apps/' },
        {
          text: 'Title & URL Picker',
          to: '/apps/title-url-picker/',
          active: true,
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped src="~/assets/styles/blog.scss" />
