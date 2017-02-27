<template>
  <nuxt-child></nuxt-child>
</template>

<script>
  export default {
    transition: 'content',
    head () {
      return {
        meta: [
          { name: 'theme-color', content: '#00BF13' }
        ]
      }
    }
  }
</script>
