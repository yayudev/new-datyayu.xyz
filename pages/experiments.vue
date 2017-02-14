<template>
  <div>
    <site-header
      bg-image="/images/bg.png"
      header-title="TEST"
      header-subtitle="A colllection of small learning experiments using the latest technologies availables for the web."
      header-color="red"
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
    }
  }
</script>
