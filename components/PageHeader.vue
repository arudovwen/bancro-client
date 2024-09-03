<template>
  <div class="max-w-[320px]">
    <h2
      class="text-[#344054] font-semibold mb-1 text-lg lg:text-[30px]"
      :class="className"
    >
      {{ title }}
    </h2>
    <p class="text-xs md:text-sm text-[#475467]" :class="subClass">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
defineProps(["title", "text", "subClass", "className"]);
</script>
