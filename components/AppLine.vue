<template>
  <div class="bg-[#ECECEC] rounded-full w-full">
    <span
      :style="{ width: `${value}%` }"
      class="bg-[#15B79E] rounded-full p-[3px] block"
    >
    </span>
  </div>
</template>

<script setup>
defineProps(["value"]);
</script>
