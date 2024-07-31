<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <div class="flex justify-between items-center mb-5">
    <p class="text-[24px] font-semibold">Loan Requests</p>

    <AppButton
      @click="navigateTo('/requests/create')"
      type="button"
      icon="heroicons-outline:cube"
      text="New Request"
      btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold"
    />
  </div>
  <Table :columns="columns" :rows="rows" :hasSearch="true">
    <template #table-row="{ row, column }">
      <span class="status" v-if="column.header === 'Status'">
        <AppStatusButton :status="row.status" />
      </span>
      <span v-if="column.header === 'Actions'">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              <AppIcon icon="heroicons:ellipsis-vertical-solid" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-[#9FE870] text-[#163300]' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="() => router.push(`/requests/${row.id}`)"
                  >
                    View
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </span>
    </template>
  </Table>
</template>

<script setup>
import { Float } from "@headlessui-float/vue";
import AppStatusButton from "@/components/AppStatusButton.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moment from "moment";

const router = useRouter();
const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Requests",
    url: "#",
  },
];
const columns = [
  {
    header: "ID",
    key: "customerName",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Customer",
    key: "email",
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
    header: "Product",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Origination Date",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Managed By",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Status",
    key: "status",
    isHtml: false,
    isStatus: true,
  },
  {
    header: "Actions",
    isHtml: true,
    isStatus: false,
  },
];

const rows = ref([
  {
    id: "09i90i99dnccc",
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("lll"),
    status: 0,
    customerName: "Jon Doe",
    email: "sufuf@gjg.com",
  },
  {
    id: "09fdccnccc",
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("l"),
    status: 1,
    customerName: "Jon Doe2",
    email: "sufuf@gjg.com",
  },
  {
    id: "dsdde3243r34fcc",
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("lll"),
    status: 2,
    customerName: "Jon Doe3",
    email: "sufuf@gjg.com",
  },
  {
    id: "89u889999",
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("lll"),
    status: 0,
    customerName: "Jon Doe4",
    email: "sufuf@gjg.com",
  },
]);
</script>
