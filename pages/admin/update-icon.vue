<template>
  <div>
    <h1>Update Icon List</h1>
    <breadcrumb :data="breadcrumb_data" />
    <b-container>
      <b-button
        href="https://account.adobe.com/profile"
        class="btn-custom"
        style="--bg-color: #f00"
      >
        <simpleicon-container :data="siAdobe" />
        Adobe
      </b-button>
      <b-button
        href="https://www.icloud.com/settings/"
        class="btn-custom"
        style="--bg-color: #000"
      >
        <simpleicon-container :data="siApple" />
        Apple
      </b-button>
      <b-button
        href="https://atcoder.jp/settings/icon"
        class="btn-custom"
        style="--bg-color: #000"
      >
        <b-icon-link-45deg />
        AtCoder
      </b-button>
      <b-button
        href="https://discord.com/channels/@me"
        class="btn-custom"
        style="--bg-color: #5865f2"
      >
        <simpleicon-container :data="siDiscord" />
        Discord
      </b-button>
      <b-button
        href="https://www.dropbox.com/account/general"
        class="btn-custom"
        style="--bg-color: #0061ff"
      >
        <simpleicon-container :data="siDropbox" />
        Dropbox
      </b-button>
      <b-button
        href="https://www.facebook.com/asato.tsuchiya.77"
        class="btn-custom"
        style="--bg-color: #1877f2"
      >
        <simpleicon-container :data="siFacebook" />
        Facebook
      </b-button>
      <b-button
        href="https://accounts.firefox.com/settings"
        class="btn-custom"
        style="--bg-color: #ff7139"
      >
        <simpleicon-container :data="siFirefox" />
        Firefox
      </b-button>
      <b-button
        href="https://github.com/settings/profile"
        class="btn-custom"
        style="--bg-color: #181717"
      >
        <simpleicon-container :data="siGithub" />
        GitHub
      </b-button>
      <b-button
        href="https://myaccount.google.com/personal-info"
        class="btn-custom"
        style="--bg-color: #4285f4"
      >
        <simpleicon-container :data="siGoogle" />
        Google
      </b-button>
      <b-button
        href="https://ja.gravatar.com/emails/"
        class="btn-custom"
        style="--bg-color: #1e8cbe"
      >
        <simpleicon-container :data="siGravatar" />
        Gravatar
      </b-button>
      <b-button
        href="https://www.instagram.com/accounts/edit/"
        class="btn-custom"
        style="--bg-color: #e4405f"
      >
        <simpleicon-container :data="siInstagram" />
        Instagram
      </b-button>
      <b-button
        href="https://account.microsoft.com/profile/edit-picture"
        class="btn-custom"
        style="--bg-color: #5e5e5e"
      >
        <simpleicon-container :data="siMicrosoft" />
        Microsoft
      </b-button>
      <b-button
        href="https://account.nicovideo.jp/my/profile"
        class="btn-custom"
        style="--bg-color: #231815"
      >
        <simpleicon-container :data="siNiconico" />
        niconico
      </b-button>
      <b-button
        href="https://www.pixiv.net/setting_profile_img.php"
        class="btn-custom"
        style="--bg-color: #0096fa"
      >
        <simpleicon-container :data="siPixiv" />
        pixiv
      </b-button>
      <b-button
        href="https://qiita.com/settings/account"
        class="btn-custom"
        style="--bg-color: #55c500"
      >
        <simpleicon-container :data="siQiita" />
        Qiita
      </b-button>
      <b-button
        href="https://secure.skype.com/portal/profile"
        class="btn-custom"
        style="--bg-color: #00aff0"
      >
        <simpleicon-container :data="siSkype" />
        Skype
      </b-button>
      <b-button
        href="https://steamcommunity.com/id/a01sa01to/edit/avatar"
        class="btn-custom"
        style="--bg-color: #000"
      >
        <simpleicon-container :data="siSteam" />
        Steam
      </b-button>
      <b-button
        href="https://id.atlassian.com/manage-profile/profile-and-visibility"
        class="btn-custom"
        style="--bg-color: #0052cc"
      >
        <simpleicon-container :data="siTrello" />
        Trello
      </b-button>
      <b-button
        href="https://www.twitch.tv/settings/profile"
        class="btn-custom"
        style="--bg-color: #9146ff"
      >
        <simpleicon-container :data="siTwitch" />
        Twitch
      </b-button>
      <b-button
        href="https://twitter.com/a01sa01to"
        class="btn-custom"
        style="--bg-color: #1da1f2"
      >
        <simpleicon-container :data="siTwitter" />
        Twitter
      </b-button>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BIconLink45deg } from 'bootstrap-vue'
import {
  siAdobe,
  siApple,
  siDiscord,
  siDropbox,
  siFacebook,
  siFirefox,
  siGithub,
  siGoogle,
  siGravatar,
  siInstagram,
  siMicrosoft,
  siNiconico,
  siPixiv,
  siQiita,
  siSkype,
  siSteam,
  siTrello,
  siTwitch,
  siTwitter,
} from 'simple-icons/icons'

export default Vue.extend({
  components: { BIconLink45deg },
  middleware: 'auth',
  head: {
    title: 'Update Icon List',
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'Admin Home', to: '/admin/' },
        { text: 'Update Icon List', to: '/admin/update-icon/', active: true },
      ],
      siAdobe,
      siApple,
      siDiscord,
      siDropbox,
      siFacebook,
      siFirefox,
      siGithub,
      siGoogle,
      siGravatar,
      siInstagram,
      siMicrosoft,
      siNiconico,
      siPixiv,
      siQiita,
      siSkype,
      siSteam,
      siTrello,
      siTwitch,
      siTwitter,
    }
  },
})
</script>
