<template>
  <div>
    <b-container>
      <b-jumbotron
        :text-variant="$colorMode.value === 'dark' ? 'light' : 'dark'"
        :bg-variant="$colorMode.value === 'dark' ? 'dark' : 'light'"
      >
        <template #header>Asa's Website</template>
        <template #lead>Scroll down to explore this site</template>
      </b-jumbotron>
      <scroll-next-animation />
    </b-container>
    <b-container>
      <h2>About me</h2>
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
        <nuxt-link :to="localePath('/about/')">
          {{ $t('詳しくはこちら') }} &gt;
        </nuxt-link>
      </p>
    </b-container>
    <b-container>
      <h2>Works</h2>
      <b-row>
        <b-col>
          <b-card
            :title="$t('茨城県新型コロナウイルス対策サイト')"
            sub-title="https://ibaraki.stopcovid19.jp/"
            :bg-variant="$colorMode.value === 'dark' ? 'dark' : 'default'"
            :text-variant="$colorMode.value === 'dark' ? 'default' : 'dark'"
          >
            <template #header>
              <webp-image
                src="/images/ibk-stopcovid19"
                ext="png"
                :alt="$t('茨城県新型コロナウイルス対策サイト')"
                class="card-img-top"
                style="width: 100%; height: auto"
              />
            </template>
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
              :variant="btn_variant"
              target="_blank"
              rel="noopener noreferrer"
              pill
            >
              <b-icon-book />
              View
            </b-button>
            <b-button
              href="https://github.com/a01sa01to/covid19-ibaraki"
              :variant="btn_variant"
              target="_blank"
              rel="noopener noreferrer"
              pill
            >
              <b-icon-github />
              Source
            </b-button>
            <b-button
              href="https://twitter.com/covid19_ibaraki"
              :variant="btn_variant"
              target="_blank"
              rel="noopener noreferrer"
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
            :bg-variant="$colorMode.value === 'dark' ? 'dark' : 'default'"
            :text-variant="$colorMode.value === 'dark' ? 'default' : 'dark'"
          >
            <template #header>
              <webp-image
                src="/images/kss-bakakkoii"
                ext="jpg"
                :alt="$t('古河中等ばかっこいいシリーズ')"
                class="card-img-top"
                style="width: 100%; height: auto"
              />
            </template>
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
              :variant="btn_variant"
              target="_blank"
              rel="noopener noreferrer"
              pill
            >
              <b-icon-book />
              View
            </b-button>
            <b-button
              href="https://github.com/a01sa01to/kss-bakakkoii-website"
              :variant="btn_variant"
              target="_blank"
              rel="noopener noreferrer"
              pill
            >
              <b-icon-github />
              Source
            </b-button>
            <b-button
              href="https://twitter.com/kss_bakakkoii"
              :variant="btn_variant"
              target="_blank"
              rel="noopener noreferrer"
              pill
            >
              <b-icon-twitter />
              Twitter
            </b-button>
          </b-card>
        </b-col>
      </b-row>
      <p class="text-right">
        <nuxt-link :to="localePath('/apps/')">
          {{ $t('もっと見る') }} &gt;
        </nuxt-link>
      </p>
    </b-container>
    <b-container>
      <h2>Services</h2>
      <b-row>
        <b-col>
          <nuxt-link :to="localePath('/blog/')">
            <icon-with-text>
              <template #icon><b-icon-chat-dots /></template>
              <template #text>Blog</template>
            </icon-with-text>
          </nuxt-link>
        </b-col>
        <b-col>
          <nuxt-link :to="localePath('/opendata/')">
            <icon-with-text>
              <template #icon><b-icon-server /></template>
              <template #text>Opendata</template>
            </icon-with-text>
          </nuxt-link>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <h2>Social</h2>
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
            <icon-with-text hovercolor="#181717">
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
import {
  BIconBook,
  BIconChatDots,
  BIconGithub,
  BIconInstagram,
  BIconServer,
  BIconTwitter,
} from 'bootstrap-vue'
import Vue from 'vue'

export default Vue.extend({
  head() {
    return {
      title: 'Home',
    }
  },
  components: {
    BIconBook,
    BIconChatDots,
    BIconGithub,
    BIconServer,
    BIconTwitter,
    BIconInstagram,
  },
  computed: {
    btn_variant() {
      return this.$colorMode.value === 'dark'
        ? 'outline-light'
        : 'outline-primary'
    },
  },
})
</script>
