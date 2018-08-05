<template>
  <span :class="animationClass" class="caret custom" />
</template>

<script>
const ANIMATION_CLASS_PREFIX = "vue-typer-caret-"

export default {
  props: {
    /**
     * Caret animation similar to Sublime and VSCode: "solid", "blink", "smooth", "phase", "expand".
     */
    animation: {
      type: String,
      default: "blink",
      validator: value =>
        /^solid$|^blink$|^smooth$|^phase$|^expand$/.test(value)
    }
  },
  computed: {
    animationClass() {
      return ANIMATION_CLASS_PREFIX + this.animation
    }
  }
}
</script>

<style scoped>
span.caret:empty:before {
  content: "\200b";
  /* zero width space character */
}

/* Keep the following .custom.caret styles as low-specificity as possible so they are more easily overridden */

span {
  display: inline-block;
  width: 1px;
}

.idle {
  background-color: #ddd;
}

.typing {
  background-color: #ddd;
}

.selecting {
  display: none;
  background-color: #ddd;
}

.erasing {
  background-color: #ddd;
}

.complete {
  display: none;
  background-color: #ddd;
}

@keyframes vue-typer-caret-blink {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes vue-typer-caret-smooth {
  0%,
  20% {
    opacity: 1;
  }
  60%,
  100% {
    opacity: 0;
  }
}

@keyframes vue-typer-caret-phase {
  0%,
  20% {
    opacity: 1;
  }
  90%,
  100% {
    opacity: 0;
  }
}

@keyframes vue-typer-caret-expand {
  0%,
  20% {
    transform: scaleY(1);
  }
  80%,
  100% {
    transform: scaleY(0);
  }
}

.vue-typer-caret-blink {
  animation: vue-typer-caret-blink 1s step-start 0s infinite;
}

.vue-typer-caret-smooth {
  animation: vue-typer-caret-smooth 0.5s ease-in-out 0s infinite alternate;
}

.vue-typer-caret-phase {
  animation: vue-typer-caret-phase 0.5s ease-in-out 0s infinite alternate;
}

.vue-typer-caret-expand {
  animation: vue-typer-caret-expand 0.5s ease-in-out 0s infinite alternate;
}
</style>
