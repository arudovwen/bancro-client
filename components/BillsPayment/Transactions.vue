<template>
  <div class="grid grid-cols-1 gap-y-[10px]">
    <div
      class="border border-primary-100/20 bg-primary-100/20 p-4 rounded-lg flex justify-between"
      v-for="n in 4"
      :key="n"
    >
      <span class="flex items-center gap-x-4">
     
        <span class="block">
          <span class="text-sm text-[#344054] font-medium block leading-normal"
            >Bet9ja</span
          >
          <span class="text-sm text-[#98A2B3] block leading-normal"
            >0731082157</span
          >
        </span>
      </span>
      <span class="text-sm text-[#344054] font-semibold block leading-normal">{{
        currencyFormat(46578)
      }}</span>
    </div>
  </div>

  <!-- <EmptyData title="No transaction found" type="notfound" classIcon="w-[120px] h-auto" /> -->
</template>

<script setup>
const isOpen = ref(false);
const active = ref("recent");
const tabs = [
  {
    label: "recent purchases",
    value: "recent",
  },
  {
    label: "saved beneficiaries",
    value: "saved",
  },
];
provide("active", active);
provide("isOpen", isOpen);
</script>
