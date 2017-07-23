<template>
  <div class="home-locale-links">
    <span @click="setLocale('es')" class="home-locale-link" :class="esClass"> ES </span>
    /
    <span @click="setLocale('en')" class="home-locale-link" :class="enClass"> EN </span>
  </div>
</template>


<script>
export default {
  computed: {
    esClass() {
      return this.$i18n.locale === "es" ? "home-locale-link--active" : "";
    },

    enClass() {
      return this.$i18n.locale === "en" ? "home-locale-link--active" : "";
    }
  },

  methods: {
    setLocale(locale) {
      if (locale === this.$i18n.locale) {
        return;
      }

      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    }
  }
};
</script>


<style>
.home-locale-links {
  position: absolute;
  top: .5em;
  right: .5em;
  z-index: 2;
  font-size: 1.5em;
  color: white;
}

.home-locale-link {
  color: #20c0b1;
  cursor: pointer;
}

.home-locale-link--active {
  color: white;
  cursor: default;
}






/* Desktop */

@media screen and (min-width: 830px) {
  .home-locale-links {
    bottom: .5em;
    left: .5em;
    right: auto;
    top: auto;
  }
}
</style>
