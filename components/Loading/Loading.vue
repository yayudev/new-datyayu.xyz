<template>
  <div class="container">
    <div class="loading-container">
      <div class="loading-bar">
        <div class="loading-portion">
        <div class="loading-portion">
      </div>
    </div>
    <h2 class="loading-text">Loading</h2>
  </div>
</template>


<style scoped>
  @keyframes loading-animation {
    from { transform: translateX(0); }
    to { transform: translateX(30em); }
  }

  @keyframes dot-animation {
    0% { content: "" }
    25% { content: "." }
    50% { content: ".." }
    75% { content: "..." }
  }

  .container {
    position:absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: black;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .loading-bar {
    position: relative;
    height: 3px;
    background-color: white;
    width: 30em;
    border-radius: 100%;
    box-shadow: 0 0 10px 3px #10b0a0;
    overflow: hidden;
  }

  .loading-portion {
    position: absolute;
    top: 0;
    left: 0;
    height: 5px;
    background-color: #10b0a0;
    width: 2em;
    box-shadow: 0 0 10px 10px #10b0a0;
    animation: 2s loading-animation infinite;
  }

  .loading-portion:nth-child(2) {
    animation-delay: 1s;
    animation: 2s loading-animation infinite;
  }

  .loading-text {
    color: white;
    text-align: center;
    font-family: arial;
  }

  .loading-text:after {
    content: "";
    animation: 2s dot-animation infinite;
  }
</style>
