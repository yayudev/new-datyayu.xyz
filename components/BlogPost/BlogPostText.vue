<template>
  <div class="blog-post-text" v-html="content"></div>
</template>


<script>
  import hljs from 'highlightjs'

  export default {
    props: {
      content: { type: String, default: '' }
    },

    mounted () {
      hljs.initHighlightingOnLoad()
    },

    beforeUpdate () {
      hljs.initHighlightingOnLoad()
    },

    watch: {
      content (text) {
        this.$nextTick(function () {
          hljs.initHighlighting.called = false
          hljs.initHighlighting()
        })
      }
    }
  }
</script>


<style>
  .blog-post-text {
    font-size: 1.2em;
  }

  .blog-post-text a {
    text-decoration: none;
    color: #6591f5;
  }

  .blog-post-text a:hover {
    text-decoration: underline;
  }

  .blog-post-text code {
    background: #282a36;
    color: white;
    padding: 0 .5em;
  }

  .blog-post-text pre {
    display: block;
    background: #282a36;
    padding: 1em;
  }

  .blog-post-text h1,
  .blog-post-text h2,
  .blog-post-text h3,
  .blog-post-text h4,
  .blog-post-text h5,
  .blog-post-text h6 {
    color: #00BF13;
  }

  .hljs.hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #282a36;
  }

  .hljs-built_in,
  .hljs-selector-tag,
  .hljs-section,
  .hljs-link {
    color: #8be9fd;
  }

  .hljs-keyword {
    color: #ff79c6;
  }

  .hljs,
  .hljs-subst {
    color: #f8f8f2;
  }

  .hljs-title {
    color: #50fa7b;
  }

  .hljs-string,
  .hljs-meta,
  .hljs-name,
  .hljs-type,
  .hljs-attribute,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition,
  .hljs-variable,
  .hljs-template-tag,
  .hljs-template-variable {
    color: #f1fa8c;
  }

  .hljs-comment,
  .hljs-quote,
  .hljs-deletion {
    color: #6272a4;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal,
  .hljs-title,
  .hljs-section,
  .hljs-doctag,
  .hljs-type,
  .hljs-name,
  .hljs-strong {
    font-weight: bold;
  }

  .hljs-literal,
  .hljs-number {
    color: #bd93f9;
  }

  .hljs-emphasis {
    font-style: italic;
  }
</style>
