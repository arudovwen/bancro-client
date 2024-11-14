<template>
  <div class="loader-container">
    <div class="loader-wrapper flex items-center justify-center">
      <div class="custom-loader"></div>
    </div>
  </div>
</template>

<style scoped>
.loader-wrapper {
  height: 100vh;
  width: 100vw;
}
.custom-loader {
  width: 70px;
  height: 70px;
  background: radial-gradient(farthest-side, #ED3237 90%, #0000) center/16px
      16px,
    radial-gradient(farthest-side, #F89F40 90%, #0000) bottom/12px 12px;
  background-repeat: no-repeat;
  animation: s7 1s infinite linear;
  position: relative;
}
.custom-loader::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  inset: auto 0 16px;
  margin: auto;
  background: #ED3237;
  border-radius: 50%;
  transform-origin: 50% calc(100% + 10px);
  animation: inherit;
  animation-duration: 0.5s;
}

@keyframes s7 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
