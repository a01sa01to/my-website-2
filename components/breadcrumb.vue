<template>
  <div v-if="!jsononly">
    <b-breadcrumb>
      <b-breadcrumb-item
        v-for="d in data"
        :key="d.to"
        :to="localePath(d.to)"
        :active="d.active"
      >
        {{ d.text }}
      </b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import type { BreadcrumbList, WithContext, ListItem } from 'schema-dts'
import generateHash from '~/utils/hash'
import type JsonObject from '~/types/json-object'

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
    const jsonld: WithContext<BreadcrumbList> = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.data
        .map((val: BreadcrumbData, index: number): WithContext<ListItem> => {
          return {
            '@context': 'https://schema.org',
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
          hid: `jsonld-breadcrumb-${generateHash(JSON.stringify(jsonld))}`,
          type: 'application/ld+json',
          json: jsonld as unknown as JsonObject,
        },
      ],
    }
  },
})
</script>
