<template>
  <a class="experiments-item" :href="url" rel="noopener" target="_blank">
    <img class="experiments-item-image" :src="thumbnailUrl" :alt="title" />
    <h3 class="experiments-item-title"> {{title}} </h3>
  </a>
</template>


<script>
  export default {
    props: {
      url: { type: String, required: true },
      img: { type: String, required: true },
      title: { type: String, required: true }
    },

    computed: {
      thumbnailUrl () {
        return `https://s3-us-west-1.amazonaws.com/datyayu-xyz/experiments/${this.img}.jpg`
      }
    }
  }
</script>


<style>
  .experiments-item {
    width: 100%;
    height: 8em;
    position: relative;
    overflow: hidden;
    margin: 1em 0;
    transition: transform 200ms ease-in-out;
  }

  .experiments-item:hover {
    transform: scale(1.05);
    z-index: 2;
  }

  .experiments-item:hover .experiments-item-title {
    background: rgba(153, 123, 255, 1);
  }

  .experiments-item-image {
    width: 100%;
    height: 100%;
  }

  .experiments-item-title {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    color: white;
    padding: .5em;
    background: rgba(153, 123, 255, .5);
    transition: background 200ms ease-in-out;
  }

/* Tablet */
  @media screen and (min-width: 480px) {
    .experiments-item  {
      width: 47%;
      margin: 1em 1.5%;
    }
  }

/* Desktop */
  @media screen and (min-width: 780px) {
    .experiments-item {
      width: 32%;
      margin: 1em .65%;
    }
  }

/* +HD Desktop */
  @media screen and (min-width: 1200px) {
    .experiments-item {
      width: 24%;
      margin: 1em .5%;
    }
  }
</style>
