<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <Table :columns="columns" :rows="rows" :hasSearch="true">
    <template #table-row="{ row, column }">
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
                      active ? 'bg-[#9FE870] text-black' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                    @click=""
                  >
                    View Request
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-[#9FE870] text-black' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="approveDisbursementDialog.open"
                  >
                    Approve
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-red-600 text-white' : 'text-red-600',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="declineDisbursementDialog.open"
                  >
                    Decline
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </span>
    </template>
  </Table>
  <AppDialog
    :title="'Approve Disbursement'"
    :isOpen="approveDisbursementDialog.isOpen"
    :onClose="approveDisbursementDialog.close"
    :PrimaryActionProps="{
      label: 'Approve Disbursement',
      onClick: () => {
        approveDisbursementDialog.close();
      },
      classes: {
        root: 'bg-[#9FE870] text-black flex-grow-1 !w-full',
      },
    }"
  >
    <div class="my-6 w-full grid grid-cols-2 gap-x-6 gap-y-2">
      <div class="col-span-2">
        <Textinput placeholder="" label="Notes" type="text" name="firstName" />
      </div>
      <div class="col-span-2">
        <Textinput placeholder="" label="Type" type="text" name="firstName" />
      </div>
    </div>
  </AppDialog>
  <AppDialog
    :title="'Decline Disbursement'"
    :isOpen="declineDisbursementDialog.isOpen"
    :onClose="declineDisbursementDialog.close"
    :PrimaryActionProps="{
      label: 'Decline Disbursement',
      onClick: () => {
        declineDisbursementDialog.close();
      },
      classes: {
        root: 'bg-red-600 text-white flex-grow-1 !w-full',
      },
    }"
  >
    <div class="my-6 w-full grid grid-cols-2 gap-x-6 gap-y-2">
      <div class="col-span-2">
        <Textinput placeholder="" label="Notes" type="text" name="firstName" />
      </div>
    </div>
  </AppDialog>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moment from "moment";

const router = useRouter();

const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Disbursements",
    url: "#",
  },
];
const columns = [
  {
    header: "customer name",
    key: "customerName",
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
    header: "amount",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Actions",
    key: "actions",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([
 
]);

const approveDisbursementDialog = ref({
  isOpen: false,
  open: () => {
    approveDisbursementDialog.value.isOpen = true;
  },
  close: () => {
    approveDisbursementDialog.value.isOpen = false;
  },
});

const declineDisbursementDialog = ref({
  isOpen: false,
  open: () => {
    declineDisbursementDialog.value.isOpen = true;
  },
  close: () => {
    declineDisbursementDialog.value.isOpen = false;
  },
});
</script>
