<template>
  <div>
    <site-header
      header-color="orange"
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
    ></site-header>

    <div class="site-content">
      <about></about>
    </div>
  </div>
</template>


<script>
  import About from '~components/About/About.vue'
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'

  export default {
    transition: 'content',

    components: {
      About,
      SiteHeader
    },

    head () {
      return {
        title: this.pageTitle,
        meta: [
          { name: 'theme-color', content: '#FF9204' },
          { property: 'og:title', content: this.pageTitle },
          { property: 'og:description', content: this.pageSubtitle },
          { property: 'og:url', content: 'https://datyayu.xyz/about' }
        ]
      }
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
