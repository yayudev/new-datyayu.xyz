<template>
  <section class="error-container">
    <site-header
      header-color="red"
      :header-title="errorTitle"
      :header-subtitle="errorSubtitle"
    ></site-header>

    <div class="error-text">
      <h3 class="error-info"> {{ $t('error.error') }} </h3>
      <h2 class="error-code red"> {{ error.statusCode }} </h2>
    </div>
  </section>
</template>
<script>
import SiteHeader from '~components/SiteHeader/SiteHeader.vue'

export default {
  props: ['error'],

  components: {
    SiteHeader
  },

  computed: {
    errorTitle () {
      return this.$t('error.title')
    },
    errorSubtitle () {
      return this.$t('error.subtitle')
    }
  }
}
</script>


<style>
  .error-container {
    width: 100%;
  }

  .error-text {
    width: 80%;
    margin: 0 auto;
  }

  .error-info {
    white-space: pre-wrap;
  }

  .error-code {
    text-align: center;
    font-size: 5em;
    margin-top: 0;
  }
</style>
