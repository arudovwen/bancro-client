<template>
  <!-- <h2 class="text-lg font-semibold mb-4 capitalize">Recent loans</h2> -->
  <Table
    :columns="columns"
    :rows="rows"
    :filterOptions="FilterOptions"
    :hasSearch="true"
    :hasFilter="true"
  >
    <template #table-row="{ row, column }">
      <span class="status" v-if="column.header === 'status'">
        <AppStatusButton :status="row.status"
      /></span>
    </template>
  </Table>
</template>

<script setup>
import moment from "moment";
import AppStatusButton from "../AppStatusButton.vue";
import { Float } from "@headlessui-float/vue";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";

const columns = [
  {
    header: "user id",
    key: "userId",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "name",
    key: "name",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "email",
    key: "email",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "date",
    key: "date",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "phone",
    key: "phone",
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

const rows = ref([]);
const FilterOptions = [
  {
    label: "adtive",
    key: "all",
    value: null,
  },
  {
    label: "inactive",
    key: 0,
    value: 0,
  },
  {
    label: "blacklisted",
    key: 1,
    value: 1,
  },
];
</script>
