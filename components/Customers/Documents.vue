<template>
  <div class="mb-6">
    <Table :columns="columns" :rows="rows" :hasSearch="true">
      <template #table-row="{ row, column }">
        <span v-if="column.header === 'actions'">
          <span class="flex gap-x-1 items-center">
            <span
              class="block py-2 px-1 cursor-pointer text-red-500"
              v-if="row.status === 1"
              >Delete</span
            >
            <span
              class="block py-2 px-1 cursor-pointer"
              v-if="row.status === 3 || row.status === 1"
              >Re upload</span
            ></span
          >
          <span class="block py-2 px-1 cursor-pointer" v-if="row.status === 2"
            >View document</span
          >
          <span class="block py-2 px-1 cursor-pointer" v-if="row.status === 0"
            >Browse for file</span
          >
        </span>
        <span class="status" v-if="column.header === 'status'">
          <AppStatusButton :status="row.status" type="document"
        /></span>
      </template>
    </Table>
  </div>
  <div class="">
    <AppButton
      @click="isOpen = true"
      text="Upload other documents"
      icon="lucide:upload"
      btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold "
    />
  </div>
</template>

<script setup>
import { Float } from "@headlessui-float/vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moment from "moment";
const columns = [
  {
    header: "document",
    key: "document",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "date uploaded",
    key: "date",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "status",
    key: "status",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "actions",
    key: "actions",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([]);
</script>
