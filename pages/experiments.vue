<template>
  <div>
    <site-header
      bg-image="/images/bg.png"
      header-color="purple"
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
    ></site-header>

    <div class="site-content">
      <experiments></experiments>
    </div>
  </div>
</template>


<script>
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'
  import Experiments from '~components/Experiments/Experiments.vue'

  export default {
    transition: 'content',

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
