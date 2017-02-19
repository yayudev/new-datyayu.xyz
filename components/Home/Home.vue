<template>
  <div class="home">
    <video class="home-bg-video" src="/video/bg.webm" loop autoplay></video>
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
        min-width: 100vw;
        max-width: 100vw;
        min-height: 100vh;
        max-height: 100vh;
        position: fixed;
        object-fit: cover;
        z-index: -1;
        top: 0;
        left: 0;
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
</style>
