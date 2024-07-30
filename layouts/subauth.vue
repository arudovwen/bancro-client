<template>
  <div
    class="h-screen w-screen relative flex items-center justify-center overflow-hidden p-10"
  >
  <div class="absolute top-10 left-10"><AppLogo imgClass="!w-[180px]" /></div>
    <div
      class="max-w-[450px] w-full mx-auto py-6 lg:py-10 px-6 h-full flex items-center"
    >
      <slot />
    </div>
  </div>
</template>
<script setup>
definePageMeta({ middleware: "auth" });
</script>
