<template>
  <div>
    <shared-header />
    <main><nuxt /></main>
    <shared-footer />
  </div>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  flex-flow: column;
  min-height: 100%;
}
main {
  flex: 1;
  padding-top: calc(64px + 1rem);
}
</style>
