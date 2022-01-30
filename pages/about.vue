<template>
  <div>
    <h1>About Me</h1>
    <breadcrumb :data="breadcrumb_data" />
    <b-container>
      <h2>{{ $t('自己紹介') }}</h2>
      <p>
        {{
          $t('名前Asatoの頭文字からAsa。誕生日の01月01日を足して、a01sa01to。')
        }}
      </p>
      <p>
        {{
          $t('日本人。2003年生まれの{age}歳。茨城県住み。', {
            age: new Date().getFullYear() - 2003,
          })
        }}
      </p>
      <p>{{ $t('古河中等教育学校卒。埼玉大学工学部情報工学科在籍。') }}</p>
      <p>{{ $t('プログラマー。動画制作者。') }}</p>
    </b-container>
    <b-container>
      <h2>{{ $t('略歴') }}</h2>
      <div class="history">
        <AboutHistoryItem year="2003" month="01" :text="$t('誕生')" />
        <AboutHistoryItem year="2009" month="04" :text="$t('小学校に入学')" />
        <AboutHistoryItem
          year="2015"
          month="04"
          :text="$t('古河中等教育学校に入学')"
        />
        <AboutHistoryItem
          year="2016"
          month="09"
          :text="$t('古河中等ばかっこいいシリーズを立ち上げる')"
        />
        <AboutHistoryItem
          year="2020"
          month="03"
          :text="$t('茨城県新型コロナ対策サイトを立ち上げる')"
        />
        <AboutHistoryItem
          year="2021"
          month="04"
          :text="$t('埼玉大学 工学部 情報工学科に入学')"
        />
      </div>
    </b-container>
    <b-container id="social">
      <h2>{{ $t('利用しているサービス一覧') }}</h2>
      <p>
        {{
          $t(
            'プロフィールを公開しているサービスのみです。アルファベット昇順です。ボタンクリックでサービスへ移動できます。'
          )
        }}
      </p>
      <b-button
        href="https://atcoder.jp/users/a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #000; --text-color: #fff"
      >
        <b-icon-link-45deg />
        AtCoder
      </b-button>
      <b-button
        href="https://codeforces.com/profile/a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #1f8acb; --text-color: #fff"
      >
        <simpleicon-container :data="siCodeforces" />
        Codeforces
      </b-button>
      <b-button
        href="https://facebook.com/asato.tsuchiya.77"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #1877f2; --text-color: #fff"
      >
        <simpleicon-container :data="siFacebook" />
        Facebook
      </b-button>
      <b-button
        href="https://github.com/a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #181717; --text-color: #fff"
      >
        <simpleicon-container :data="siGithub" />
        GitHub
      </b-button>
      <b-button
        href="https://g.dev/a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #4285f4; --text-color: #fff"
      >
        <simpleicon-container :data="siGoogle" />
        Google Developers
      </b-button>
      <b-button
        href="https://instagram.com/a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #e4405f; --text-color: #fff"
      >
        <simpleicon-container :data="siInstagram" />
        Instagram
      </b-button>
      <b-button
        href="https://www.nicovideo.jp/user/46836937"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #231815; --text-color: #fff"
      >
        <simpleicon-container :data="siNiconico" />
        niconico
      </b-button>
      <b-button
        href="https://www.npmjs.com/~a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #c83837; --text-color: #fff"
      >
        <simpleicon-container :data="siNpm" />
        npm
      </b-button>
      <b-button
        href="https://peing.net/ja/a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #5eb9ba; --text-color: #fff"
      >
        <b-icon-link-45deg />
        Peing {{ $t('（質問箱）') }}
      </b-button>
      <b-button
        href="https://www.pixiv.net/users/21010304"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #0096fa; --text-color: #fff"
      >
        <simpleicon-container :data="siPixiv" />
        Pixiv
      </b-button>
      <b-button
        href="https://qiita.com/a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #55c500; --text-color: #fff"
      >
        <simpleicon-container :data="siQiita" />
        Qiita
      </b-button>
      <b-button
        href="https://steamcommunity.com/id/a01sa01to/"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #000; --text-color: #fff"
      >
        <simpleicon-container :data="siSteam" />
        Steam
      </b-button>
      <b-button
        href="https://www.twitch.tv/a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #9146ff; --text-color: #fff"
      >
        <simpleicon-container :data="siTwitch" />
        Twitch
      </b-button>
      <b-button
        href="https://twitter.com/a01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #1da1f2; --text-color: #fff"
      >
        <simpleicon-container :data="siTwitter" />
        Twitter
      </b-button>
      <b-button
        href="https://ja.wikipedia.org/wiki/%E5%88%A9%E7%94%A8%E8%80%85:A01sa01to"
        target="_blank"
        class="btn-custom"
        style="--bg-color: #000; --text-color: #fff"
      >
        <simpleicon-container :data="siWikipedia" />
        Wikipedia
      </b-button>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BIconLink45deg, BIconLock } from 'bootstrap-vue'
import {
  siCodeforces,
  siFacebook,
  siGithub,
  siGoogle,
  siInstagram,
  siNiconico,
  siNpm,
  siPixiv,
  siQiita,
  siSteam,
  siTwitch,
  siTwitter,
  siWikipedia,
} from 'simple-icons/icons'
export default Vue.extend({
  head: {
    title: 'About Me',
  },
  components: {
    BIconLink45deg,
    BIconLock,
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'About Me', to: '/about/me/', active: true },
      ],
      siCodeforces,
      siFacebook,
      siGithub,
      siGoogle,
      siInstagram,
      siNiconico,
      siNpm,
      siPixiv,
      siQiita,
      siSteam,
      siTwitch,
      siTwitter,
      siWikipedia,
    }
  },
})
</script>

<style lang="scss" scoped>
.history {
  margin-top: 1rem;
  .item:first-child {
    border-top: 1px solid var(--border-color);
  }
}
</style>
