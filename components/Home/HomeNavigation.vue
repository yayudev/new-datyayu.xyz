<template>
  <ul class="home-navigation">
    <div class="home-border-layer"></div>

    <li v-for="link in links" class="home-navigation-item">
      <nuxt-link class="home-navigation-link" :to="link.url">{{ $t(`navigation.${link.text}`) }}</nuxt-link>
    </li>

    <li class="home-navigation-item">
      <a class="home-navigation-link" rel="noopener" href="https://github.com/datyayu" target="_blank"> Github </a>
    </li>
  </ul>
</template>


<script>
  export default {
    data () {
      return {
        links: [
          { text: 'blog', url: '/blog' },
          { text: 'projects', url: '/projects' },
          { text: 'experiments', url: '/experiments' },
          { text: 'about', url: '/about' }
        ]
      }
    }
  }
</script>

<style>
/* Base */
    .home-navigation {
        width: auto;
        position: relative;
        align-self: flex-end;
        list-style: none;
        text-align: right;
        padding: 0;
        margin: 0;
        width: 100vw;
        text-align: center;
        font-size: 3em;
        z-index: 2;
        box-sizing: border-box;
    }

    .home-navigation-item {
        margin: .6em 0;
        will-change: transform;
        transition: transform 200ms ease-in-out;
        overflow: hidden;
        box-sizing: border-box;
    }

    .home-navigation-item:hover {
        transform: scale(1.05) translateX(-.75em);
    }

    .home-navigation-item:last-child {
        margin-bottom: 0;
        padding-bottom: 1em;
    }

    .home-navigation-link {
        text-decoration: none;
        color: #20c0b1;
        text-transform: uppercase;
        box-sizing: border-box;
    }

    .home-border-layer {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 0;
        height: 100vh;
        overflow: hidden;
        transition: border 200ms ease-in-out;
        border-bottom: 14em solid white;
        border-left: 30em solid transparent;
    }


/* Tablet */
    @media screen and (min-width: 480px) {
        .home-navigation {
            text-align: right;
            padding: .5em 10vw;
        }

        .home-border-layer {
            border-bottom: 14em solid white;
        }
    }

/* Desktop */
    @media screen and (min-width: 830px) {
        .home-navigation {
            padding: 0em 5vw;
        }

        .home-border-layer {
            border-bottom: 15em solid white;
            border-left: 15em solid transparent;
        }
    }

/* HD Desktop */
    @media screen and (min-width: 1025px) {
        .home-navigation {
            padding: 0em 1em;
        }

        .home-border-layer {
            border-bottom: 17em solid white;
            border-left: 15em solid transparent;
        }
    }
</style>
