<template>
  <div class="blog">
    <adsbygoogle />

    <blog-navigation
      :has-prev-page="hasPrevPage"
      :has-next-page="hasNextPage"
      :page="page"
      :prefix="navigationPrefix"
    />

    <h2 v-if="posts && posts.length === 0">
      {{ $t("blog.noPosts") }}
    </h2>

    <ul class="blog-post-list">
      <blog-post-item
        v-for="(post, index) in posts"
        :key="index"
        :post-id="post.id"
        :title="post.title"
        :summary="post.summary"
        :url="post.url"
        :date="post.date"
      />
    </ul>

    <blog-navigation
      :has-prev-page="hasPrevPage"
      :has-next-page="hasNextPage"
      :page="page"
      :prefix="navigationPrefix"
    />
  </div>
</template>

<script>
import BlogPostItem from "./BlogPostItem.vue"
import BlogNavigation from "./BlogNavigation.vue"

export default {
  components: {
    BlogNavigation,
    BlogPostItem,
  },

  props: {
    posts: { type: Array, default: () => [] },
    page: { type: Number, default: 0 },
    hasNextPage: { type: Boolean, default: false },
    hasPrevPage: { type: Boolean, default: false },
    navigationPrefix: { type: String, default: "/page" },
  },
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
