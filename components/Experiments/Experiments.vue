<template>
  <div class="experiments">
    <div class="experiments-list">
      <experiments-item v-for="(experiment, index) in experiments"
        :key="index"
        :url="experiment.url"
        :title="experiment.title"
        :img="experiment.img"
        @showModal="showModal"
      ></experiments-item>
    </div>

    <experiments-modal v-if="isModalActive"
      :url="activeModalExperiment.url"
      @closeModal="closeModal"
    ></experiments-modal>
  </div>
</template>


<script>
  import ExperimentsItem from './ExperimentsItem.vue'
  import ExperimentsModal from './ExperimentsModal.vue'

  export default {
    components: {
      ExperimentsItem,
      ExperimentsModal
    },

    data () {
      return {
        isModalActive: false,
        activeModalExperiment: {}
      }
    },

    computed: {
      experiments () {
        return this.$t('experiments.experiments')
      }
    },

    methods: {
      showModal (experimentInfo) {
        this.isModalActive = true
        this.activeModalExperiment = experimentInfo
      },

      closeModal () {
        this.isModalActive = false
        this.activeModalExperiment = {}
      }
    }
  }
</script>


<style>
/* Base */
  .experiments {
    margin: 2em 0 4em;
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
