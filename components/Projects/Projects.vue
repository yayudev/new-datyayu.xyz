<template>
  <div class="projects">
    <ul class="projects-list">
      <projects-item v-for="project in projects"
        :name="project.name"
        :date="project.date"
        :url="project.url"
        :imagePrefix="project.imagePrefix"
        :description="project.description"
        :isIframe="project.isIframe"
        @showModal="showModal"
      ></projects-item>

      <projects-modal v-if="modalIsActive"
        :name="activeProject.name"
        :description="activeProject.description"
        :date="activeProject.date"
        :url="activeProject.url"
        :imagePrefix="activeProject.imagePrefix"
        :isIframe="activeProject.isIframe"
        @closeModal="closeModal"
      ></projects-modal>
    </ul>
  </div>
</template>


<script>
  import ProjectsItem from './ProjectsItem.vue'
  import ProjectsModal from './ProjectsModal.vue'

  export default {
    components: {
      ProjectsItem,
      ProjectsModal
    },

    data () {
      return {
        modalIsActive: false,
        activeProject: {}
      }
    },

    computed: {
      projects () {
        return this.$t('projects.projects')
      }
    },

    methods: {
      showModal (activeProject) {
        this.modalIsActive = true
        this.activeProject = activeProject
      },

      closeModal () {
        this.modalIsActive = false
        this.activeProject = {}
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
