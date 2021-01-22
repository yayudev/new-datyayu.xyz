<template>
  <div>
    <site-header
      :header-title="pageTitle"
      :header-subtitle="pageSubtitle"
      header-color="purple"
    />

    <div class="site-content">
      <experiments />
    </div>
  </div>
</template>

<script>
import SiteHeader from "~/components/SiteHeader/SiteHeader.vue"
import Experiments from "~/components/Experiments/Experiments.vue"

export default {
  components: {
    SiteHeader,
    Experiments,
  },

  transition: "content",

  head() {
    return {
      title: this.pageTitle,
      meta: [
        { name: "theme-color", content: "#997cff" },
        { property: "og:title", content: this.pageTitle },
        { property: "og:description", content: this.pageSubtitle },
        { property: "og:url", content: "https://yayu.dev/experiments" },
      ],
    }
  },

  computed: {
    pageTitle() {
      return this.$t("experiments.title")
    },

    pageSubtitle() {
      return this.$t("experiments.subtitle")
    },
  },
}
</script>
