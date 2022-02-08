<template>
  <footer>
    <b-container>
      <b-row class="justify-content-center">
        <b-col>
          <h5>Links</h5>
          <ul class="list-unstyled ml-3">
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/sitemap/">Sitemap</nuxt-link></li>
            <li>
              <nuxt-link to="/disclaimer/">{{ $t('免責事項等') }}</nuxt-link>
            </li>
          </ul>
        </b-col>
        <b-col>
          <h5>Main</h5>
          <ul class="list-unstyled ml-3">
            <li><nuxt-link to="/apps/">Apps</nuxt-link></li>
            <li><nuxt-link to="/blog/">Blog</nuxt-link></li>
            <li><nuxt-link to="/opendata/">Opendata</nuxt-link></li>
          </ul>
        </b-col>
        <b-col>
          <h5>Social</h5>
          <ul class="list-unstyled ml-3">
            <li>
              <external-link to="https://twitter.com/a01sa01to">
                <b-icon-twitter /> Twitter
              </external-link>
            </li>
            <li>
              <external-link to="https://www.instagram.com/a01sa01to">
                <b-icon-instagram /> Instagram
              </external-link>
            </li>
            <li>
              <external-link to="https://github.com/a01sa01to">
                <b-icon-github /> GitHub
              </external-link>
            </li>
          </ul>
        </b-col>
      </b-row>
      <hr />
      <p id="copyright">
        Copyright &copy; 2020 - {{ thisYear }} Asa All Rights Reserved.
      </p>
    </b-container>
  </footer>
</template>
<script lang="ts">
import Vue from 'vue'
import { BIconTwitter, BIconInstagram, BIconGithub } from 'bootstrap-vue'

export default Vue.extend({
  components: {
    BIconTwitter,
    BIconInstagram,
    BIconGithub,
  },
  data() {
    return {
      thisYear: new Date().getFullYear(),
    }
  },
})
</script>
<style lang="scss" scoped>
footer {
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 1rem;
  box-shadow: 0 -0.5rem 1rem rgba(0, 0, 0, 0.15);
  p#copyright {
    font-size: 0.9rem;
    text-align: center;
    margin: 0.2rem;
  }
}
</style>
