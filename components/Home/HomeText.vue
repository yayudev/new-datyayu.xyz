<template>
  <div class="home-text">
    <div class="home-logo-container">
      <img
        class="home-logo"
        src="~/assets/images/logo.svg"
        alt="Arturo Coronel Logo"
      />
    </div>

    <div class="home-text-container">
      <h1 class="home-title">
        {{ "ARTURO CORONEL" }}
      </h1>
      <h3 class="home-subtitle">
        <span class="home-subtitle-item">{{ developerTitle }}</span>
        <span class="home-subtitle-item">{{ javascriptTitle }}</span>
        <span class="home-subtitle-item">
          <vue-typer
            :text="messages"
            :repeat="Infinity"
            :shuffle="true"
            :pre-type-delay="70"
            :type-delay="70"
            :pre-erase-delay="2000"
            :erase-delay="70"
            :erase-on-complete="false"
            erase-style="backspace"
            initial-action="typing"
            caret-animation="blink"
          />
        </span>
      </h3>
    </div>
  </div>
</template>

<script>
import VueTyper from "../Shared/VueTyper.vue"

export default {
  components: {
    VueTyper,
  },

  data() {
    return {
      currentMessage: "",
      messageIndex: 0,
    }
  },

  computed: {
    developerTitle() {
      return this.$t("home.developerTitle")
    },
    javascriptTitle() {
      return this.$t("home.javascriptTitle")
    },
    messages() {
      return this.$t("home.messages")
    },
  },

  watch: {
    developerTitle() {
      const messages = this.$t("home.messages")
      this.currentMessage = messages[this.messageIndex]
    },
  },
}
</script>

<style>
/* Base */

.home-text {
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 30em;
}

.home-logo-container {
  margin: 1em 0.5em 0 0.5em;
  max-width: 15em;
}

.home-logo {
  width: 100%;
}

.home-text-container {
  color: white;
  padding: 0.5em;
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
  font-size: 0.8em;
  font-weight: 200;
}

.home-subtitle-item {
  display: block;
}

/* Tablet */

@media screen and (min-width: 480px) {
  .home-text-container {
    padding: 0.8em;
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
