<template>
  <div>
    <site-header
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
      header-color="green"
    ></site-header>

    <div class="site-content">
      <h2 v-if="error" class="blog-error-message">{{ $t('blog.errorFetchingList') }}</h2>

      <blog v-if="!fetching && !error"
        :posts="posts"
        :hasNextPage="hasNextPage"
        :hasPrevPage="hasPrevPage"
        :page="currentPage"
        :navigationPrefix="navigationPrefix"
      ></blog>
    </div>
  </div>
</template>


<script>
  import Blog from '~components/Blog/Blog.vue'
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import { POSTS_ENDPOINT } from '../../../../config/api.js'
  import { formatDate } from '../../../../utils/date-formatter.js'

  export default {
    transition: 'content',

    components: {
      Blog,
      SiteHeader
    },

    async fetch ({ store, route }) {
      store.commit('posts/startFetching')

      const tagId = encodeURIComponent(parseInt(route.params.tag, 10))

      try {
        const tagInfoRequest = await axios.get(`https://blog-api.datyayu.xyz/wp-json/wp/v2/tags/${tagId}`)
        const postsRequests = await axios.get(`${POSTS_ENDPOINT}?per_page=5&tags=${tagId}`)

        const tagName = tagInfoRequest.data.name
        const totalPosts = postsRequests.headers['x-wp-total']
        const posts = postsRequests.data.map(post => {
          return {
            id: post.id,
            title: post.title.rendered,
            date: formatDate(post.date),
            summary: post.excerpt.rendered
          }
        })

        store.commit('posts/setTagName', tagName)
        store.commit('posts/updatePosts', { posts, totalPosts, page: 1 })
      } catch (error) {
        store.commit('posts/errorFetching')
      }
    },

    head () {
      return {
        title: this.pageTitle,
        meta: [
          { property: 'og:title', content: this.pageTitle },
          { property: 'og:description', content: this.pageSubtitle },
          { property: 'og:url', content: this.pageUrl }
        ]
      }
    },

    computed: {
      ...mapGetters({
        posts: 'posts/posts',
        fetching: 'posts/fetching',
        hasNextPage: 'posts/hasNextPage',
        hasPrevPage: 'posts/hasPrevPage',
        currentPage: 'posts/currentPage',
        error: 'posts/error'
      }),

      navigationPrefix () {
        return `/tags/${this.$route.params.tag}`
      },

      pageUrl () {
        return `https://datyayu.xyz/blog/${this.navigationPrefix}`
      },

      pageTitle () {
        return this.$t('blog.title')
      },

      pageSubtitle () {
        return this.$t('blog.subtitle')
      }
    }
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
