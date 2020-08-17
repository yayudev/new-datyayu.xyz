<template>
  <div class="projects">
    <ul class="projects-list">
      <projects-item
        v-for="(project, index) in projects"
        :key="index"
        :name="project.name"
        :date="project.date"
        :url="project.url"
        :image-prefix="project.imagePrefix"
        :description="project.description"
        :github="project.github"
        :is-iframe="project.isIframe"
        @showModal="showModal"
      />

      <projects-modal
        v-if="modalIsActive"
        :name="activeProject.name"
        :description="activeProject.description"
        :date="activeProject.date"
        :url="activeProject.url"
        :github="activeProject.github"
        :image-prefix="activeProject.imagePrefix"
        :is-iframe="activeProject.isIframe"
        @closeModal="closeModal"
      />
    </ul>
  </div>
</template>

<script>
import ProjectsItem from "./ProjectsItem.vue"
import ProjectsModal from "./ProjectsModal.vue"

export default {
  components: {
    ProjectsItem,
    ProjectsModal,
  },

  data() {
    return {
      modalIsActive: false,
      activeProject: {},
    }
  },

  computed: {
    projects() {
      return this.$t("projects.projects")
    },
  },

  methods: {
    showModal(activeProject) {
      this.modalIsActive = true
      this.activeProject = activeProject
    },

    closeModal() {
      this.modalIsActive = false
      this.activeProject = {}
    },
  },
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
