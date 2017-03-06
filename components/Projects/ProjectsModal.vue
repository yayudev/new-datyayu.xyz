<template>
  <div class="projects-modal" @click="closeModal">
    <iframe v-if="isIframe" class="projects-modal-iframe" :src="url" @click.stop></iframe>
  </div>
</template>


<script>
  export default {
    props: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String, required: true },
      isIframe: { type: Boolean, default: false },
      url: { type: String, default: '' },
      images: { type: Array, default: () => [] }
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
    background: rgba(0,0,0,.5);
  }

  .projects-modal-iframe {
    background: white;
    width: 80vw;
    height:80vh;
    margin: 10vh 10vw;
  }
</style>
