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
        :page="currentPage"
        :has-next-page="hasNextPage"
        :has-prev-page="hasPrevPage"
        :navigation-prefix="navigationPrefix"
      />
    </div>
  </div>
</template>

<script>
import Blog from "~/components/Blog/Blog.vue"
import SiteHeader from "~/components/SiteHeader/SiteHeader.vue"
import axios from "axios"
import { mapGetters } from "vuex"
import { TAGS_ENDPOINT } from "~/config/api.js"

export default {
  components: {
    Blog,
    SiteHeader,
  },

  transition: "content",

  async fetch({ store, route }) {
    store.commit("posts/startFetching")

    const tagId = route.params.tag

    try {
      const request = await axios.get(`${TAGS_ENDPOINT}/pages/${tagId}-1.json`)
      const tagName = request.data.id
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

      store.commit("posts/setTagName", tagName)
      store.commit("posts/updatePosts", { posts, totalPosts, page: 1 })
    } catch (error) {
      store.commit("posts/errorFetching")
    }
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

  computed: {
    ...mapGetters({
      posts: "posts/posts",
      fetching: "posts/fetching",
      hasNextPage: "posts/hasNextPage",
      hasPrevPage: "posts/hasPrevPage",
      currentPage: "posts/currentPage",
      error: "posts/error",
    }),

    navigationPrefix() {
      return `/tags/${this.$route.params.tag}`
    },

    pageUrl() {
      return `https://yayu.dev/blog/${this.navigationPrefix}`
    },

    pageTitle() {
      return this.$t("blog.title")
    },

    pageSubtitle() {
      return this.$t("blog.subtitle")
    },
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
