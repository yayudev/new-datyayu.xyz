<template>
  <i class="navigation-button" :class="activeClass" @click="$emit('click')">
    <span class="navigation-button-line"></span>
    <span class="navigation-button-line"></span>
    <span class="navigation-button-line"></span>
  </i>
</template>

<script>
export default {
  props: {
    isActive: { type: Boolean, default: false }
  },

  computed: {
    activeClass() {
      return this.isActive ? "is-active" : "";
    }
  }
};
</script>


<style scoped>
/* Base */

.navigation-button {
  position: absolute;
  display: block;
  top: .5em;
  left: 1em;
  z-index: 9;
}

.navigation-button-line {
  cursor: pointer;
  width: 2.25em;
  height: .3em;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  display: block;
  transition: transform 300ms ease-in-out,
  opacity 300ms ease-in-out;
  transform: none;
  will-change: transform, opacity;
}

.navigation-button-line:nth-child(1) {
  top: .5em;
}

.navigation-button-line:nth-child(2) {
  top: 1.25em;
}

.navigation-button-line:nth-child(3) {
  top: 2em;
}

.is-active>.navigation-button-line:nth-child(2) {
  transform: translateX(calc(100vw - 4em));
  opacity: 0;
}

.is-active>.navigation-button-line:nth-child(1) {
  transform: translateX(calc(100vw - 4em)) rotateZ(45deg);
  top: 1.25em;
}

.is-active>.navigation-button-line:nth-child(3) {
  transform: translateX(calc(100vw - 4em)) rotateZ(-45deg);
  top: 1.25em;
}





/* Desktop */

@media screen and (min-width: 780px) {
  .navigation-button {
    display: none;
  }
}
</style>
