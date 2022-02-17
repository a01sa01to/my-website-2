<template>
  <div class="tweet-embed">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card :bg-variant="variant" :text-variant="invVariant">
          <template #header>
            <b-skeleton type="avatar" :variant="invVariant" />
            <span class="pl-3"> Loading a Tweet... </span>
            <b-icon-twitter class="twitter-icon" />
          </template>
          <div class="card-twitter-text">
            <b-skeleton width="85%" />
            <b-skeleton width="55%" />
            <b-skeleton width="70%" />
          </div>
          <div class="card-meta">
            <b-skeleton width="50%" />
            <b-icon-info-circle />
          </div>

          <template #footer>
            <b-icon-heart />
            <b-skeleton width="15%" />
          </template>
        </b-card>
      </template>
    </b-skeleton-wrapper>
  </div>
</template>
<script lang="ts">
import { BIconHeart, BIconInfoCircle, BIconTwitter } from 'bootstrap-vue'
import Vue from 'vue'

export default Vue.extend({
  props: {
    tweetid: {
      type: String,
      required: true,
    },
  },
  components: {
    BIconTwitter,
    BIconHeart,
    BIconInfoCircle,
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    variant() {
      return this.$colorMode.value === 'dark' ? 'dark' : 'light'
    },
    invVariant() {
      return this.$colorMode.value === 'dark' ? 'secondary' : 'dark'
    },
  },
  mounted() {
    ;(window as any).twttr.ready((twttr: any) => {
      twttr.widgets
        .createTweet(this.tweetid, this.$el, {
          theme: this.$colorMode.value === 'dark' ? 'dark' : 'light',
        })
        .then((_el: any) => {
          ;(this as any).loading = false
        })
    })
  },
})
</script>

<style lang="scss" scoped>
.tweet-embed {
  .b-skeleton-wrapper {
    max-width: 400px;
    .card {
      width: 100%;
      border-color: var(--border-color);
      .card-header {
        .b-skeleton,
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .twitter-icon {
          margin: auto;
          float: right;
          font-size: 1.2rem;
        }
      }
      .card-twitter-text .b-skeleton-text {
        height: 1.3rem;
      }
      .card-meta {
        margin-top: 1.5rem;
        display: flex;
        justify-content: space-between;
        .b-skeleton,
        .bi-info-circle {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .card-footer {
        .bi-heart,
        .b-skeleton {
          display: inline-block;
          vertical-align: middle;
          margin: 0.3rem;
        }
      }
    }
  }
}
</style>
