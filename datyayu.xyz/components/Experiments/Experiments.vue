<template>
  <div class="experiments">
    <div class="experiments-list">
      <experiments-item v-for="experiment in experiments"
        :url="experiment.url"
        :title="experiment.title"
        :img="experiment.img"
      ></experiments-item>
    </div>
  </div>
</template>


<script>
  import ExperimentsItem from './ExperimentsItem.vue'

  export default {
    components: {
      ExperimentsItem
    },

    data () {
      const experiment = {
        img: '/images/weetrack2-desktop.png',
        title: 'Experiment #123',
        url: '#'
      }

      return {
        experiments: [experiment]
          .concat(experiment)
          .concat(experiment)
          .concat(experiment)
          .concat(experiment)
          .concat(experiment)
          .concat(experiment)
          .concat(experiment)
          .concat(experiment)
      }
    }
  }
</script>


<style>
/* Base */
  .experiments {
    margin-top: 2em;
   }

  .experiments-list {
    padding: 0;
    list-style: none;
    width: 80vw;
    max-width: 900px;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

/* HD Desktop */
  @media screen and (min-width: 1025px) {
    .experiments-list {
      max-width: 1200px;
    }
  }
</style>
