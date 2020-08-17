<template>
  <div>
    <site-header
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
      header-color="blue"
    />

    <div class="site-content">
      <projects />
    </div>
  </div>
</template>

<script>
import SiteHeader from "~/components/SiteHeader/SiteHeader.vue"
import Projects from "~/components/Projects/Projects.vue"

export default {
  transition: "content",

  components: {
    SiteHeader,
    Projects,
  },

  computed: {
    pageTitle() {
      return this.$t("projects.title")
    },

    pageSubtitle() {
      return this.$t("projects.subtitle")
    },
  },

  head() {
    return {
      title: this.pageTitle,
      meta: [
        { name: "theme-color", content: "#2664f1" },
        { property: "og:title", content: this.pageTitle },
        { property: "og:description", content: this.pageSubtitle },
        { property: "og:url", content: "https://datyayu.dev/projects" },
      ],
    }
  },
}
</script>
