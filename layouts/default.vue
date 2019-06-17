<template>
  <div class="default-layout">
    <nuxt />

    <site-footer />
  </div>
</template>

<script>
import SiteFooter from "~/components/SiteFooter/SiteFooter.vue"

export default {
  components: {
    SiteFooter
  }
}
</script>

<style>
.default-layout {
  height: 100vh;
  min-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
