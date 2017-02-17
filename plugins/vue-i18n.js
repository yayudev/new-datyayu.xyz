import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locales from '../i18n'

Vue.use(VueI18n)
Vue.config.lang = 'en'

Object.keys(locales)
  .forEach(lang => {
    Vue.locale(lang, locales[lang])
  })
