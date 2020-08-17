<template>
  <section v-if="error" class="error-container">
    <site-header
      :header-title="errorTitle"
      :header-subtitle="errorSubtitle"
      header-color="red"
    />

    <div class="error-text">
      <h3 class="error-info">
        {{ $t("error.error") }}
      </h3>
      <h2 class="error-code red">
        {{ error.statusCode }}
      </h2>
    </div>
  </section>
</template>

<script>
import SiteHeader from "~/components/SiteHeader/SiteHeader.vue"

export default {
  components: {
    SiteHeader,
  },

  props: {
    error: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      default: () => "",
    },
  },

  computed: {
    errorTitle() {
      return this.$t("error.title")
    },
    errorSubtitle() {
      return this.$t("error.subtitle")
    },
  },

  head: {
    title: "Error",
  },
}
</script>

<style>
.error-container {
  width: 100%;
}

.error-text {
  width: 80%;
  margin: 0 auto;
}

.error-info {
  white-space: pre-wrap;
}

.error-code {
  text-align: center;
  font-size: 5em;
  margin-top: 0;
}
</style>
