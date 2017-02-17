<template>
  <div>
    <nav class="navigation" :class="activeClass">
      <ul class="navigation-list">
        <navigation-item
            v-for="link in links"
            :text="link.text"
            :url="link.url"
            :hover-color="link.hoverColor"
        ></navigation-item>
      </ul>
    </nav>

    <navigation-button @click="toggleActive" :is-active="isActive"></navigation-button>
  </div>
</template>


<script>
  import NavigationButton from './NavigationButton.vue'
  import NavigationItem from './NavigationItem.vue'

  export default {
    components: {
      NavigationItem,
      NavigationButton
    },

    data () {
      return {
        isActive: false,
        links: [
          { text: 'home', url: '/', hoverColor: 'gray' },
          { text: 'blog', url: '/blog', hoverColor: 'green' },
          { text: 'projects', url: '/projects', hoverColor: 'blue' },
          { text: 'experiments', url: '/experiments', hoverColor: 'red' },
          { text: 'about', url: '/about', hoverColor: 'orange' }
        ]
      }
    },

    computed: {
      activeClass () {
        return this.isActive ? 'is-active' : ''
      }
    },

    methods: {
      toggleActive () {
        this.isActive = !this.isActive
      }
    }
  }
</script>


<style>
/* Base */
  .navigation {
    color: white;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    width: 50vw;
    height: 100vh;
    background: #3b3b3b;
    box-shadow: 0px 0px 6px 2px black;
    transition: transform 250ms ease-in-out;
    transform: translateX(-55vw);
    will-change: transform;
  }

  .navigation:after {
    content: "";
    width: 150vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 50vw;
    opacity: 0;
    background: rgba(0,0,0, .4);
    transform: translateX(155vw);
    will-change: transform, opacity;
    transition: opacity 300ms ease-in-out;
  }

  .navigation.is-active {
    transform: translateX(0);
  }

  .navigation.is-active:after {
    content: "";
    opacity: 1;
    transform: translateX(0);
  }

  .navigation-list {
    list-style: none;
    margin: 0 auto;
    padding: 1em 0;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }

/* Desktop */
  @media screen and (min-width: 780px) {
    .navigation {
      background: none;
      box-shadow: none;
      transform: none;
      position: absolute;
      right: 0;
      top: 0;
      height: auto;
      width: 100%;
    }

    .navigation.is-active:after {
      content: none;
    }

    .navigation-list {
      justify-content: space-between;
      flex-direction: row;
      margin: 0 auto;
      width: 600px;
    }
  }

/* HD Desktop */
  @media screen and (min-width: 1025px) {
    .navigation {
      width: auto;
      right: 2em;
    }

    .navigation-list {
      margin: 0 0 0 auto;
    }
  }
</style>
