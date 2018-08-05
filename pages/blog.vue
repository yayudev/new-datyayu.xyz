<template>
  <nuxt-child />
</template>

<script>
export default {
  transition: "content",

  head() {
    return {
      meta: [
        {
          name: "theme-color",
          content: "#01a711"
        }
      ]
    }
  }
}
</script>
