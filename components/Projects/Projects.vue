<template>
  <div class="projects">
    <ul class="projects-list">
      <projects-item v-for="project in projects"
        :name="project.name"
        :date="project.date"
        :url="project.url"
        :imagePrefix="project.imagePrefix"
        :description="project.description"
      ></projects-item>
    </ul>
  </div>
</template>


<script>
  import ProjectsItem from './ProjectsItem.vue'

  export default {
    components: {
      ProjectsItem
    },

    computed: {
      projects () {
        return this.$t('projects.projects')
      }
    }
  }
</script>


<style>
  .projects {
    width: 90vw;
    max-width: 800px;
    margin: 0 auto;
  }

  .projects-list {
    padding: 0;
    overflow: hidden;
  }
</style>
