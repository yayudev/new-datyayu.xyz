<template>
  <li class="blog-post-item">
    <h4 class="blog-post-item-date">{{ date }}</h4>

    <div class="blog-post-item-info">
      <h2 class="blog-post-item-title">
        <nuxt-link class="blog-post-item-title-link" :to="generatePostUrl()"> {{ title }} </nuxt-link>
      </h2>

      <div class="blog-post-item-summary" v-html="summary"></div>
    </div>
  </li>
</template>


<script>
  export default {
    props: {
      postId: { type: Number, required: true },
      title: { type: String, required: true },
      date: { type: String, required: true },
      summary: { type: String, default: '' },
      url: { type: String, required: true }
    },

    methods: {
      generateTagUrl (tag) {
        return `/blog/tag/${tag}`
      },

      generatePostUrl (postId) {
        return `/blog/posts/${this.url}`
      }
    }
  }
</script>


<style>
/* Base */
  .blog-post-item {
    text-align: center;
    border-bottom: 1px solid #b8b9b9;
    margin-top: 1.5em;
    display: flex;
    flex-direction: column;
  }

  .blog-post-item:last-child {
    border-bottom: none;
  }

  .blog-post-item-date {
    margin: 0;
    font-size: 1.2em;
  }

  .blog-post-item-title {
    margin: .25em 0;
    font-size: 1.9em;
  }

  .blog-post-item-title-link {
    text-decoration: none;
    color: #00BF13;
  }

  .blog-post-item-info {
    margin-bottom: 1em;
  }

  .blog-post-item-tags {
    color: #b8b9b9;
    font-weight: normal;
    margin: .25em 0;
    font-size: 1.2em;
  }

  .blog-post-item-link {
    text-decoration: none;
    color: #b8b9b9;
  }

  .blog-post-item-summary {
    text-align: left;
    font-size: 1em;
    line-height: 1.5em;
    color: #3b3b3b;
    font-family: 'Open Sans', 'arial', sans-serif, serif;
  }


/* HD Desktop */
  @media screen and (min-width: 1025px) {
    .blog-post-item {
      flex-direction: row;
      text-align: left;
    }

    .blog-post-item-date {
      font-size: 1.5em;
      margin: .5em 2em 0 0;
    }
  }
</style>
