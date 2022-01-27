<template>
  <div class="nextcontainer">
    <span class="next"></span>
  </div>
</template>

<style lang="scss" scoped>
.nextcontainer {
  position: relative;
  height: 5rem;
  width: 100%;
  margin: 2rem 0;
  .next {
    position: absolute;
    bottom: 15%;
    left: calc(50% - 1.5rem);
    display: block;
    width: 3rem;
    height: 3rem;
    border-bottom: 0.2rem solid var(--text-color);
    border-left: 0.2rem solid var(--text-color);
    animation: nextArrow 3000ms infinite;
  }
}

@keyframes nextArrow {
  0% {
    opacity: 0;
    transform: translateY(-4rem) scale(1) rotate(-45deg);
  }

  50% {
    opacity: 1;
    transform: translateY(-2rem) scale(1) rotate(-45deg);
  }

  100% {
    opacity: 0;
    transform: translateY(0rem) scale(1) rotate(-45deg);
  }
}
</style>
