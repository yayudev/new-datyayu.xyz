<template>
  <nuxt-link :active-class="activeClass" :to="url" class="navigation-item" tag="li">
    <a :class="linkClasses" class="navigation-link">
      {{ $t(`navigation.${text}`) }}
    </a>
  </nuxt-link>
</template>


<script>
export default {
  props: {
    hoverColor: { type: String, required: true },
    url: { type: String, required: true },
    text: { type: String, required: true }
  },

  computed: {
    activeClass() {
      return `${this.hoverColor}-active`
    },

    linkClasses() {
      return `${this.hoverColor} ${this.activeClass}`
    }
  }
}
</script>


<style scoped>
/* Base */

.navigation-item {
  text-transform: uppercase;
  padding: 0;
  font-size: 1.3em;
  transition: transform 100ms ease-in-out;
  will-change: transform;
  max-width: 50vw;
  box-sizing: border-box;
}

.navigation-item:hover {
  transform: scale(1.2) translateX(0.5em);
}

.navigation-link {
  text-decoration: none;
  color: white;
  height: 2em;
  display: flex;
  padding: 1em;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
}

.gray:hover {
  color: #b8b9b9;
}

.green:hover {
  color: #01d215;
}

.blue:hover {
  color: #729dff;
}

.purple:hover {
  color: #bdabff;
}

.orange:hover {
  color: #ffc272;
}

.gray-active a {
  color: #b8b9b9;
}

.green-active a {
  color: #01d215;
}

.blue-active a {
  color: #729dff;
}

.purple-active a {
  color: #bdabff;
}

.orange-active a {
  color: #ffc272;
}

/* Tablet */

@media screen and (min-width: 480px) {
  .navigation-item:hover {
    transform: scale(1.2) translateX(1em);
  }
}

/* Desktop */

@media screen and (min-width: 780px) {
  .navigation-item:hover {
    transform: scale(1.2);
  }
}
</style>
