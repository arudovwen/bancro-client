<template>
  <div class="max-w-[420px] w-full">
    <div
    class="text-sm grid grid-cols-1 gap-4 border border-[#16330017] rounded-lg px-5 p-4 bg-[#1633000D]"
  >
    <span
      class="block border-b border-[#3440541A] last:border-none pb-2"
      v-for="n in formObject"
      :key="n.label"
    >
      <span class="block text-[#667085] mb-[2px]">{{ n.label }}</span>
      <span class="block font-medium">-</span>
    </span>
  </div>
  </div>
</template>
<script setup>
const formObject = [
  {
    label: "Interest rate",
    key: "",
  },
  {
    label: "Maturity Date",
    key: "",
  },

  {
    label: "Estimated returns",
    key: "",
  },
];
</script>
