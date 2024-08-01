<template>
  <section>
    <div class="mb-10">
      <h3 class="text-base text-[#344054] font-medium text-center mb-10">
        Transaction Detail
      </h3>

      <div class="flex justify-center mb-3">
        <SvgDebit />
      </div>
      <span
        class="block text-3xl font-semibold text-[#344054] text-center mb-4"
        >{{ currencyFormat(13874747) }}</span
      >
      <div class="flex justify-center gap-x-2 items-center">
        <span
          class="text-xs border text-[#B42318] rounded-[6px] px-[20px] py-[2px] bg-[#FEF3F2] border-[#FECDCA]"
          >Debit</span
        >
        <span
          class="text-xs border-[#ABEFC6] border text-green-600 rounded-[6px] px-[6px] py-[2px] bg-[#ECFDF3]"
          >Successful</span
        >
      </div>
    </div>

    <div class="mb-10">
      <ul class="grid gap-y-[22px]">
        <li
          class="relative text-[#475467] flex gap-x-4 items-center text-sm after:content-[''] after:absolute after:top-[25px]
           after:border-l-3 after:w-[2px] after:rounded-xl after:bg-[#079455] after:border-[#079455] after:h-5 after:left-[12px] last:after:content-none"
          v-for="n in tabs"
          :key="n.label"
        >
          <SvgCheck /> <span>{{ n.label }}</span>
        </li>
      </ul>
    </div>

    <div
      class="border border-[#16330017] bg-[#1633000D] py-6 px-5 rounded-xl grid gap-y-[10px] mb-8"
    >
      <div
        v-for="n in content"
        :key="n.title"
        class="pb-[10px] border-b border-[#16330017]"
      >
        <span class="text-[#667085] text-sm block">{{ n.title }}</span>
        <span class="text-[#344054] text-sm font-medium">{{ n.text }}</span>
      </div>
      <div class="">
        <span class="text-[#667085] text-sm block">Channel</span>
        <span class="text-[#344054] text-sm font-medium"
          ><span
            class="text-xs border text-[#175CD3] rounded-[6px] px-[6px] py-[2px] bg-[#EFF8FF] border-[#B2DDFF]"
            >Web</span
          ></span
        >
      </div>
    </div>
    <div class="flex gap-x-4">
      <AppButton
        type="button"
        @click="isOpen = false"
       
        icon="heroicons-outline:exclamation-circle"
        text="Raise dispute"
        btnClass="text-[#344054] bg-white border border-[#D0D5DD] !py-[10px] !rounded-lg font-semibold w-full"
      />
      <AppButton
        type="submit"
       
        text="Download receipt"
        icon="hugeicons:cloud-download"
        btnClass="text-primary bg-[#9FE870] border border-[#9FE870] !py-[10px] !rounded-lg font-semibold w-full"
      />
    </div>
  </section>
</template>
<script setup>
const content = [
  {
    title: "Transaction amount",
    text: "NGN 45,90000",
  },
  {
    title: "Beneficiary",
    text: "Adeleke Laketu | 9638913849 | Providus Bank  ",
  },
  {
    title: "Transaction Date",
    text: "Monday Jul 1, 2024 | 12:59 PM  ",
  },
  {
    title: "Narration",
    text: "FX Change on Leatherback",
  },
  {
    title: "Transaction Reference",
    text: "TRF|2MPT1sudp|1807745900745412608",
  },
];
const tabs = [
  {
    label: "Initiated 12:59 PM 1 Jul 2024",
    value: "",
  },
  {
    label: "Bank Processing",
    value: "",
  },
  {
    label: "Received 12:59 PM 1 Jul 2024",
    value: "",
  },
];
</script>
