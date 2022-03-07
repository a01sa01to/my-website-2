<template>
  <div>
    <shared-main-header title="Sitemap" :b_data="breadcrumb_data" />
    <b-container id="asas">
      <h2>a01sa01to.com</h2>
      <p>My Website</p>
      <b-container>
        <h3>Top</h3>
        <div class="Sitemap-links">
          <b-button :variant="btn_variant" :to="localePath('/')">Home</b-button>
          <b-button :variant="btn_variant" :to="localePath('/apps/')">
            Apps
          </b-button>
          <b-button :variant="btn_variant" :to="localePath('/blog/')">
            Blog
          </b-button>
          <b-button :variant="btn_variant" :to="localePath('/opendata/')">
            Opendata
          </b-button>
          <b-button :variant="btn_variant" :to="localePath('/about/')">
            About Me
          </b-button>
          <b-button :variant="btn_variant" :to="localePath('/disclaimer/')">
            {{ $t('免責事項') }}
          </b-button>
          <b-button :variant="btn_variant" :to="localePath('#')">
            Sitemap
          </b-button>
        </div>
      </b-container>
      <b-container>
        <h3>Apps</h3>
        <div class="Sitemap-link">
          <b-button
            :variant="btn_variant"
            :to="localePath('/apps/title-url-picker/')"
          >
            Title & URL Picker
          </b-button>
          <b-button
            :variant="btn_variant"
            :to="localePath('/apps/webclass-prevent-dl/')"
          >
            Show my report without downloading (WebClass)
          </b-button>
        </div>
      </b-container>
      <b-container>
        <h3>Blog</h3>
        <div class="Sitemap-link">
          <p>{{ $t('このページは現在メンテナンス中です。') }}</p>
          <!-- <b-button :variant="btn_variant" :to="localePath('/blog/tags/')">
            {{ $t('タグ一覧') }}
          </b-button> -->
          <!-- <b-button :variant="btn_variant" :to="localePath(`/blog/${yr}/`)">
            {{ $t('{year}年の記事一覧', { year: yr }) }}
          </b-button> -->
        </div>
      </b-container>
      <b-container>
        <h3>Opendata</h3>
        <div class="Sitemap-link">
          <b-button
            :variant="btn_variant"
            :to="localePath('/opendata/api-usage/')"
          >
            {{ $t('当サイトのOpendata APIの使い方') }}
          </b-button>
          <b-button
            :variant="btn_variant"
            :to="localePath(`/opendata/covid19-ibaraki/`)"
          >
            {{
              $t('{opendata_name}のオープンデータ', {
                opendata_name: $t('茨城県新型コロナウイルス感染症'),
              })
            }}
          </b-button>
        </div>
      </b-container>
    </b-container>
    <b-container id="bakakkoii">
      <h2>kss-bakakkoii.a01sa01to.com</h2>
      <p>{{ $t('古河中等ばかっこいいシリーズ') }}</p>
      <div class="Sitemap-link">
        <b-button
          :variant="btn_variant"
          href="https://kss-bakakkoii.a01sa01to.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Home
        </b-button>
        <b-button
          :variant="btn_variant"
          href="https://kss-bakakkoii.a01sa01to.com/video/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('動画一覧') }}
        </b-button>
        <b-button
          :variant="btn_variant"
          href="https://kss-bakakkoii.a01sa01to.com/video/tips"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('動画の豆知識') }}
        </b-button>
      </div>
    </b-container>
    <b-container id="twitter">
      <h2>Twitter.com</h2>
      <p>{{ $t('Twitterのアカウント一覧') }}</p>
      <div class="Sitemap-link">
        <b-button
          :variant="btn_variant"
          href="https://twitter.com/a01sa01to"
          target="_blank"
          rel="noopener noreferrer"
        >
          @a01sa01to
          {{ $t('（日常ツイート）') }}
        </b-button>
        <b-button
          :variant="btn_variant"
          href="https://twitter.com/covid19_ibaraki"
          target="_blank"
          rel="noopener noreferrer"
        >
          @covid19_ibaraki
          {{ $t('（茨城県の新型コロナ情報）') }}
        </b-button>
        <b-button
          :variant="btn_variant"
          href="https://twitter.com/kss_bakakkoii"
          target="_blank"
          rel="noopener noreferrer"
        >
          @kss_bakakkoii
          {{ $t('（古河中等ばかっこいいシリーズ・更新終了）') }}
        </b-button>
      </div>
    </b-container>
    <b-container id="github">
      <h2>GitHub.com</h2>
      <p>{{ $t('GitHubのアカウントと所属Organization一覧') }}</p>
      <div class="Sitemap-link">
        <b-button
          :variant="btn_variant"
          href="https://github.com/a01sa01to"
          target="_blank"
          rel="noopener noreferrer"
        >
          @a01sa01to
        </b-button>
        <b-button
          :variant="btn_variant"
          href="https://github.com/mspsd"
          target="_blank"
          rel="noopener noreferrer"
        >
          @mspsd
        </b-button>
        <b-button
          :variant="btn_variant"
          href="https://github.com/kss-pc-club"
          target="_blank"
          rel="noopener noreferrer"
        >
          @kss-pc-club
        </b-button>
      </div>
    </b-container>
    <b-container>
      <p>
        <i18n path="その他アカウントなどについては、{aboutme}をご覧ください。">
          <template #aboutme>
            <nuxt-link :to="localePath('/about/#social')">
              {{ $t('自己紹介ページの「利用しているサービス一覧」セクション') }}
            </nuxt-link>
          </template>
        </i18n>
      </p>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head: {
    title: 'Sitemap',
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'Sitemap', to: '/sitemap/', active: true },
      ],
      yr: new Date().getFullYear(),
    }
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

<style lang="scss" scoped>
main .container {
  &#asas {
    --bdCol: #0d47a1;
  }

  &#bakakkoii {
    --bdCol: #014715;
  }

  &#youtube {
    --bdCol: #f00;
  }

  &#twitter {
    --bdCol: #1da1f2;
  }

  &#github {
    --bdCol: #181717;
  }

  h2 {
    width: 100%;
    margin-bottom: 4px;
    text-align: left;
    border-bottom: 2px solid var(--bdCol);
  }
  p {
    padding-left: 8px;
    margin-bottom: 8px;
    font-weight: 200;
    color: var(--bs-gray-dark);
  }
  div.Sitemap-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
