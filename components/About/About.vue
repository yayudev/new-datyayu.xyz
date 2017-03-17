<template>
  <div class="about">
    <h2 class="about-title">{{ $t('about.introTitle') }}</h2>

    <img class="about-image" src="~assets/images/avatar.min.jpg" alt="Arturo Coronel"  width="200px" height="200px">

    <p class="about-text">{{ $t('about.intro') }}</p>
    <p class="about-text">{{ $t('about.work') }}</p>
    <p class="about-text">{{ $t('about.openSource') }}</p>
    <p class="about-text">{{ $t('about.hobbies') }}</p>

    <h2 class="about-title">{{ $t('about.contactTitle') }}</h2>
    <p class="about-text">{{ $t('about.contactText') }}</p>

    <ul class="about-list">
      <li class="about-list-item"><a class="about-link" href="#">Github</a></li>
      <li class="about-list-item"><a class="about-link" href="#">Correo</a></li>
      <li class="about-list-item"><a class="about-link" href="#">Facebook</a></li>
      <li class="about-list-item"><a class="about-link" href="#">Twitter</a></li>
      <li class="about-list-item"><a class="about-link" href="#">Linkedin</a></li>
      <li class="about-list-item"><a class="about-link" href="#">Skype</a></li>
    </ul>
  </div>
</template>


<style scoped>
  .about {
    margin: 0 10%;
    font-size: 1em;
  }

  .about-image {
    margin: 2em auto;
    display: block;
    border-radius: 50%;
  }

  .about-title {
    text-align: center;
    color: #FF9204;
    font-size: 2em;
    margin: 1em 0 0 0;
  }

  .about-text {
    font-size: 1em;
    font-family: 'Open Sans', 'arial', sans-serif, serif;
    line-height: 1.5em;
  }

  .about-link {
    color: #6591f5;
    text-decoration: none;
    font-size: 1.3em;
  }

  .about-link:hover {
    text-decoration: underline;
  }

/* Tablet */
  @media screen and (min-width: 480px) {
    .about-title {
      text-align: left;
    }
  }

/* HD-Desktop */
  @media screen and (min-width: 1025px) {
    .about {
      max-width: 800px;
      margin: 0 auto;
    }
  }
</style>
