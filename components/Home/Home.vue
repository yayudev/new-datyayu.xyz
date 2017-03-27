<template>
  <div class="home">
    <video class="home-bg-video" loop autoplay muted playsinline>
      <source src="https://s3-us-west-1.amazonaws.com/datyayu-xyz/bg.webm" type="video/webm">
      <source src="https://s3-us-west-1.amazonaws.com/datyayu-xyz/bg.mp4" type="video/mp4">
    </video>

    <div class="home-video-overlay"></div>
    <div class="home-container">
      <HomeText></HomeText>
      <HomeNavigation></HomeNavigation>
      <HomeLangSwitch></HomeLangSwitch>
    </div>
  </div>
</template>


<script>
  import HomeNavigation from './HomeNavigation.vue'
  import HomeText from './HomeText.vue'
  import HomeLangSwitch from './HomeLangSwitch.vue'

  export default {
    components: {
      HomeNavigation,
      HomeText,
      HomeLangSwitch
    }
  }
</script>

<style>
    .home {
      position: relative;
      height: 100%;
      overflow-x: hidden;
    }

    .home-bg-video {
      min-width: 100%;
      min-height: 100%;

      width: auto;
      height: auto;

      /* Center the video */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: -1;
      overflow: hidden;
    }

    .home-video-overlay {
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0, .4);
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
    }

    .home-container {
        position: relative;
        width: 100vw;
        height: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

/* Desktop */
    @media screen and (min-width: 830px) {
      .home {
        height: 100vh;
        overflow: hidden;
      }

      .home-container {
        overflow: hidden;
      }
    }
</style>
