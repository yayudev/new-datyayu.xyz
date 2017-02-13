<template>
  <div>
    <site-header
      bg-image="/images/bg.png"
      header-title="PROJECTS"
      header-subtitle="A collection of my favorite side-projects I've created."
      header-color="blue"
    ></site-header>

    <projects></projects>
  </div>
</template>


<script>
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'
  import Projects from '~components/Projects/Projects.vue'

  export default {
    components: {
      SiteHeader,
      Projects
    }
  }
</script>
