<template>
  <div class="home-lang-links">
    <span @click="setLang('es')" class="home-lang-link" :class="esClass"> ES </span>
    /
    <span @click="setLang('en')" class="home-lang-link" :class="enClass"> EN </span>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({ lang: 'i18n/lang' }),

      esClass () {
        return this.lang === 'es' ? 'home-lang-link--active' : ''
      },

      enClass () {
        return this.lang === 'en' ? 'home-lang-link--active' : ''
      }
    },

    methods: {
      setLang (lang) {
        if (lang === this.lang) {
          return
        }

        this.$store.commit('i18n/setLang', lang)
      }
    }
  }
</script>


<style>
  .home-lang-links {
    position: absolute;
    top: .5em;
    right: .5em;
    z-index: 2;
    font-size: 1.5em;
    color: white;
  }

  .home-lang-link {
    cursor: pointer;
  }

  .home-lang-link--active {
    color: #20c0b1;
  }

/* Desktop */
  @media screen and (min-width: 830px) {
    .home-lang-links {
      bottom: .5em;
      left: .5em;
      right: auto;
      top: auto;
    }
  }
</style>
