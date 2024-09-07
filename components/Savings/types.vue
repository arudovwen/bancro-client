<template>
  <div class="grid grid-cols-3 gap-4">
    <div @click="navigateTo(`/savings/create/${n.value}`)" class="cursor-pointer px-6 pt-[22px] pb-8 rounded-lg bg-white shadow-[0px_4px_8px_-2px_#1018281A]" v-for="n in content" :key="n.label">
      <div class="mb-[14px]">
        <img :src="n.img" alt="n.label" class="" />
      </div>
      <h2 class="capitalize font-semibold text-[#0E0F0C] text-lg mb-2">
        {{ n.label }} savings
      </h2>
      <p class="text-[#475467] text-base">{{ n.text }}</p>
    </div>
  </div>
</template>

<script setup>
const content = [
  {
    label: "regular",
    key: "regular",
    value: 0,
    text: "Save daily, weekly or monthly towards a target amount, earn 10% interest, no withdrawal allowed.",
    img: "/images/regular-savings.svg",
  },
  {
    label: "flexi",
    key: "regular",
    value: 0,
    text: "Save daily, weekly or monthly towards a target amount, earn 10% interest, no withdrawal allowed.",
    img: "/images/flexi-savings.svg",
  },
  {
    label: "locked",
    key: "regular",
    value: 0,
    text: "Save daily, weekly or monthly towards a target amount, earn 10% interest, no withdrawal allowed.",
    img: "/images/locked-savings.svg",
  },
];
</script>
