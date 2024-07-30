<template>
  <h2 class="text-lg font-semibold mb-4 capitalize">Recent transactions</h2>
  <Table :columns="columns" :rows="rows" :has-action="false"
    ><template #table-row="{ row, column }">
      <span class="status" v-if="column.header === 'status'">
        <AppStatusButton :status="row.status"
      /></span> </template
  ></Table>
</template>

<script setup>
import moment from "moment";
import AppStatusButton from "../AppStatusButton.vue";

const columns = [
  {
    header: "transaction ref",
    key: "transactionRef",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "amount",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "payment method",
    key: "paymentMethod",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "date/time",
    key: "date",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "status",
    key: "status",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([
 
]);
</script>
