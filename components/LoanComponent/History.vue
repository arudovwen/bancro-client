<template>
  <div class="bg-white border border-[#DFE5EC] rounded-lg">
    <h2 class="text-base font-semibold text-[#182230] my-6 px-6">Repayment History</h2>

    <Table :columns="columns" :rows="rows" :hasExport="false" />
  </div>
</template>

<script setup>
const columns = [
  {
    header: "Date",
    key: "date",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Amount",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Channel",
    key: "channel",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Status",
    key: "status",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([]);
</script>
