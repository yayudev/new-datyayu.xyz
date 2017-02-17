<template>
  <div>
    <site-header
      bg-image="/images/bg.png"
      header-color="red"
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
    ></site-header>

    <experiments></experiments>
  </div>
</template>


<script>
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'
  import Experiments from '~components/Experiments/Experiments.vue'

  export default {
    components: {
      SiteHeader,
      Experiments
    },

    computed: {
      pageTitle () {
        return this.$t('experiments.title')
      },

      pageSubtitle () {
        return this.$t('experiments.subtitle')
      }
    }
  }
</script>
