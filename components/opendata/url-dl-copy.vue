<template>
  <b-input-group>
    <b-form-input type="url" class="url" readonly v-model="url" />
    <b-input-group-append>
      <b-button class="btn" @click="copy">
        <b-icon-files />
        Copy
      </b-button>
      <b-button class="btn" @click="dl">
        <b-icon-download />
        Download
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>
<script lang="ts">
import Vue from 'vue'
import { BIconFiles, BIconDownload } from 'bootstrap-vue'

export default Vue.extend({
  props: {
    url: {
      type: String,
      required: true,
    },
    file_name: {
      type: String,
      required: true,
    },
  },
  components: {
    BIconFiles,
    BIconDownload,
  },
  methods: {
    async copy() {
      try {
        await (this as any).$copyText(this.url)
        ;(this as any).$gtag('event', 'opendata_copy')
        this.$bvToast.toast(this.$t('URLをコピーしました') as string, {
          autoHideDelay: 5000,
          variant: 'success',
        })
      } catch (e) {
        console.error(e)
        this.$bvToast.toast(this.$t('URLのコピーに失敗しました') as string, {
          autoHideDelay: 5000,
          variant: 'danger',
        })
      }
    },
    dl() {
      ;(this as any).$gtag('event', 'opendata_dl')
      const a = document.createElement('a')
      a.href = this.url
      a.download = this.file_name
      a.click()
    },
  },
})
</script>
<style lang="scss" scoped>
.url {
  user-select: all;
}
.btn {
  margin: 0;
}
</style>
