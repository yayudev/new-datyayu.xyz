<template>
  <header class="header" :style="bgStyle">
    <div class="header-overlay"></div>
    <navigation></navigation>

    <div class="header-content">
      <h1 class="header-title">
        <span> YAYU/</span>
        <span :class="headerColor")>{{ headerTitle }}</span>
      </h1>

      <h2 class="header-subtitle"> {{ headerSubtitle }} </h2>
    </div>
  </header>
</template>


<script>
  import Navigation from '../Navigation/Navigation.vue'

  export default {
    components: {
      Navigation
    },

    props: {
      headerTitle: { type: String, required: true },
      headerSubtitle: { type: String, required: true },
      headerColor: { type: String, required: true },
      bgImage: { type: String, required: true }
    },

    computed: {
      bgStyle () {
        return `background-image: url('${this.bgImage}')`
      }
    }
  }
</script>


<style>
/* Base */
  .header {
    height: 14em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .header-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
  }

  .header-content {
    z-index: 1;
    text-align: center;
    color: white;
  }

  .header-title {
    font-size: 2.8em;
    margin: 0;
  }

  .header-subtitle {
    font-size: 1em;
    margin: 0;
  }

/* Tablet */
  @media screen and (min-width: 480px) {
    .header {
      height: 16em;
    }

    .header-title {
      font-size: 3.2em;
    }

    .header-subtitle {
      font-size: 1.1em;
    }
  }

/* Desktop */
  @media screen and (min-width: 780px) {
    .header {
      height: 18em;
    }

    .header-title {
      font-size: 3.6em;
    }

    .header-subtitle {
      font-size: 1.2em;
    }
  }

/* HD Desktop */
  @media screen and (min-width: 1025px) {
    .header {
      height: 20em;
    }

    .header-title {
      font-size: 4em;
    }

    .header-subtitle {
      font-size: 1.3em;
    }
  }
</style>
