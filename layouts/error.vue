<template>
  <section class="container">
    <site-header
      bg-image="/images/bg.png"
      header-color="red"
      :header-title="errorTitle"
      :header-subtitle="errorSubtitle"
    ></site-header>

    <h1 class="title"> {{ error.statusCode }} </h1>
    <h2 class="info"> {{ error.message }} </h2>

    <nuxt-link
      v-if="error.statusCode === 404"
      class="button"
      to="/"
    >
      Homepage
    </nuxt-link>
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
