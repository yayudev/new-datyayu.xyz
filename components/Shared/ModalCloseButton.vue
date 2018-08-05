<template>
  <i class="modal-close-button" @click="$emit('click')">
    <span class="modal-close-button-line" />
    <span class="modal-close-button-line" />
  </i>
</template>

<style>
.modal-close-button {
  z-index: 9;
}

.modal-close-button-line {
  cursor: pointer;
  width: 2.25em;
  height: 0.3em;
  position: absolute;
  top: 1.5em;
  left: calc(100vw - 3em);
  background: white;
  display: block;
}

.modal-close-button-line:nth-child(1) {
  transform: rotateZ(45deg);
}

.modal-close-button-line:nth-child(2) {
  transform: rotateZ(-45deg);
}

/* Desktop */
@media screen and (min-width: 780px) {
  .modal-close-button-line {
    top: 3em;
    left: calc(100vw - 4em);
  }
}
</style>
