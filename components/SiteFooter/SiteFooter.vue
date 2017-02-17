<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-links">
        {{ $t('footer.langChange') }}:
          <span @click="setLang('es')" class="footer-link" :class="esClass"> Español </span>
        /
          <span @click="setLang('en')" class="footer-link" :class="enClass"> English </span>
      </p>

      <p class="footer-legal">
        Copyright © 2017 Arturo Coronel.
        {{ $t('footer.buildWith') }}
        <a class="footer-link" href="https://vuejs.org/" target="_blank">Vue.js</a>,
        <a class="footer-link" href="https://nuxtjs.org/" target="_blank">Nuxt.js</a>
        {{ $t('footer.and') }}
        ♥.
      </p>
    </div>
  </footer>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({ lang: 'i18n/lang' }),

      esClass () {
        return this.lang === 'es' ? 'footer-link--active' : ''
      },

      enClass () {
        return this.lang === 'en' ? 'footer-link--active' : ''
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
  .footer {
    border-top: 1px solid #b8b9b9;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5em;
  }

  .footer-content {
    text-align: center;
    color: #3b3b3b;
  }

  .footer-link {
    color: #6591f5;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
  }

  .footer-link:hover {
    text-decoration: underline;
  }

  .footer-link--active {
    color: #3b3b3b;
    cursor: auto;
  }

  .footer-link--active:hover {
    text-decoration: none;
  }
</style>
