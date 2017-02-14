<template>
  <div>
    <site-header
      bg-image="/images/bg.png"
      header-title="BLOG"
      header-subtitle="Frontend is cool"
      header-color="green"
    ></site-header>

    <blog :posts="posts" :nextPage="nextPage"></blog>
  </div>
</template>


<script>
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'
  import Blog from '~components/Blog/Blog.vue'

  const post = {
    id: 1,
    title: 'A Post with a kinda long title to be able to test',
    date: '2017.02.02',
    tags: ['javascript', 'test', 'vue'],
    summary: `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque,
      voluptates, quasi? Voluptatibus explicabo iste iure laudantium hic ratione,
      quia dolorum consectetur, similique sint doloremque necessitatibus, quasi laborum v
      oluptates dolores! Nulla.
    `
  }

  export default {
    components: {
      SiteHeader,
      Blog
    },

    data () {
      return {
        posts: [post]
          .concat(post)
          .concat(post)
          .concat(post)
          .concat(post)
          .concat(post),
        nextPage: true
      }
    }
  }
</script>
