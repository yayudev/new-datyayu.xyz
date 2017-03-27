<template>
  <i class="projects-modal-close-button" @click="$emit('click')">
    <span class="projects-modal-close-button-line"></span>
    <span class="projects-modal-close-button-line"></span>
  </i>
</template>

<style>
  .projects-modal-close-button {
      z-index: 9;
  }

  .projects-modal-close-button-line {
    cursor: pointer;
    width: 2.25em;
    height: .3em;
    position: absolute;
    top: 1.5em;
    left: calc(100vw - 3em);
    background: white;
    display: block;
  }

  .projects-modal-close-button-line:nth-child(1) {
    transform: rotateZ(45deg);
  }

  .projects-modal-close-button-line:nth-child(2) {
    transform: rotateZ(-45deg);
  }

  /* Desktop */
  @media screen and (min-width: 780px) {
    .projects-modal-close-button-line {
      top: 3em;
      left: calc(100vw - 4em);
    }
  }
</style>
