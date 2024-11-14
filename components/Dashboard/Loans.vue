<template>
  <div class="grid gap-y-3 h-full">
    <div
      class="border-[#EAECF0] border rounded-xl w-full p-6 bg-white flex justify-between gap-x-4"
    >
      <button
        v-for="n in tabs"
        :key="n.title"
        class="text-center flex flex-col gap-y-1 capitalize"
      >
        <span
          class="h-14 w-14 rounded-full flex items-center justify-center bg-primary-100"
        >
          <SvgBuy v-if="n.icon === 'buy'" /> <SvgPay  v-if="n.icon === 'pay'"  /> <SvgSend  v-if="n.icon === 'send'"  /> <SvgPlus   v-if="n.icon === 'add'" />
        </span>
        <span class="font-medium text-[10px]">{{ n.title }}</span>
      </button>
    </div>
    <div class="border-[#EAECF0] border rounded-xl w-full p-6 bg-white">
      <div>
        <h2 class="text-[#101828] text-base font-semibold block mb-4">Active Loans</h2>
        <div class="flex items-center justify-center">
          <SvgEmpty />
        </div>
       
      </div>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  {
    title: "add money",
    count: "0",
    key: "numberofRequests",
    className: "bg-[#FFC091] text-[#260A2F]",
    icon: "add",
  },
  {
    title: "send money",
    count: "0",
    key: "disbursedLoan",
    className: "bg-[#A0E1E1] text-[#21231D]",
    icon: "send",
  },
  {
    title: "buy airtime",
    count: "0",
    key: "overDueLoan",
    className: "bg-[#FFEB69] text-[#3A341C]",
    icon: "buy",
  },
  {
    title: "pay bills",
    count: "0",
    key: "overDueLoan",
    className: "bg-daner-500 text-white ",
    icon: "pay",
  },
];

const stats = ref(null);
</script>
