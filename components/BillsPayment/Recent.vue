<template>
  <div class="bg-white rounded-xl p-6">
   <!-- <div class=" mb-[30px] ">
    <input
      type="search"
      placeholder="Search beneficiaries"
      :class="`min-w-[180px] px-[14px] w-full 
    !bg-white !rounded-lg text-[#475467] h-12 cursor-pointer border
    border-[#C8D2DF]`"
    />

   </div> -->
    <AppTab :tabs="tabs" buttonClass="!flex-1 !text-center justify-center" />
    <BillsPaymentTransactions v-if="active === 'recent'" />
    <BillsPaymentBeneficiary v-else />
  </div>
  
</template>

<script setup>
const active = ref("recent");
const tabs = [
  {
    title: "recent purchases",
    key: "recent",
  },
  {
    title: "saved beneficiaries",
    key: "saved",
  },
];
provide("active", active);
</script>
