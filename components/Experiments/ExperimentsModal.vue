<template>
  <div class="experiments-modal" @click="closeModal">
    <modal-close-button @click="closeModal" />

    <iframe :src="url" class="experiments-modal-iframe" @click.stop />
  </div>
</template>

<script>
import ModalCloseButton from "../Shared/ModalCloseButton.vue"

export default {
  components: {
    ModalCloseButton,
  },

  props: {
    url: { type: String, required: true },
  },

  methods: {
    closeModal() {
      this.$emit("closeModal")
    },
  },
}
</script>

<style>
.experiments-modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 10;
  cursor: pointer;
}

.experiments-modal-iframe {
  height: 80vh;
  margin: 10vh 10vw;
  width: 80vw;
  background: white;
  box-sizing: border-box;
  cursor: auto;
}
</style>
