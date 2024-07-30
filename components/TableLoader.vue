<template>
  <div class="w-full">
    <div
      :class="className"
      class="h-[400px] w-full flex items-center justify-center"
    >
      <div class="custom-loader"></div>
    </div>
  </div>
</template>
<script setup>
defineProps(["className"]);
</script>
<style scoped>
.loader-wrapper {
  height: 100vh;
  width: 100vw;
}
.custom-loader {
  width: 70px;
  height: 70px;
  background: radial-gradient(farthest-side, #183329 90%, #0000) center/16px
      16px,
    radial-gradient(farthest-side, #f2f16e 90%, #0000) bottom/12px 12px;
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
  background: #183329;
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
