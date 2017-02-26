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
        title: this.pageTitle
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
