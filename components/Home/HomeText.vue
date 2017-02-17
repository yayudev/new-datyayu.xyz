<template>
    <div class="home-text-container">
        <h1 class="home-title"> ARTURO CORONEL </h1>
        <h3 class="home-subtitle">
            <span class="home-subtitle-item"> {{ $t('home.developerTitle') }} </span>
            <span class="home-subtitle-item"> {{ $t('home.javascriptTitle') }} </span>
            <span class="home-subtitle-item"> {{ currentMessage }} </span>
        </h3>
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
    .home-text-container {
        color: white;
        padding: .5em;
        width: 100vw;
        font-size: 1.5em;
        z-index: 2;
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
    @media screen and (min-width: 780px) {
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
