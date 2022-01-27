<template>
  <div>
    <b-container>
      <b-jumbotron
        :text-variant="$store.state.darkmode ? 'light' : 'dark'"
        :bg-variant="$store.state.darkmode ? 'dark' : 'light'"
      >
        <template #header>Asa's Website</template>
        <template #lead>Scroll down to explore this site</template>
      </b-jumbotron>
      <scroll-next-animation />
    </b-container>
    <b-container>
      <h1>About me</h1>
      <p>
        {{
          $t('ただの{age}歳の埼玉大学{grade}年生。茨城県住み。', {
            age: new Date().getFullYear() - 2003,
            grade: Math.ceil(
              (new Date() - new Date(2021, 3, 31)) /
                (1000 * 60 * 60 * 24 * 365.25)
            ),
          })
        }}<br />
        {{ $t('プログラミングする。たまに趣味で動画制作する。') }}<br />
      </p>
      <p class="text-right">
        <nuxt-link to="/about/me/">{{ $t('詳しくはこちら') }} &gt;</nuxt-link>
      </p>
    </b-container>
    <b-container>
      <h1>Works</h1>
      <b-row>
        <b-col>
          <b-card
            :title="$t('茨城県新型コロナウイルス対策サイト')"
            sub-title="https://ibaraki.stopcovid19.jp/"
            :bg-variant="$store.state.darkmode ? 'dark' : 'default'"
            :text-variant="$store.state.darkmode ? 'default' : 'dark'"
            img-top
            img-src="/images/ibk_stopcovid19.png"
          >
            <b-card-text>
              {{ $t('2020年3月20日公開。') }}<br />
              {{ $t('新型コロナサイトとしては、（たぶん）茨城県初。') }}<br />
              {{
                $t(
                  '2020年10月2日、県のサイトにリンクが掲載され、（自称）県公認となった。'
                )
              }}
            </b-card-text>
            <b-button
              href="https://ibaraki.stopcovid19.jp"
              variant="outline-primary"
              target="_blank"
              pill
            >
              <b-icon-book />
              View
            </b-button>
            <b-button
              href="https://github.com/a01sa01to/covid19-ibaraki"
              variant="outline-primary"
              target="_blank"
              pill
            >
              <b-icon-github />
              Source
            </b-button>
            <b-button
              href="https://twitter.com/covid19_ibaraki"
              variant="outline-primary"
              target="_blank"
              pill
            >
              <b-icon-twitter />
              Twitter
            </b-button>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            :title="$t('古河中等ばかっこいいシリーズ')"
            sub-title="https://kss-bakakkoii.a01sa01to.com"
            :bg-variant="$store.state.darkmode ? 'dark' : 'default'"
            :text-variant="$store.state.darkmode ? 'default' : 'dark'"
            img-top
            img-src="/images/kss_bakakkoii.jpg"
          >
            <b-card-text>
              {{ $t('Asaが編集者として参加した映像作品。') }}<br />
              {{
                $t(
                  '古河中等の文化祭で4回、学年レクで1回発表。2020年7月16日、最終回を迎えた。'
                )
              }}
            </b-card-text>
            <b-button
              href="https://kss-bakakkoii.a01sa01to.com"
              variant="outline-primary"
              target="_blank"
              pill
            >
              <b-icon-book />
              View
            </b-button>
            <b-button
              href="https://github.com/a01sa01to/kss-bakakkoii-website"
              variant="outline-primary"
              target="_blank"
              pill
            >
              <b-icon-github />
              Source
            </b-button>
            <b-button
              href="https://twitter.com/kss_bakakkoii"
              variant="outline-primary"
              target="_blank"
              pill
            >
              <b-icon-twitter />
              Twitter
            </b-button>
          </b-card>
        </b-col>
      </b-row>
      <p class="text-right">
        <nuxt-link to="/apps/">{{ $t('もっと見る') }} &gt;</nuxt-link>
      </p>
    </b-container>
    <b-container>
      <h1>Services</h1>
      <b-row>
        <b-col>
          <nuxt-link to="/blog/">
            <icon-with-text>
              <template #icon><b-icon-chat-dots /></template>
              <template #text>Blog</template>
            </icon-with-text>
          </nuxt-link>
        </b-col>
        <b-col>
          <nuxt-link to="/opendata/">
            <icon-with-text>
              <template #icon><b-icon-server /></template>
              <template #text>Opendata</template>
            </icon-with-text>
          </nuxt-link>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <h1>Social</h1>
      <b-row>
        <b-col>
          <a
            href="https://twitter.com/a01sa01to"
            target="_blank"
            rel="noopener noreferrer"
          >
            <icon-with-text hovercolor="#1da1f2">
              <template #icon><b-icon-twitter /></template>
              <template #text>Twitter</template>
            </icon-with-text>
          </a>
        </b-col>
        <b-col>
          <a
            href="https://instagram.com/a01sa01to"
            target="_blank"
            rel="noopener noreferrer"
          >
            <icon-with-text hovercolor="#e4405f">
              <template #icon><b-icon-instagram /></template>
              <template #text>Instagram</template>
            </icon-with-text>
          </a>
        </b-col>
        <b-col>
          <a
            href="https://github.com/a01sa01to"
            target="_blank"
            rel="noopener noreferrer"
          >
            <icon-with-text hovercolor="#000">
              <template #icon><b-icon-github /></template>
              <template #text>GitHub</template>
            </icon-with-text>
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  BIconBook,
  BIconGithub,
  BIconTwitter,
  BIconInstagram,
  BIconChatDots,
  BIconServer,
} from 'bootstrap-vue'

export default Vue.extend({
  head: {
    title: 'Home',
  },
  components: {
    BIconBook,
    BIconChatDots,
    BIconGithub,
    BIconServer,
    BIconTwitter,
    BIconInstagram,
  },
})
</script>
