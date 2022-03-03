<template>
  <div>
    <shared-main-header :title="$t(title)" :b_data="breadcrumb_data" />
    <b-container>
      <p>{{ $t(description) }}</p>
    </b-container>
    <b-container>
      <h2>{{ $t('ファイルに関する情報') }}</h2>
      <b-table-simple hover responsive :dark="$colorMode.value === 'dark'">
        <b-tbody class="filetable">
          <b-tr>
            <b-td class="filetabletd">
              {{ $t('最終更新') }}
            </b-td>
            <b-td>{{ last_update }} (UTC+09:00)</b-td>
          </b-tr>
          <b-tr>
            <b-td class="filetabletd">
              {{ $t('作成日') }}
            </b-td>
            <b-td>{{ created_date }} (UTC+09:00)</b-td>
          </b-tr>
          <b-tr>
            <b-td class="filetabletd">
              {{ $t('ファイル名') }}
            </b-td>
            <b-td>{{ url.split('/').slice(-1)[0] }}</b-td>
          </b-tr>
          <b-tr>
            <b-td class="filetabletd">
              {{ $t('ファイルサイズ') }}
            </b-td>
            <b-td>{{ file_size }}</b-td>
          </b-tr>
          <b-tr>
            <b-td class="filetabletd">
              {{ $t('データ形式') }}
            </b-td>
            <b-td>{{ data_format.toUpperCase() }}</b-td>
          </b-tr>
          <b-tr>
            <b-td class="filetabletd">
              {{ $t('ライセンス') }}
            </b-td>
            <b-td>
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by-sa/4.0/"
              >
                <img
                  alt="Creative Commons License"
                  style="border-width: 0"
                  src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
                />
              </a>
              <external-link
                to="http://creativecommons.org/licenses/by-sa/4.0/"
              >
                CC BY-SA 4.0
              </external-link>
              <br />
              {{
                $t(
                  '出所の表示は必須ですが、商業利用・改変は許可されます。改変・加工した場合、その作品は本データ同様に「CC BY-SA 4.0」のライセンスの元に頒布してください。出所として、当ページのURLを掲載願います。'
                )
              }}
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <p class="text-muted text-center">
        <i18n path="何か疑問点やご要望があれば、{mail}にお寄せください。">
          <template #mail>
            <external-link to="mailto:info%40a01sa01to.com">
              info@a01sa01to.com
            </external-link>
          </template>
        </i18n>
      </p>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Dataset, WithContext } from 'schema-dts'

export default Vue.extend({
  props: {
    last_update: {
      type: String,
      required: true,
    },
    created_date: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    file_size: {
      type: String,
      required: true,
    },
    data_format: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: {
      type: Array,
      default: () => [],
    },
    coverage: {
      type: String,
      default: '',
    },
    disableJSON: {
      type: Boolean,
      default: false,
    },
    breadcrumb_data: {
      type: Array,
      required: true,
    },
    partof: {
      type: String,
      default: '',
    },
  },
  jsonld() {
    if (this.disableJSON) return null

    const jsonld: WithContext<Dataset> = {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: this.$t(this.title, 'en'),
      description: this.$t(this.description, 'en'),
      url: this.url,
      keywords: this.keywords,
      license: 'http://creativecommons.org/licenses/by-sa/4.0/',
      isAccessibleForFree: true,
      temporalCoverage: this.coverage,
      version: '1.0.0',
      creator: {
        '@type': 'Person',
        sameAs: 'https://orcid.org/0000-0002-8810-1134',
        name: 'Asato Tsuchiya',
        givenName: 'Asato',
        familyName: 'Tsuchiya',
        url: 'https://a01sa01to.com',
      },
      distribution: [
        {
          '@type': 'DataDownload',
          contentUrl: this.url,
          encodingFormat: this.data_format.toUpperCase(),
        },
      ],
    }

    if (this.partof) {
      ;(jsonld as any).isPartOf = this.partof
    }
    return jsonld
  },
})
</script>

<style lang="scss" scoped>
.filetable {
  max-width: 100%;
  .filetabletd {
    min-width: 8.5rem;
    text-align: right;
  }
}
</style>
