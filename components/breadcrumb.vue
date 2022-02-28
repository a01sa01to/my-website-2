<template>
  <div v-if="!jsononly">
    <b-breadcrumb>
      <b-breadcrumb-item
        v-for="d in data"
        :key="d.to"
        :to="d.to"
        :active="d.active"
      >
        {{ d.text }}
      </b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

type BreadcrumbData = {
  to: string
  text: string
  active?: boolean
}

export default Vue.extend({
  props: {
    data: {
      type: Array,
      default: [{ text: 'Home', to: '/' }],
    },
    jsononly: {
      type: Boolean,
      default: false,
    },
  },
  head() {
    const jsonld = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.data
        .map((val: BreadcrumbData, index: number) => {
          return {
            '@type': 'ListItem',
            position: index,
            name: val.text,
            item: `https://a01sa01to.com${val.to}`,
          }
        })
        .splice(1),
    }

    return {
      script: [
        {
          hid: 'jsonld-breadcrumb',
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonld),
        },
      ],
    }
  },
})
</script>
