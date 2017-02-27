<template>
  <Home></Home>
</template>

<script>
  import Home from '~components/Home/Home.vue'

  export default {
    layout: 'home',
    transition: 'home',

    components: {
      Home
    },

    head () {
      return {
        title: this.$t('home.title'),
        meta: [
          { name: 'theme-color', content: '#20c0b1' },
          { property: 'og:title', content: this.$t('home.title') },
          { property: 'og:description', content: this.$t('home.subtitle') },
          { property: 'og:url', content: 'https://datyayu.xyz/' }
        ]
      }
    }
  }
</script>
