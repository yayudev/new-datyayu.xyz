<template>
  <li class="projects-item">
    <h2 class="projects-title"> {{name}} </h2>

    <div class="projects-screenshots">
      <img class="projects-image--phone" :src="phoneImage" />
      <img class="projects-image--ipad" :src="ipadImage" />
      <img class="projects-image--desktop" :src="desktopImage" />
    </div>

    <p class="projects-date"> {{date}} </p>
    <a class="projects-link" :href="url" target="_blank"> < Link > </a>
    <p class="projects-description"> {{description}} </p>
  </li>
</template>


<script>
  export default {
    props: {
      name: { type: String, required: true },
      date: { type: String, required: true },
      url: { type: String, required: true },
      imagePrefix: { type: String, required: true },
      description: { type: String, required: true }
    },

    computed: {
      phoneImage () {
        return `/images/${this.imagePrefix}-phone.png`
      },

      ipadImage () {
        return `/images/${this.imagePrefix}-ipad.png`
      },

      desktopImage () {
        return `/images/${this.imagePrefix}-desktop.png`
      }
    }
  }
</script>


<style>
/* Base */
  .projects-item {
    max-width: 100%;
    display: flex;
    align-items: center;
    margin: 1em 0 2em;
    padding-bottom: 1em;
    box-sizing: border-box;
    flex-direction: column;
    border-bottom: 1px solid #6591f5;
    transition: border-bottom 200ms ease-in-out;
  }

  .projects-item:last-child {
    border-bottom: none;
  }

  .projects-item:hover {
    border-bottom: 1px solid #3571c5;
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
    justify-content: space-around;
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
    margin: .5em 0 0 0;
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
    transform: scale(1.2) translateY(.02em);
  }

  .projects-description {
    color: #3b3b3b;
    font-size: 1.2em;
  }


/* Desktop */
  @media screen and (min-width: 780px) {
    .projects-image--phone,
    .projects-image--ipad {
        display: inline-block;
    }
  }
</style>
