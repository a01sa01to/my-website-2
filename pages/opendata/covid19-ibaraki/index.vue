<template>
  <div>
    <shared-main-header
      :title="$t('茨城県新型コロナウイルス感染症')"
      :b_data="breadcrumb_data"
    />
    <b-container>
      <h2>{{ $t('提供データ一覧') }}</h2>
      <b-table
        striped
        hover
        responsive
        :items="files"
        :fields="fields"
        :dark="$store.state.darkmode"
        :sort-compare="sortComp"
      >
        <template #cell(text)="{ index, value }">
          <nuxt-link :to="`./${files[index].to}/`">
            {{ value }}
          </nuxt-link>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FileData from '~/data/opendata/covid19_ibaraki.json'

export default Vue.extend({
  head() {
    return {
      title: `${this.$t('茨城県新型コロナウイルス感染症')} - Opendata`,
      meta: [
        {
          name: 'description',
          content: this.$t(
            '茨城県新型コロナウイルス感染症の提供オープンデータ一覧です。'
          ) as string,
        },
      ],
    }
  },
  data() {
    return {
      breadcrumb_data: [
        { to: '/', text: 'Home' },
        { to: '/opendata/', text: 'Opendata' },
        {
          to: '/opendata/covid19-ibaraki/',
          text: this.$t('茨城県新型コロナウイルス感染症'),
          active: true,
        },
      ],
      fields: [
        { key: 'to', class: 'd-none' },
        { key: 'text', label: this.$t('データ'), thStyle: 'min-width:14rem' },
        {
          key: 'last_update',
          label: this.$t('最終更新'),
          sortable: true,
          thStyle: 'min-width:7rem',
        },
        {
          key: 'size',
          label: this.$t('ファイルサイズ'),
          sortable: true,
          thStyle: 'min-width:7rem',
        },
      ],
      files: [
        {
          to: 'patients',
          text: this.$t('陽性患者属性'),
          last_update: FileData.patients.lastUpdate,
          size: FileData.patients.size,
        },
        {
          to: 'test-people',
          text: this.$t('検査実施人数（県衛生研究所・水戸市保健所実施分）'),
          last_update: FileData.test_people.lastUpdate,
          size: FileData.test_people.size,
        },
        {
          to: 'mutant-test-people',
          text: this.$t('変異株検査実施件数（県衛生研究所）'),
          last_update: FileData.mutant_test_people.lastUpdate,
          size: FileData.mutant_test_people.size,
        },
        {
          to: 'call-center',
          text: this.$t('受診相談窓口における相談件数'),
          last_update: FileData.call_center.lastUpdate,
          size: FileData.call_center.size,
        },
        {
          to: 'positive-number',
          text: this.$t('陽性確認数'),
          last_update: FileData.positive_number.lastUpdate,
          size: FileData.positive_number.size,
        },
        {
          to: 'mutant-positive-number',
          text: this.$t('変異株陽性確認数'),
          last_update: FileData.mutant_positive_number.lastUpdate,
          size: FileData.mutant_positive_number.size,
        },
        {
          to: 'recovered-number',
          text: this.$t('回復確認数'),
          last_update: FileData.recovered_number.lastUpdate,
          size: FileData.recovered_number.size,
        },
        {
          to: 'death-number',
          text: this.$t('死亡確認数'),
          last_update: FileData.death_number.lastUpdate,
          size: FileData.death_number.size,
        },
        {
          to: 'death-attributes',
          text: this.$t('死亡者属性'),
          last_update: FileData.death_attr.lastUpdate,
          size: FileData.death_attr.size,
        },
        {
          to: 'inspections-summary',
          text: this.$t('検査実施件数（県全体）'),
          last_update: FileData.inspections_summary.lastUpdate,
          size: FileData.inspections_summary.size,
        },
        {
          to: 'patients-summary',
          text: this.$t('陽性者の状況'),
          last_update: FileData.main_summary.lastUpdate,
          size: FileData.main_summary.size,
        },
        {
          to: 'corona-next',
          text: this.$t('茨城版コロナNext'),
          last_update: FileData.corona_next.lastUpdate,
          size: FileData.corona_next.size,
        },
        {
          to: 'vaccination',
          text: this.$t('ワクチン接種状況'),
          last_update: FileData.vaccination.lastUpdate,
          size: FileData.vaccination.size,
        },
      ],
    }
  },
  methods: {
    sortComp(
      aRow: any,
      bRow: any,
      key: string,
      sortDesc: boolean,
      formatter: any,
      compareOptions: any,
      compareLocale: any
    ) {
      let a = aRow[key]
      let b = bRow[key]
      if (key === 'size') {
        const filesize2int = (filesize: string): number => {
          const unit = [
            'Byte',
            'KiB',
            'MiB',
            'GiB',
            'TiB',
            'PiB',
            'EiB',
            'ZiB',
            'YiB',
          ]
          const reg = /^([\d\.]+) ([a-zA-Z]+)$/
          const un = unit.indexOf(filesize.replace(reg, '$2'))
          const num = Number(filesize.replace(reg, '$1'))
          return num * Math.pow(1024, un)
        }
        a = filesize2int(a)
        b = filesize2int(b)
      }
      return String(a).localeCompare(String(b), compareLocale, compareOptions)
    },
  },
})
</script>
