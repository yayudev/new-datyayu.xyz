import Vue from "vue"
import VueI18n from "vue-i18n"
import locales from "../i18n"

export default ({ app }) => {
  Vue.use(VueI18n)

  // Try to get the locale stored on localStorage.
  let locale = "en"
  if (process.BROWSER_BUILD) {
    locale = localStorage.getItem("locale") || "en"
  }

  const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: "en",
    messages: {
      en: locales.en,
      es: locales.es,
    },
  })

  app.i18n = i18n
}
