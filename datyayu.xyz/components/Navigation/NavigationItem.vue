<template>
  <li class="navigation-item">
    <a class="navigation-link" :class="linkClasses" :href="url"> {{ text }} </a>
  </li>
</template>


<script>
  export default {
    props: {
      hoverColor: { type: String, required: true },
      url: { type: String, required: true },
      text: { type: String, required: true }
    },

    computed: {
      activeClass () {
        if (this.url === '/') return ''

        const currentPath = this.$route.fullPath
        const linkShouldBeActive = currentPath.startsWith(this.url)

        return linkShouldBeActive ? `${this.hoverColor}-active` : ''
      },

      linkClasses () {
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
    transform: scale(1.2) translateX(.5em);
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

  .gray:hover { color: #b8b9b9; }
  .green:hover { color: #00BF13; }
  .blue:hover { color: #6591f5; }
  .red:hover { color: #FF2121; }
  .orange:hover { color: #FF9204; }

  .gray-active { color: #b8b9b9; }
  .green-active { color: #00BF13; }
  .blue-active { color: #6591f5; }
  .red-active { color: #FF2121; }
  .orange-active { color: #FF9204; }

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
