import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locales from '../i18n'

Vue.use(VueI18n)

// Try to get the locale stored on localStorage.
let locale = 'en'
if (process.BROWSER_BUILD) {
  locale = localStorage.getItem('locale') || 'en'
}

// Create the vue-i18n instance.
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages: {
    'en': locales.en,
    'es': locales.es
  }
})

// Export the instance for nuxt.
export default i18n
