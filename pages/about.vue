<template>
  <div>
    <site-header
      bg-image="/images/bg.png"
      header-color="orange"
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
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
    },

    computed: {
      pageTitle () {
        return this.$t('about.title')
      },

      pageSubtitle () {
        return this.$t('about.subtitle')
      }
    }
  }
</script>
