<template>
  <div>
    <SharedMainHeader title="Apps" :b_data="breadcrumb_data" />
    <b-container>
      <b-row cols-xl="3" cols-md="2" cols-lg="2" cols-sm="1">
        <b-col v-for="card in AppsList" :key="card.publish">
          <b-card
            :title="card.translate ? $t(card.title) : card.title"
            :sub-title="`Published on ${card.publish}`"
            :img-src="card.imgsrc"
            :img-alt="card.translate ? $t(card.title) : card.title"
            img-top
          >
            <b-card-text>{{ $t(card.text) }}</b-card-text>
            <div class="text-center">
              <b-button-group>
                <b-button
                  v-for="btn in card.buttons"
                  :key="btn.text"
                  :href="btn.external ? btn.url : null"
                  :target="btn.external ? '_blank' : null"
                  :to="btn.external ? null : btn.url"
                  variant="outline-secondary"
                >
                  <component :is="btn.icon" /><br />
                  {{ btn.text }}
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
import AppsList from '~/data/apps.json'
import {
  BIconDownload,
  BIconGithub,
  BIconBook,
  BIconBoxArrowUpRight,
  BIconYoutube,
  BIconTwitter,
  BIconDiagram3,
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
    BIconDiagram3,
  },
  data() {
    return {
      breadcrumb_data: [
        { text: 'Home', to: '/' },
        { text: 'Apps', to: '/apps/', active: true },
      ],
      AppsList,
    }
  },
})
</script>

<style lang="scss" scoped>
.row {
  gap: 1rem 0;
}
</style>
