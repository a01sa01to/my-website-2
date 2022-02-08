<template>
  <div class="item">
    <div class="time">
      <span id="year">{{ year }}</span>
      <span id="month">{{ month }}</span>
    </div>
    <p class="bio">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    year: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
div.item {
  display: grid;
  grid-template-areas: 'time . bio';
  padding: 0.5rem;
  grid-template-rows: auto;
  grid-template-columns: 2rem 0 1fr;
  border-bottom: 1px solid var(--border-color);
  gap: 1rem;

  div.time {
    display: grid;
    grid-area: time;
    grid-template-areas: 'yr' 'mo';
    grid-template-rows: 0.8rem 1fr;
    width: 2rem;
    height: 2rem;
    color: var(--text-color);
    gap: 0;
    text-align: center;

    span#year {
      display: inline-block;
      grid-area: yr;
      margin-bottom: 0;
      font-size: 0.8rem;
      font-weight: 700;
    }

    span#month {
      display: inline-block;
      grid-area: mo;
      margin-top: 0;
      font-size: 1.2rem;
      font-weight: 700;
    }
  }

  p.bio {
    grid-area: bio;
    width: 100%;
    text-align: left;
  }
}
</style>
