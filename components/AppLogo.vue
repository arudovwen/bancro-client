<template>
  <NuxtImg src="/bancro-logo.png" quality="100" :class="`${imgClass}`" />
</template>

<script setup>
defineProps(["imgClass"]);
</script>
