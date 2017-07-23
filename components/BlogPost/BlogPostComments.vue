<template>
  <div class="blog-post-comments">
    <hr class="blog-post-comments-divider">
    <disqus shortname="datyayu"></disqus>
  </div>
</template>


<script>
import VueDisqus from "vue-disqus/VueDisqus.vue";

export default {
  components: {
    disqus: VueDisqus
  }
};
</script>


<style>
.blog-post-comments-divider {
  margin-top: 4em;
  margin-bottom: 2em;
  border: none;
  border-top: 1px solid #00bf13;
}
</style>
