<template>
    <blog-post v-if="!fetching"
        :title="currentPost.title"
        :date="currentPost.date"
        :tags="currentPost.tags"
        :content="currentPost.content"
    ></blog-post>
</template>


<script>
  import BlogPost from '~components/BlogPost/BlogPost.vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import { formatDate } from '../../../utils/date-formatter.js'
  import { POSTS_ENDPOINT } from '../../../config/api.js'

  export default {
    components: {
      BlogPost
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

    computed: {
      ...mapGetters({
        fetching: 'posts/fetching',
        currentPost: 'posts/currentPost'
      })
    }
  }
</script>
