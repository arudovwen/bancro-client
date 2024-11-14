<template>
  <NuxtImg src="/images/cowry.jpg" quality="100" :class="`${imgClass}`" />
</template>

<script setup>
defineProps(["imgClass"]);
</script>
