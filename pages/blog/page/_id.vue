<template>
  <div>
    <site-header
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
      header-color="green"
    />

    <div class="site-content">
      <h2 v-if="error" class="blog-error-message">
        {{ $t("blog.errorFetchingList") }}
      </h2>

      <blog
        v-if="!fetching && !error"
        :posts="posts"
        :has-next-page="hasNextPage"
        :has-prev-page="hasPrevPage"
        :page="currentPage"
      />
    </div>
  </div>
</template>

<script>
import Blog from "~/components/Blog/Blog.vue"
import SiteHeader from "~/components/SiteHeader/SiteHeader.vue"
import axios from "axios"
import { mapGetters } from "vuex"
import { POSTS_ENDPOINT } from "~/config/api.js"

export default {
  transition: "content",

  components: {
    Blog,
    SiteHeader,
  },

  async fetch({ store, route }) {
    store.commit("posts/startFetching")

    const page = parseInt(route.params.id, 10)

    try {
      const request = await axios.get(`${POSTS_ENDPOINT}/pages/${page}.json`)

      const totalPosts = request.data.totalPosts
      const posts = request.data.posts.map((post) => {
        return {
          id: post.id,
          title: post.title,
          date: post.date,
          summary: post.excerpt,
          url: post.url,
        }
      })

      store.commit("posts/updatePosts", { posts, totalPosts, page })
    } catch (error) {
      store.commit("posts/errorFetching")
    }
  },

  computed: {
    ...mapGetters({
      posts: "posts/posts",
      fetching: "posts/fetching",
      hasNextPage: "posts/hasNextPage",
      hasPrevPage: "posts/hasPrevPage",
      currentPage: "posts/currentPage",
      error: "posts/error",
    }),

    pageUrl() {
      return `https://datyayu.dev/blog/page/${this.$route.params.id}`
    },

    pageTitle() {
      return this.$t("blog.title")
    },

    pageSubtitle() {
      return this.$t("blog.subtitle")
    },
  },

  head() {
    return {
      title: this.pageTitle,
      meta: [
        { property: "og:title", content: this.pageTitle },
        { property: "og:description", content: this.pageSubtitle },
        { property: "og:url", content: this.pageUrl },
      ],
    }
  },
}
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
