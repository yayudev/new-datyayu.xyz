<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-links">
        {{ $t('footer.localeChange') }}:
          <span @click="setLocale('es')" class="footer-link" :class="esClass"> Español </span>
        /
          <span @click="setLocale('en')" class="footer-link" :class="enClass"> English </span>
      </p>

      <p class="footer-legal">
        {{ $t('footer.buildWith') }}
        <a class="footer-link" rel="noopener" href="https://nuxtjs.org/" target="_blank">Nuxt.js</a>
        <span>, </span>
        <a class="footer-link" rel="noopener" href="https://www.netlify.com/" target="_blank">Netlify</a>
        {{ $t('footer.and') }}
        ♥.
        {{ $t('footer.repo') }}
        <a class="footer-link" rel="noopener" href="https://github.com/datyayu/new-datyayu.xyz" target="_blank"> Github</a>.
      </p>

      <p class="footer-legal">
        Copyright © 2017 Arturo Coronel.
      </p>
    </div>
  </footer>
</template>


<script>
  export default {
    computed: {

      esClass () {
        return this.$i18n.locale === 'es' ? 'footer-link--active' : ''
      },

      enClass () {
        return this.$i18n.locale === 'en' ? 'footer-link--active' : ''
      }
    },

    methods: {
      setLocale (locale) {
        if (locale === this.$i18n.locale) {
          return
        }

        this.$i18n.locale = locale
        localStorage.setItem('locale', locale)
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
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }

  .footer-link:hover {
    text-decoration: underline;
  }

  .footer-link--active {
    color: #3b3b3b;
    cursor: default;
  }

  .footer-link--active:hover {
    text-decoration: none;
  }
</style>
