import Vue from 'vue'

export const state = {
  lang: 'en'
}

export const mutations = {
  setLang (state, lang) {
    state.lang = lang
    Vue.config.lang = lang
  }
}

export const getters = {
  lang: state => state.lang
}
