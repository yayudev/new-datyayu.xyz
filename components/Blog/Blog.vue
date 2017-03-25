<template>
  <div class="blog">
    <blog-navigation
      :hasPrevPage="hasPrevPage"
      :hasNextPage="hasNextPage"
      :page="page"
      :prefix="navigationPrefix"></blog-navigation>

    <h2 v-if="posts && posts.length === 0">No hay posts en esta pagina</h2>

    <ul class="blog-post-list">
      <blog-post-item v-for="(post, index) in posts"
        :key="index"
        :postId="post.id"
        :title="post.title"
        :date="post.date"
        :summary="post.summary"
      ></blog-post-item>
    </ul>

    <blog-navigation
      :hasPrevPage="hasPrevPage"
      :hasNextPage="hasNextPage"
      :page="page"
      :prefix="navigationPrefix"></blog-navigation>
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
      posts: { type: Array, default: () => [] },
      page: { type: Number, default: 0 },
      hasNextPage: { type: Boolean, default: false },
      hasPrevPage: { type: Boolean, default: false },
      navigationPrefix: { type: String, default: '/page' }
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
