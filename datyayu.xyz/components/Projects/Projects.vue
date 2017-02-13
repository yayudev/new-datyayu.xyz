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

    data () {
      const testProject =
        {
          name: 'Weetrack 2.0',
          date: '2014 - Current',
          imagePrefix: 'weetrack2',
          url: 'http://track.datyayu.xyz/',
          description: `
            An automated anime release tracker build using react,
            redux and SASS for the frontend. The backend is written
            in node.js using ES6, and part of the logic for listening
            the rss feeds which uses as data source, was extracted
            onto a published npm module (feed-watcher) to help other
            people to deal with that problem.
          `
        }

      const projects = [testProject]
        .concat(testProject)
        .concat(testProject)
        .concat(testProject)
        .concat(testProject)
        .concat(testProject)

      return {
        projects
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
