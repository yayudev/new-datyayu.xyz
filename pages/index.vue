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
        title: this.$t('home.title')
      }
    }
  }
</script>
