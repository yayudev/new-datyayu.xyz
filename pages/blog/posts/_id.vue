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
        title: this.postTitle,
        meta: [
          { property: 'og:title', content: this.postTitle },
          { property: 'og:description', content: this.postSubtitle },
          { property: 'og:url', content: this.pageUrl }
        ]
      }
    },

    computed: {
      ...mapGetters({
        fetching: 'posts/fetching',
        currentPost: 'posts/currentPost'
      }),

      postTitle () {
        return this.currentPost && this.currentPost.title ? this.currentPost.title : this.pageTitle
      },

      postSubtitle () {
        return this.currentPost && this.currentPost.summary
          ? this.currentPost.summary
            .replace('\n', '')
            .replace('<p>', '')
            .replace('</p>', '')
            .replace('[&hellip;]', '...')
          : this.pageSubtitle
      },

      pageUrl () {
        return `https://datyayu.xyz/blog/posts/${this.$route.params.id}`
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
