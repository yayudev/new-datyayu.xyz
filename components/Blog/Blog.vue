<template>
  <div class="blog">
    <ul class="blog-post-list">
      <blog-post-item v-for="post in posts"
        :postId="post.id"
        :title="post.title"
        :date="post.date"
        :tags="post.tags"
        :summary="post.summary"
      ></blog-post-item>
    </ul>

    <blog-navigation :prevPage="prevPage" :nextPage="nextPage"></blog-navigation>
  </div>
</template>


<script>
  import BlogPostItem from './BlogPostItem.vue'
  import BlogNavigation from './BlogNavigation.vue'

  export default {
    components: {
      BlogNavigation,
      BlogPostItem
    },

    props: {
      posts: { type: Array, default: [] },
      nextPage: { type: Boolean, default: false },
      prevPage: { type: Boolean, default: false }
    }
  }
</script>


<style>
  .blog {
    margin: 0 auto;
    max-width: 800px;
    width: 90vw;
  }


  .blog-post-list {
    list-style: none;
    padding: 0;
  }
</style>
