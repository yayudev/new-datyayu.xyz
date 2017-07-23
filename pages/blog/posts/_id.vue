<template>
  <div>
    <site-header
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
      header-color="green"
    ></site-header>

    <div class="site-content">
      <h2 v-if="error" class="blog-error-message">
        {{ $t("blog.errorFetchingPost") }}
      </h2>

      <blog-post v-if="!fetching && !error"
        :title="currentPost.title"
        :date="currentPost.date"
        :tags="currentPost.tags"
        :content="currentPost.content"
      ></blog-post>
    </div>
  </div>
</template>


<script>
import BlogPost from "~components/BlogPost/BlogPost.vue";
import SiteHeader from "~components/SiteHeader/SiteHeader.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { POSTS_ENDPOINT } from "../../../config/api.js";

export default {
  transition: "content",

  components: {
    BlogPost,
    SiteHeader
  },

  async fetch({ store, route }) {
    store.commit("posts/startFetching");

    const postId = route.params.id;

    try {
      const request = await axios.get(`${POSTS_ENDPOINT}/${postId}.json`);
      const post = request.data;

      const blogPost = {
        id: post.id,
        title: post.title,
        date: post.date,
        content: post.html,
        tags: post.tags
      };

      store.commit("posts/setActivePost", blogPost);
    } catch (error) {
      store.commit("posts/errorFetching");
    }
  },

  head() {
    return {
      title: this.postTitle,
      meta: [
        { property: "og:title", content: this.postTitle },
        { property: "og:description", content: this.postSubtitle },
        { property: "og:url", content: this.pageUrl }
      ]
    };
  },

  computed: {
    ...mapGetters({
      fetching: "posts/fetching",
      currentPost: "posts/currentPost",
      error: "posts/error"
    }),

    postTitle() {
      return this.currentPost && this.currentPost.title
        ? this.currentPost.title
        : this.pageTitle;
    },

    postSubtitle() {
      return this.currentPost && this.currentPost.summary
        ? this.currentPost.summary
            .replace("\n", "")
            .replace("<p>", "")
            .replace("</p>", "")
            .replace("[&hellip;]", "")
        : this.pageSubtitle;
    },

    pageUrl() {
      return `https://datyayu.xyz/blog/posts/${this.$route.params.id}`;
    },

    pageTitle() {
      return this.$t("blog.title");
    },

    pageSubtitle() {
      return this.$t("blog.subtitle");
    }
  }
};
</script>


<style>
.blog-error-message {
  width: 90vw;
  max-width: 800px;
  margin: 2em auto;
  font-weight: bold;
  text-align: center;
}
</style>
