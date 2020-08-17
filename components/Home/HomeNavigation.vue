<template>
  <div class="home-navigation">
    <div class="home-border-layer" />
    <ul class="home-navigation">
      <li v-for="link in links" :key="link.text" class="home-navigation-item">
        <nuxt-link :to="link.url" class="home-navigation-link">
          {{ $t(`navigation.${link.text}`) }}
        </nuxt-link>
      </li>

      <li class="home-navigation-item">
        <a
          class="home-navigation-link"
          rel="noopener"
          href="https://github.com/datyayu"
          target="_blank"
        >
          Github
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { text: "blog", url: "/blog" },
        { text: "projects", url: "/projects" },
        { text: "experiments", url: "/experiments" },
        { text: "about", url: "/about" },
      ],
    }
  },
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
  font-size: 3rem;
  z-index: 2;
  box-sizing: border-box;
}

.home-navigation-item {
  margin: 0 0 0.5em 0;
  will-change: transform;
  transition: transform 200ms ease-in-out;
  overflow: hidden;
  box-sizing: border-box;
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
  height: 100vh;
  overflow: hidden;
  transition: border 200ms ease-in-out;
  border-bottom: 13em solid white;
  border-left: 30em solid transparent;
  z-index: -1;
}

/* Tablet */
@media screen and (min-width: 480px) {
  .home-navigation {
    text-align: right;
    padding: 0.5em 10vw;
  }

  ul.home-navigation {
    padding: 0.5em 15vw;
  }

  .home-border-layer {
    border-bottom: 14em solid white;
  }
}

/* Desktop */
@media screen and (min-width: 830px) {
  .home-navigation {
    padding: 0em 3vw 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  ul.home-navigation {
    padding: 4em 5vw 0;
  }

  .home-navigation-item {
    margin: 0;
  }

  .home-navigation-item:hover {
    transform: scale(1.05) translateX(-0.75em);
  }

  .home-navigation-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .home-border-layer {
    border-bottom: 15em solid white;
    border-left: 15em solid transparent;
  }
}

/* HD Desktop */
@media screen and (min-width: 1025px) {
  ul.home-navigation,
  .home-navigation {
    padding: 0em 1vw 0;
  }

  .home-border-layer {
    border-bottom: 20em solid white;
    border-left: 17em solid transparent;
    bottom: -0.5em;
    overflow: hidden;
  }
}

/* +HD Desktop */
@media screen and (min-width: 1400px) {
  ul.home-navigation,
  .home-navigation {
    padding: 0.5em 0.5em 0 1em;
  }
}

@media screen and (min-width: 1024px) and (min-height: 1366px) {
  .home-border-layer {
    border-bottom: 28em solid white;
    border-left: 15em solid transparent;
  }
}

@media screen and (min-width: 1400px) and (min-height: 1000px) {
  ul.home-navigation,
  .home-navigation {
    padding: 0.5em 0.5em 0 1em;
  }
}
</style>
