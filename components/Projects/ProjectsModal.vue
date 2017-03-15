<template>
  <div class="projects-modal" @click="closeModal">
    <iframe v-if="isIframe" class="projects-modal-iframe" :src="url" @click.stop></iframe>

    <projects-modal-image-gallery
      v-if="!isIframe"
      :imagePrefix="imagePrefix"
    >
    </projects-modal-image-gallery>

    <div class="projects-modal-content"  @click.stop>
      <h2 class="projects-modal-title"> {{ name }} </h2>
      <h4 class="projects-modal-date"> {{ date }} </h4>
      <a class="projects-link" :href="url" target="_blank" @click.stop> < Link > </a>
      <p class="projects-modal-description"> {{ description }} </p>
    </div>
  </div>
</template>


<script>
  import ProjectsModalImageGallery from './ProjectsModalImageGallery.vue'

  export default {
    components: {
      ProjectsModalImageGallery
    },

    props: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String, required: true },
      isIframe: { type: Boolean, default: false },
      url: { type: String, default: '' },
      imagePrefix: { type: String, required: true }
    },

    methods: {
      closeModal () {
        this.$emit('closeModal')
      }
    }
  }
</script>


<style>
  .projects-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9;
    background: rgba(0,0,0,.5);
    padding: 10vh 10vw;
    display: flex;
    cursor: pointer;
  }

  .projects-modal-iframe {
    width: 50vw;
    height: 80vh;
    background: white;
    border: none;
    box-sizing: border-box;
    cursor: auto;
  }

  .projects-modal-content {
    width: 30vw;
    height: 80.1vh;
    padding: 0 2em;
    box-sizing: border-box;
    background: white;
    text-align: center;
    cursor: auto;
  }

  .projects-modal-title {
    font-size: 2em;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    color: #3571c5;
    margin: 1em 0 0 0;
  }

  .projects-modal-date {
    font-weight: normal;
    color: #b8b9b9;
    margin: 0 0 1em 0;
  }
</style>
