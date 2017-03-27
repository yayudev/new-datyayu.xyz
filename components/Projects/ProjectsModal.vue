<template>
  <div class="projects-modal" @click="closeModal">
    <modal-close-button @click="closeModal"></modal-close-button>

    <iframe v-if="isIframe" class="projects-modal-iframe" :src="url" @click.stop></iframe>

    <projects-modal-image-gallery
      :hasIframe="isIframe"
      :imagePrefix="imagePrefix"
    >
    </projects-modal-image-gallery>

    <div class="projects-modal-content" @click.stop>
      <div class="projects-modal-info-container">
        <h2 class="projects-modal-title"> {{ name }} </h2>
        <h4 class="projects-modal-date"> {{ date }} </h4>
        <a class="projects-link" v-if="url" :href="url" target="_blank" @click.stop> < Link > </a>
        <a class="projects-link" v-if="github" :href="github" target="_blank" @click.stop> < Github > </a>
      </div>
      <p class="projects-modal-description"> {{ description }} </p>
    </div>
  </div>
</template>


<script>
  import ModalCloseButton from '../Shared/ModalCloseButton.vue'
  import ProjectsModalImageGallery from './ProjectsModalImageGallery.vue'

  export default {
    components: {
      ModalCloseButton,
      ProjectsModalImageGallery
    },

    props: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String, required: true },
      isIframe: { type: Boolean, default: false },
      url: { type: String, default: '' },
      github: { type: String, default: '' },
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
    padding: 5vh 5vw;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .projects-modal-iframe {
    display: none;
    background: white;
    border: none;
    box-sizing: border-box;
    cursor: auto;
  }

  .projects-modal-content {
    overflow-y: auto;
    width: 90vw;
    height: 45vh;
    padding: 0 2em;
    border-top: 3px solid #3571c5;
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

  .projects-modal-description {
    width: 100%;
    overflow-y: auto;
    display: flex;
    align-items: center;
    white-space: pre-line;
  }

  @media screen and (max-width: 779px) and (orientation: landscape) {
    .projects-modal-content {
      display: flex;
    }

    .projects-modal-info-container {
      width: 50%;
    }

    .projects-link {
      display: block;
    }

    .projects-modal-description {
      width: 50%;
    }
  }

/* Desktop */
  @media screen and (min-width: 780px) {
    .projects-modal {
      flex-direction: row;
      padding: 10vh 10vw;
    }

    .projects-modal-iframe {
      display: block;
      width: 50vw;
      height: 80vh;
    }

    .projects-modal-content {
      width: 30vw;
      height: 80.1vh;
      border-top: none;
    }

    .projects-modal-description {
      display: block;
      text-align: left;
    }
  }
</style>
