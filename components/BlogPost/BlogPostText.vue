<template>
  <div class="blog-post-text" v-html="content"></div>
</template>


<script>
  import hljs from '../../plugins/highlight.js'

  export default {
    props: {
      content: { type: String, default: '' }
    },

    mounted () {
      hljs.initHighlightingOnLoad()
      this.forceHighlight()
    },

    beforeUpdate () {
      hljs.initHighlightingOnLoad()
      this.forceHighlight()
    },

    methods: {
      forceHighlight () {
        this.$nextTick(function () {
          hljs.initHighlighting.called = false
          hljs.initHighlighting()
        })
      }
    },

    watch: {
      content (text) {
        this.forceHighlight()
      }
    }
  }
</script>


<style>
  .blog-post-text {
    font-family: 'Open Sans', 'arial', sans-serif, serif;
    font-size: 1.3em;
    line-height: 1.6em;
  }

  .blog-post-text a {
    text-decoration: none;
    color: #6591f5;
  }

  .blog-post-text a:hover {
    text-decoration: underline;
  }

  .blog-post-text code {
    background: #ffe7e7;
    padding: 0 .25em;
    color: #d06060;
  }

  .blog-post-text pre code {
    background: #282a36;
    color: white;
    padding: 0 .25em;
    font-size: 1.1em;
    line-height: 1.5em;
  }

  .blog-post-text img {
    display: block;
    width: 80%;
    margin: 0 auto;
  }

  .blog-post-text svg {
    display: block;
    margin: 0 auto;
  }

  .blog-post-text video {
    width: 100%;
  }

  .blog-post-text pre {
    display: block;
    background: #282a36;
    padding: 1em;
    box-sizing: border-box;
    overflow: auto;
  }

  .blog-post-text h1,
  .blog-post-text h2,
  .blog-post-text h3,
  .blog-post-text h4,
  .blog-post-text h5,
  .blog-post-text h6 {
    color: #00BF13;
    margin-top: 2em;
    line-height: 1.5em;
    text-align: center;
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

  @media screen and (min-width: 780px) {
    .blog-post-text h1,
    .blog-post-text h2,
    .blog-post-text h3,
    .blog-post-text h4,
    .blog-post-text h5,
    .blog-post-text h6 {
      text-align: left;
    }
  }
</style>
