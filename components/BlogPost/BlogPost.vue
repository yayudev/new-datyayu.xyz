<template>
  <div class="blog-post">
    <h1 class="blog-post-title"> {{ title }} </h1>
    <h4 class="blog-post-date"> {{ date }} </h4>
    <h4 class="blog-post-tags">
      <nuxt-link v-for="(tag, index) in tags" class="blog-post-tag-link" :key="index" :to="generateTagUrl(tag)">
        #{{tag}}
      </nuxt-link>
    </h4>
  
    <blog-post-text :content="content"></blog-post-text>
  
    <blog-post-comments></blog-post-comments>
  </div>
</template>


<script>
import BlogPostText from "./BlogPostText.vue";
import BlogPostComments from "./BlogPostComments.vue";

export default {
  components: {
    BlogPostText,
    BlogPostComments
  },

  props: {
    title: { type: String, required: true },
    date: { type: String, required: true },
    tags: { type: Array, default: [] },
    content: { type: String, default: "" }
  },

  methods: {
    generateTagUrl(tag) {
      return `/blog/tags/${tag}`;
    }
  }
};
</script>


<style>
.blog-post {
  max-width: 800px;
  width: 90vw;
  margin: 0 auto;
}

.blog-post-title {
  color: #00BF13;
  font-size: 2.5em;
  text-align: center;
  margin: 1em 0 0 0;
}

.blog-post-date {
  text-align: center;
  margin: .25em 0;
  font-size: 1.5em;
}

.blog-post-tags {
  text-align: center;
  margin: .5em 0;
  font-weight: normal;
  font-size: 1.4em;
}

.blog-post-tag-link {
  color: #b8b9b9;
  text-decoration: none;
}

.blog-post-tag-link:after {
  content: ",";
}

.blog-post-tag-link:last-child:after {
  content: "";
}
</style>
