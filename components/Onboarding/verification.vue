<template>
  <div class="max-w-[480px] mx-auto mt-10">
    <!-- <OnboardingNumber v-if="active === 1" /> -->
    <OnboardingPin  />
  </div>
</template>
<script setup>
const active = ref(1);

provide("active", active);
</script>
