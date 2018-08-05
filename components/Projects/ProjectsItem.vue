<template>
  <li class="projects-item" @click.prevent="showModal">
    <h2 class="projects-title"> {{ name }} </h2>
    <p class="projects-date"> {{ date }} </p>

    <div class="projects-screenshots">
      <a :href="phoneImage" rel="noopener" target="_blank" @click.prevent>
        <img :src="phoneThumbnail" class="projects-image--phone">
      </a>
      <a :href="ipadImage" rel="noopener" target="_blank" @click.prevent>
        <img :src="ipadThumbnail" class="projects-image--ipad">
      </a>
      <a :href="desktopImage" rel="noopener" target="_blank" @click.prevent>
        <img :src="desktopThumbnail" class="projects-image--desktop">
      </a>
    </div>
  </li>
</template>


<script>
import { getImageUrl } from "../../utils/image-path-generator.js"

export default {
  props: {
    name: { type: String, required: true },
    date: { type: String, required: true },
    url: { type: String, required: false, default: () => "" },
    github: { type: String, required: false, default: () => "" },
    imagePrefix: { type: String, required: true },
    description: { type: String, required: true },
    isIframe: { type: Boolean, default: () => false }
  },

  computed: {
    phoneThumbnail() {
      return getImageUrl(this.imagePrefix, "phone", true)
    },
    phoneImage() {
      return getImageUrl(this.imagePrefix, "phone", false)
    },
    ipadThumbnail() {
      return getImageUrl(this.imagePrefix, "ipad", true)
    },
    ipadImage() {
      return getImageUrl(this.imagePrefix, "ipad", false)
    },
    desktopThumbnail() {
      return getImageUrl(this.imagePrefix, "desktop", true)
    },
    desktopImage() {
      return getImageUrl(this.imagePrefix, "desktop", false)
    }
  },

  methods: {
    showModal() {
      const project = {
        name: this.name,
        description: this.description,
        date: this.date,
        url: this.url,
        github: this.github,
        imagePrefix: this.imagePrefix,
        isIframe: this.isIframe
      }

      this.$emit("showModal", project)
    }
  }
}
</script>


<style>
/* Base */

.projects-item {
  cursor: pointer;
  max-width: 100%;
  display: flex;
  align-items: center;
  margin: 1em 0 2em;
  padding-bottom: 1em;
  box-sizing: border-box;
  flex-direction: column;
  border-bottom: 1px solid #b3b3b3;
  transition: border-bottom 200ms ease-in-out;
}

.projects-item:last-child {
  border-bottom: none;
}

.projects-item:hover:last-child {
  border-bottom: none;
}

.projects-item:hover .projects-title {
  color: #3571c5;
}

.projects-item:hover .projects-date {
  color: #b3b3b3;
}

.projects-screenshots {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1em;
  padding: 0 2em;
  box-sizing: border-box;
}

.projects-image,
.projects-image--phone,
.projects-image--ipad,
.projects-image--desktop {
  cursor: pointer;
  height: 150px;
  max-width: 100%;
  margin: 0 auto;
}

.projects-image--phone,
.projects-image--ipad {
  display: none;
}

.projects-info {
  padding: 0 1em;
  box-sizing: border-box;
}

.projects-title {
  font-size: 2em;
  color: #6591f5;
  margin: 0.5em 0 0 0;
  text-align: center;
  transition: color 200ms ease-in-out;
}

.projects-date {
  text-align: center;
  color: #b8b9b9;
  margin: 0;
  font-size: 1.1em;
  transition: color 200ms ease-in-out;
}

.projects-link {
  color: #6591f5;
  text-decoration: none;
  font-size: 1.3em;
  font-weight: bold;
  transition: transform 200ms ease-in-out;
}

.projects-link:hover {
  transform: scale(1.2) translateY(0.02em);
}

.projects-description {
  color: #3b3b3b;
  font-size: 1.2em;
}

/* HD Desktop */

@media screen and (min-width: 1025px) {
  .projects-screenshots {
    justify-content: space-around;
  }

  .projects-image--phone,
  .projects-image--ipad {
    display: inline-block;
  }
}
</style>
