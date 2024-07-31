<template>
  <div>
    <h2 class="text-[#101828] font-semibold ext-lg lg:text-[30px]">
      {{ title }}
    </h2>
    <p class="text-xs md:text-sm text-[#475467]">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps(["title", "text"]);
</script>
