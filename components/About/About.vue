<template>
  <div class="about">
    <h2 class="about-title">ME</h2>

    <p class="about-text">
      Hola. Soy Arturo Coronel (puedes llamarme Yayu),
      tengo 21 años, vivo en Tijuana, MX y me encanta el
      desarrollo web ❤.
    </p>

    <p class="about-text">
      Trabajo haciendo frontend, soy estudiante de ingeniería
      en computación en la UABC, ayudo en proyectos de investigación
      y de vez en cuando hago freelance. Pero ante todo me dedico a
      aprender por mi cuenta todos los días.
    </p>

    <p class="about-text">
      Me gusta compartir casi todo lo que hago en mi cuenta de Github,
      con licencia de MIT para que cualquiera pueda inspirarse; así como
      herramientas y librerías que he desarrollado para hacer más fácil
      mi trabajo, así otros pueden hacer más fácil el suyo y aprender de
      mi código.
    </p>

    <p class="about-text">
      Mis hobbies son ver anime, escuchar podcasts, <del>stalkear</del>
      aprender acerca de mis actrices de voz favoritas, escribir acerca
      de javascript y ayudar a los demás a aprender.
    </p>

    <h2 class="about-title">Contacto</h2>
    <p class="about-text">
      ¿Quieres saber más de mí? ¿Tienes alguna idea o sugerencia
      para mejorar este blog? ¿Deseas platicar de tecnologías web o
      monas chinas? ¡Contáctame!
    </p>

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
    font-size: 1.1em;
  }

  .about-title {
    color: #FF9204;
    font-size: 2em;
    margin: 1em 0 0 0;
  }

  .about-text {
    font-size: 1.1em;
  }

  .about-link {
    color: #6591f5;
    text-decoration: none;
    font-size: 1.3em;
  }

  .about-link:hover {
    text-decoration: underline;
  }

  @media screen and (min-width: 1025px) {
    .about {
      max-width: 800px;
      margin: 0 auto;
    }
  }
</style>
