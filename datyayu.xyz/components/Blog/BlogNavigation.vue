<template>
  <div class="blog-navigation">
    <nuxt-link v-if="prevPage" class="blog-navigation-link" to="#"> < Anterior </nuxt-link>
    <nuxt-link v-if="nextPage" class="blog-navigation-link" to="#">  Siguiente > </nuxt-link>
  </div>
</template>


<script>
  export default {
    props: {
      prevPage: { type: Boolean, default: false },
      nextPage: { type: Boolean, default: false }
    }
  }
</script>


<style>
  .blog-navigation {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #b8b9b9;
    border-bottom: 1px solid #b8b9b9;
    padding: 1em;
    margin: 2em 0;
  }

  .blog-navigation-link {
    color: #6591f5;
    text-decoration: none;
    font-size: 1.3em;
  }
</style>
