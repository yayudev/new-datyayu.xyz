<template>
  <div>
    <site-header
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
      header-color="green"
    ></site-header>

    <div class="site-content">
      <blog-post v-if="!fetching"
          :title="currentPost.title"
          :date="currentPost.date"
          :tags="currentPost.tags"
          :content="currentPost.content"
      ></blog-post>
    </div>
  </div>
</template>


<script>
  import BlogPost from '~components/BlogPost/BlogPost.vue'
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import { formatDate } from '../../../utils/date-formatter.js'
  import { POSTS_ENDPOINT } from '../../../config/api.js'

  export default {
    transition: 'content',

    components: {
      BlogPost,
      SiteHeader
    },

    async fetch ({ store, route }) {
      store.commit('posts/startFetching')

      const postId = route.params.id
      const request = await axios.get(`${POSTS_ENDPOINT}/${postId}`)
      const post = request.data

      const blogPost = {
        title: post.title.rendered,
        date: formatDate(post.date),
        content: post.content.rendered,
        tags: []
      }

      store.commit('posts/setActivePost', blogPost)
    },

    head () {
      return {
        title: this.currentPost ? this.currentPost.title : this.pageTitle
      }
    },

    computed: {
      ...mapGetters({
        fetching: 'posts/fetching',
        currentPost: 'posts/currentPost'
      }),

      pageTitle () {
        return this.$t('blog.title')
      },

      pageSubtitle () {
        return this.$t('blog.subtitle')
      }
    }
  }
</script>
