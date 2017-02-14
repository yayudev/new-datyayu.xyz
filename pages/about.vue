<template>
  <div>
    <site-header
      bg-image="/images/bg.png"
      header-title="ME"
      header-subtitle="Some info about me"
      header-color="orange"
    ></site-header>
    <about></about>
  </div>
</template>


<script>
  import About from '~components/About/About.vue'
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'

  export default {
    components: {
      About,
      SiteHeader
    }
  }
</script>
