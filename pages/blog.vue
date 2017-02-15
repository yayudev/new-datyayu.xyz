<template>
  <div>
    <site-header
      bg-image="/images/bg.png"
      header-title="BLOG"
      header-subtitle="Frontend is cool"
      header-color="green"
    ></site-header>

    <nuxt-child></nuxt-child>
  </div>
</template>


<script>
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'

  export default {
    components: {
      SiteHeader
    }
  }
</script>
