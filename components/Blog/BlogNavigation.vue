<template>
  <div class="blog-navigation">
    <nuxt-link v-if="hasPrevPage" :to="prevPage" class="blog-navigation-link">
      &lt; {{ $t("blog.prev") }}
    </nuxt-link>
    <nuxt-link v-if="hasNextPage" :to="nextPage" class="blog-navigation-link">
      {{ $t("blog.next") }} &gt;
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    page: { type: Number, default: 0 },
    hasPrevPage: { type: Boolean, default: false },
    hasNextPage: { type: Boolean, default: false },
    prefix: { type: String, default: "/page" },
  },

  computed: {
    nextPage() {
      return `/blog${this.prefix}/${this.page + 1}`
    },
    prevPage() {
      return `/blog${this.prefix}/${this.page - 1}`
    },
  },
}
</script>

<style>
.blog-navigation {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #b8b9b9;
  border-bottom: 1px solid #b8b9b9;
  padding: 1em;
  margin: 2em 0;
}

.blog-navigation-link {
  color: #2664f1;
  text-decoration: none;
  font-size: 1.3em;
}
</style>
