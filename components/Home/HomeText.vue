<template>
  <div class="home-text">
    <div class="home-logo-container">
      <img class="home-logo" src="~assets/images/logo.svg" alt="Arturo Coronel Logo" />
    </div>

    <div class="home-text-container">
      <h1 class="home-title"> ARTURO CORONEL </h1>
      <h3 class="home-subtitle">
        <span class="home-subtitle-item"> {{ $t('home.developerTitle') }} </span>
        <span class="home-subtitle-item"> {{ $t('home.javascriptTitle') }} </span>
        <span class="home-subtitle-item"> {{ currentMessage }} </span>
      </h3>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentMessage: ''
      }
    },

    created () {
      const messages = this.$t('home.messages')
      const randomIndex = Math.floor(Math.random() * messages.length)
      this.currentMessage = messages[randomIndex]
    }
  }
</script>


<style>
/* Base */
    .home-text {
        z-index: 2;
        display: flex;
        flex-direction: column;
        width: 100vw;
        min-height: 24em;
    }

    .home-logo-container {
        margin: 1em .5em 0 .5em;
        max-width: 15em;
    }

    .home-logo {
        width: 100%;
    }

    .home-text-container {
        color: white;
        padding: .5em;
        font-size: 1.5em;
        flex: 1;
    }

    .home-title {
        font-size: 2.5em;
        margin-bottom: 0;
        margin-top: 0;
        padding-right: 10%;
        line-height: 1em;
    }

    .home-subtitle {
        color: #ddd;
        margin: 0;
        font-size: .8em;
        font-weight: 200;
    }

    .home-subtitle-item {
        display: block;
    }


/* Tablet */
    @media screen and (min-width: 480px) {
        .home-text-container {
            padding: .8em;
        }

        .home-title {
            font-size: 2.8em;
            line-height: 1.2em;
        }

        .home-subtitle {
            font-size: 1em;
            line-height: 1.4em;
        }
    }


/* Desktop */
    @media screen and (min-width: 830px) {
        .home-text {
            flex-direction: row;
            min-height: 12em;
            align-items: center;
        }

        .home-logo-container {
            margin: 1em;
        }

        .home-text-container {
            padding: 1.2em;
        }

        .home-subtitle-item {
            display: inline;
        }

        .home-subtitle-item:after {
            content: " / ";
        }

        .home-subtitle-item:last-child:after {
            content: none;
        }
    }
</style>
