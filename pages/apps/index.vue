<template>
  <div>
    <SharedMainHeader title="Apps" :b_data="breadcrumb_data" />
    <b-container>
      <b-row cols-xl="3" cols-md="2" cols-lg="2" cols-sm="1">
        <b-col>
          <b-card
            title="Show my report without downloading (WebClass)"
            sub-title="Published on 2021.10.23"
            img-src="https://opengraph.githubassets.com/0/a01sa01to/Webclass-PreventDL"
            img-alt="Show my report without downloading (WebClass)"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  'WebClassで、提出したレポートなどを、ダウンロードせずに閲覧するためのChrome拡張機能。'
                )
              }}
              {{ $t('（命名の語彙力がないことはお気になさらず...）') }}
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://chrome.google.com/webstore/detail/jnfpcbofkkehicfggjmhgaabheodhhpe/"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-download /><br />
                  Download
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/WebClass-PreventDL"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
                <b-button
                  to="./webclass-prevent-dl/"
                  variant="outline-secondary"
                >
                  <b-icon-book /><br />
                  About
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            :title="$t('席替えシステム')"
            sub-title="Published on 2020.11.03"
            img-src="https://opengraph.githubassets.com/0/a01sa01to/Seat-Change"
            :img-alt="$t('席替えシステム')"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  '教室での席替えを勝手にしてくれるプログラム。行数と列数、人数を指定したり、希望者は優先的に前列にしたりすることもできる機能付き。'
                )
              }}
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://repos.a01sa01to.com/Seat-Change/"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-box-arrow-up-right /><br />
                  View
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/Seat-Change"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            :title="$t('古河中等ばかっこいいシリーズ')"
            sub-title="Published on 2020.07.13"
            img-src="/images/kss_bakakkoii.jpg"
            :img-alt="$t('古河中等ばかっこいいシリーズ')"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  '古河中等の有志発表で唯一の動画枠（だった）。初回発表は2016年9月9日の文化祭で、合計3回の文化祭、2回の学年リクリエーションに登場した。'
                )
              }}<br />
              {{
                $t(
                  'そのウェブサイトを、最終回直前にリニューアルし、2020.07.13に公開した。'
                )
              }}
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://kss-bakakkoii.a01sa01to.com/"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-box-arrow-up-right /><br />
                  View
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/kss-bakakkoii-website/"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
                <b-button
                  href="https://www.youtube.com/channel/UC_s6Env3fmLi1hIbYrrBk0Q"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-youtube /><br />
                  Videos
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            :title="$t('茨城県新型コロナウイルス対策サイト')"
            sub-title="Published 2020.03.20"
            img-src="/images/ibk_stopcovid19.png"
            :img-alt="$t('茨城県新型コロナウイルス対策サイト')"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  '茨城県の新型コロナの感染状況や対策情報などがみられるダッシュボード。'
                )
              }}
              <i18n path="{tokyo_covid19}の派生サイト。">
                <template #tokyo_covid19>
                  <a
                    href="https://stopcovid19.metro.tokyo.lg.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ $t('東京都版') }}
                  </a>
                </template>
              </i18n>
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://ibaraki.stopcovid19.jp/"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-box-arrow-up-right /><br />
                  View
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/covid19-ibaraki"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
                <b-button
                  href="https://twitter.com/covid19_ibaraki"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-twitter /><br />
                  Updates
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            title="README-Maker"
            sub-title="Published on 2019.12.14"
            img-src="https://opengraph.githubassets.com/0/a01sa01to/README-Maker"
            img-alt="README-Maker"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  'GitHubの「Template」機能を知らずに作ったREADME.md生成器。リポジトリ名と作品名、ライセンスを入力するだけで自分のテンプレに沿ったREADME.mdが作られる。'
                )
              }}
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://repos.a01sa01to.com/README-Maker"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-box-arrow-up-right /><br />
                  View
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/README-Maker"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            :title="$t('神経衰弱')"
            sub-title="Published on 2019.12.09"
            img-src="https://opengraph.githubassets.com/0/a01sa01to/NervousBreakdown"
            :img-alt="$t('神経衰弱')"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  '4x4の神経衰弱。5年次の情報の課題で出されたものをそのままあげた。実はこれでWebpackを初めて使った。'
                )
              }}
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://repos.a01sa01to.com/NervousBreakdown"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-box-arrow-up-right /><br />
                  View
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/NervousBreakdown"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            title="Code Auto-Typer"
            sub-title="Published on 2019.08.19"
            img-src="https://opengraph.githubassets.com/0/a01sa01to/Code-AutoTyper"
            img-alt="Code Auto-Typer"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  'キーボードをカタカタ打つだけで勝手にコードが入力されるプログラム。ハッカー気分が味わえる()'
                )
              }}
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://repos.a01sa01to.com/Code-AutoTyper"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-box-arrow-up-right /><br />
                  View
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/Code-AutoTyper"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            title="Title & URL Picker"
            sub-title="Published on 2019.03.16"
            img-src="https://opengraph.githubassets.com/0/a01sa01to/TitleAndURL_Picker"
            img-alt="Title & URL Picker"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  'その名の通りのChrome拡張機能。開いているタブのタイトル・URLを取得でき、またMarkdown形式でリンクを作成できる。'
                )
              }}
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://chrome.google.com/webstore/detail/apegdmeimjlklboalimnaokfnnngajcg"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-download /><br />
                  Download
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/TitleAndURL_Picker"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
                <b-button to="./title-url-picker" variant="outline-secondary">
                  <b-icon-book /><br />
                  About
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            :title="$t('古河中等教育学校の新Webサイト')"
            sub-title="Published in 2018"
            img-src="https://opengraph.githubassets.com/0/a01sa01to/KSS-New"
            :img-alt="$t('古河中等教育学校の新Webサイト')"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  '完全非公式。本家サイトがいろいろ見づらかったりしたので、勝手に様々な問題を直しちゃおうというために作ったサイト。ほぼ更新してない。'
                )
              }}
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://kss-new.a01sa01to.com"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-box-arrow-up-right /><br />
                  View
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/KSS-New"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            title="IME Changer"
            sub-title="Published on 2018.12.17"
            img-src="https://opengraph.githubassets.com/0/a01sa01to/IMEChange"
            img-alt="IME Changer"
            img-top
          >
            <b-card-text>
              {{
                $t(
                  '自分のために作ったIMEを自動で切り替えるソフト。スタートアップに登録しておくと、自動でIMEが切り替わってくれる。'
                )
              }}
            </b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  href="https://github.com/a01sa01to/IMEChange/releases/tag/v1.0"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-download /><br />
                  Download
                </b-button>
                <b-button
                  href="https://github.com/a01sa01to/IMEChange"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-github /><br />
                  Source
                </b-button>
                <b-button
                  href="https://qiita.com/a01sa01to/items/5142d35367a08d2ba0cd"
                  target="_blank"
                  variant="outline-secondary"
                >
                  <b-icon-book /><br />
                  Article
                </b-button>
              </b-button-group>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  BIconDownload,
  BIconGithub,
  BIconBook,
  BIconBoxArrowUpRight,
  BIconYoutube,
  BIconTwitter,
} from 'bootstrap-vue'
export default Vue.extend({
  head: {
    title: 'Apps',
  },
  components: {
    BIconDownload,
    BIconGithub,
    BIconBook,
    BIconBoxArrowUpRight,
    BIconYoutube,
    BIconTwitter,
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'Apps', to: '/apps/', active: true },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
.row {
  gap: 1rem 0;
}
</style>
