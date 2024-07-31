<template>
  <!-- <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div> -->
  <div class="flex justify-between items-center mb-[30px]">
   
    <PageHeader title="Account Transactions" text="View all your transactions" />
    <button
      id="create-product-button"
      class="flex items-center gap-x-2 bg-[#9FE870] text-[14px] text-[#163300] rounded-lg py-[10px] px-[15px] font-medium"
      @click="
        () => {
          showing = 1;
          isOpen = true;
        }
      "
    >
      <AppIcon icon="lucide:file-plus" />
      <span>Request statement</span>
    </button>
  </div>
  <Table
    :columns="columns"
    :rows="rows"
    :hasSearch="false"
    :hasFilter="true"
    :hasDate="false"
    title="Transaction history"
  >
    <template #table-row="{ row, column }">
      <span class="status" v-if="column.header === 'status'">
        <AppStatusButton :status="row.status"
      /></span>
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
                    @click="() => router.push(`/transactions/12345`)"
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
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false" :canClose="showing === 1">
    <template #default>
      <div class="p-6 rounded-xl">
        <TransactionsRequestStatement v-if="showing === 1" />
        <TransactionsStatus v-if="showing === 2" />
      </div>
    </template>
  </ModalCenter>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const showing = ref(1);
const isOpen = ref(false);

const router = useRouter();
const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Transactions",
    url: "#",
  },
];
const columns = [
  {
    header: "Beneficiary",
    key: "customerName",
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
    header: "transaction tpye",
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
  {
    header: "",
    key: "actions",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([]);
provide("isOpen", isOpen);
provide("showing", showing);
</script>
