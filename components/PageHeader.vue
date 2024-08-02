<template>
  <div class="max-w-[310px]">
    <h2
      class="text-[#101828] font-semibold text-lg lg:text-[30px]"
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
