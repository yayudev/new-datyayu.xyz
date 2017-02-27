<template>
  <div>
    <site-header
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
      header-color="green"
    ></site-header>

    <div class="site-content">
      <blog v-if="!fetching"
        :posts="posts"
        :hasNextPage="hasNextPage"
        :hasPrevPage="hasPrevPage"
        :page="currentPage"
      ></blog>
    </div>
  </div>
</template>


<script>
  import Blog from '~components/Blog/Blog.vue'
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import { POSTS_ENDPOINT } from '../../../config/api.js'
  import { formatDate } from '../../../utils/date-formatter.js'

  export default {
    transition: 'content',

    components: {
      Blog,
      SiteHeader
    },

    async fetch ({ store, route }) {
      store.commit('posts/startFetching')

      const page = parseInt(route.params.id, 10)
      const request = await axios.get(`${POSTS_ENDPOINT}?per_page=5&page=${page}`)

      const totalPosts = request.headers['x-wp-total']
      const posts = request.data.map(post => {
        return {
          id: post.id,
          title: post.title.rendered,
          date: formatDate(post.date),
          summary: post.excerpt.rendered
        }
      })

      store.commit('posts/updatePosts', { posts, totalPosts, page })
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
        currentPage: 'posts/currentPage'
      }),

      pageUrl () {
        return `https://datyayu.xyz/blog/page/${this.$route.params.id}`
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
