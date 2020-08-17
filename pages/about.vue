<template>
  <div>
    <site-header
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
      header-color="orange"
    />

    <div class="site-content">
      <about />
    </div>
  </div>
</template>

<script>
import About from "~/components/About/About.vue"
import SiteHeader from "~/components/SiteHeader/SiteHeader.vue"

export default {
  transition: "content",

  components: {
    About,
    SiteHeader,
  },

  computed: {
    pageTitle() {
      return this.$t("about.title")
    },

    pageSubtitle() {
      return this.$t("about.subtitle")
    },
  },

  head() {
    return {
      title: this.pageTitle,
      meta: [
        { name: "theme-color", content: "#ffc272" },
        { property: "og:title", content: this.pageTitle },
        { property: "og:description", content: this.pageSubtitle },
        { property: "og:url", content: "https://datyayu.dev/about" },
      ],
    }
  },
}
</script>
