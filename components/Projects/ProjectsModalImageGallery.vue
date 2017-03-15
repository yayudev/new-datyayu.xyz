<template>
  <div class="image-gallery">
    <img v-if="imageIndex === 0" class="image-gallery-image" :src="phoneImage" />
    <img v-if="imageIndex === 1" class="image-gallery-image" :src="ipadImage" />
    <img v-if="imageIndex === 2" class="image-gallery-image" :src="desktopImage" />

    <div class="image-gallery-buttons">
      <a class="image-gallery-button" @click.stop="showPrevImage"> < </a>
      <a class="image-gallery-button" @click.stop="showNextImage"> > </a>
    </div>
  </div>
</template>


<script>
  import { getImageUrl } from '../../utils/image-path-generator.js'

  export default {
    props: {
      imagePrefix: { type: String, required: true }
    },

    data () {
      return {
        imageIndex: 0
      }
    },

    computed: {
      phoneImage () {
        return getImageUrl(this.imagePrefix, 'phone')
      },
      ipadImage () {
        return getImageUrl(this.imagePrefix, 'ipad')
      },
      desktopImage () {
        return getImageUrl(this.imagePrefix, 'desktop')
      }
    },

    methods: {
      showNextImage () {
        this.imageIndex = this.imageIndex === 2 ? 0 : this.imageIndex + 1
      },

      showPrevImage () {
        this.imageIndex = this.imageIndex === 0 ? 2 : this.imageIndex - 1
      }
    }
  }
</script>


<style>
  .image-gallery {
    width: 50vw;
    height: 80vh;
    background: #000;
    border: none;
    box-sizing: border-box;
    cursor: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .image-gallery-image {
    height: auto;
    width: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .image-gallery-buttons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: rgba(128, 128, 128, .5);
    font-size: 3em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .5em;
    box-sizing: border-box;
  }

  .image-gallery-button:hover {
    cursor: pointer;
    color: rgba(128, 128, 128, 1);
  }
</style>
