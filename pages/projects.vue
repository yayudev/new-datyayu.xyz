<template>
  <div>
    <site-header
      header-color="blue"
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
    ></site-header>

    <div class="site-content">
      <projects></projects>
    </div>
  </div>
</template>


<script>
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'
  import Projects from '~components/Projects/Projects.vue'

  export default {
    transition: 'content',

    components: {
      SiteHeader,
      Projects
    },

    head () {
      return {
        title: this.pageTitle,
        meta: [
          { name: 'theme-color', content: '#6591f5' },
          { property: 'og:title', content: this.pageTitle },
          { property: 'og:description', content: this.pageSubtitle },
          { property: 'og:url', content: 'https://datyayu.xyz/projects' }
        ]
      }
    },

    computed: {
      pageTitle () {
        return this.$t('projects.title')
      },

      pageSubtitle () {
        return this.$t('projects.subtitle')
      }
    }
  }
</script>
