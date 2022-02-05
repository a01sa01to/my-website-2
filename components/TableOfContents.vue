<template>
  <b-container class="accordion" role="tablist">
    <b-card
      no-body
      :bg-variant="$store.state.darkmode ? 'dark' : 'white'"
      style="border-color: var(--border-color)"
    >
      <b-card-header role="tab">
        <b-button
          block
          v-b-toggle.toc
          :variant="$store.state.darkmode ? 'dark' : 'white'"
        >
          <b-icon-list-ul />&nbsp; Table of Contents
        </b-button>
      </b-card-header>
      <b-collapse id="toc" accordion="toc" role="tabpanel">
        <b-card-body id="tocbody"></b-card-body>
      </b-collapse>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { BIconListUl } from 'bootstrap-vue'
export default Vue.extend({
  components: {
    BIconListUl,
  },
  mounted() {
    const ins = document.getElementById('tocbody')
    let cnt = 0
    document
      .querySelector('main')
      ?.querySelectorAll('h2,h3,h4,h5,h6')
      ?.forEach((_) => {
        ++cnt
        const e = _ as HTMLHeadingElement
        const a = document.createElement('a')
        a.href = '#' + e.id
        a.textContent = e.textContent
        a.classList.add(e.tagName.toLowerCase())
        ins?.appendChild(a)
      })
    if (cnt === 0) {
      ins!.innerText = '見出しがありません'
    }
  },
})
</script>

<style lang="scss">
#toc {
  padding: 0.3rem;

  #tocbody {
    a {
      display: block;
      font-size: 0.9rem;
      text-decoration: none;
    }

    .h2 {
      padding-left: 0;
    }

    .h3 {
      padding-left: 1em;
    }

    .h4 {
      padding-left: 2em;
    }

    .h5 {
      padding-left: 3em;
    }

    .h6 {
      padding-left: 4em;
    }
  }
}
</style>
