<template>
    <blog :posts="posts" :nextPage="hasNextPage"></blog>
</template>


<script>
  import Blog from '~components/Blog/Blog.vue'
  import axios from 'axios'
  import { POSTS_ENDPOINT } from '../../config/api.js'
  import { formatDate } from '../../utils/date-formatter.js'

  export default {
    components: {
      Blog
    },

    async data () {
      const request = await axios.get(POSTS_ENDPOINT)

      const posts = request.data.map(post => {
        return {
          id: post.id,
          title: post.title.rendered,
          date: formatDate(post.date),
          summary: post.excerpt.rendered
        }
      })

      const hasNextPage = posts.length === 10

      return { posts, hasNextPage }
    }
  }
</script>
