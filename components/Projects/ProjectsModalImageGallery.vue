<template>
  <div :class="iframeClass" class="image-gallery" @click.stop>
    <img v-if="imageIndex === 0" :src="phoneImage" class="image-gallery-image">
    <img v-if="imageIndex === 1" :src="ipadImage" class="image-gallery-image">
    <img v-if="imageIndex === 2" :src="desktopImage" class="image-gallery-image">

    <div class="image-gallery-buttons">
      <a class="image-gallery-button" @click.stop="showPrevImage"> &lt; </a>
      <a class="image-gallery-button" @click.stop="showNextImage"> &gt; </a>
    </div>
  </div>
</template>


<script>
import { getImageUrl } from "../../utils/image-path-generator.js"

export default {
  props: {
    imagePrefix: { type: String, required: true },
    hasIframe: { type: Boolean, default: () => false }
  },

  data() {
    return {
      imageIndex: 0
    }
  },

  computed: {
    phoneImage() {
      return getImageUrl(this.imagePrefix, "phone")
    },
    ipadImage() {
      return getImageUrl(this.imagePrefix, "ipad")
    },
    desktopImage() {
      return getImageUrl(this.imagePrefix, "desktop")
    },

    iframeClass() {
      return this.hasIframe ? "image-gallery--iframe" : ""
    }
  },

  methods: {
    showNextImage() {
      this.imageIndex = this.imageIndex === 2 ? 0 : this.imageIndex + 1
    },

    showPrevImage() {
      this.imageIndex = this.imageIndex === 0 ? 2 : this.imageIndex - 1
    }
  }
}
</script>


<style>
.image-gallery {
  width: 90vw;
  height: 45vh;
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
  color: rgba(128, 128, 128, 0.5);
  font-size: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;
  box-sizing: border-box;
}

.image-gallery-button:hover {
  cursor: pointer;
  color: rgba(128, 128, 128, 1);
}

/* Desktop */

@media screen and (min-width: 780px) {
  .image-gallery {
    width: 50vw;
    height: 80vh;
  }

  .image-gallery--iframe {
    display: none;
  }

  .image-gallery-image {
    max-width: 50vw;
    max-height: 80vh;
  }
}
</style>
