<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <Table :columns="columns" :rows="rows" :hasSearch="true">
    <template #table-row="{ row, column }">
      <span
        v-if="column.key === 'customerName'"
        class="flex gap-x-2 items-center"
      >
        <span
          class="w-10 text-xs h-10 bg-gray-50 rounded-full flex items-center justify-center"
          >AJ</span
        >
        <span>
          <span class="block text-sm font-medium text-[#101828]">{{
            row.customerName
          }}</span>
          <span class="text-sm text-[#475467] block">{{ row.email }}</span>
        </span>
      </span>
      <span class="status" v-if="column.header === 'status'">
        <AppStatusButton :status="row.status"
      /></span>
      <span v-if="column.header === 'actions'">
        <Menu class="" as="div">
          <Float placement="bottom-end" :offset="4">
            <MenuButton class="outline-none">
              <AppIcon icon="heroicons:ellipsis-vertical-solid" />
            </MenuButton>
            <MenuItems
              class="bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] min-w-[140px] rounded-xl overflow-hidden text-left text-[#454745] flex flex-col gap-y-1"
            >
              <span class="block py-2 px-4 cursor-pointer">View</span>
            </MenuItems>
          </Float>
        </Menu>
      </span>
    </template>
  </Table>
</template>

<script setup>
import { Float } from "@headlessui-float/vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moment from "moment";

const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Transfers",
    url: "#",
  },
];
const columns = [
  {
    header: "Account details",
    key: "customerName",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "payment ref",
    key: "paymentRef",
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
    header: "date paid",
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
  {
    header: "actions",
    key: "actions",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([
  
]);
</script>
