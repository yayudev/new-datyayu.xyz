<template>
  <nuxt-link class="experiments-item" :to="url">
    <img class="experiments-item-image" :src="img" />
    <h3 class="experiments-item-title"> {{title}} </h3>
  </nuxt-link>
</template>


<script>
  export default {
    props: {
      url: { type: String, required: true },
      img: { type: String, required: true },
      title: { type: String, required: true }
    }
  }
</script>


<style>
  .experiments-item {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin: 1em 0;
  }

  .experiments-item-image {
    width: 100%;
  }

  .experiments-item-title {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: white;
    padding: .5em;
    background: rgba(255, 33, 33, .5);
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

/* HD Desktop */
  @media screen and (min-width: 1025px) {
    .experiments-item {
      width: 24%;
      margin: 1em .5%;
    }
  }

/* +HD Desktop */
  @media screen and (min-width: 1200px) {
    .experiments-item {
      width: 19%;
      margin: 1em .5%;
    }
  }
</style>
