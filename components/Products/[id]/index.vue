<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <div class="flex justify-between items-center mb-5">
    <p class="text-[24px] font-semibold">Loan Products</p>
    <button
      id="create-product-button"
      class="flex items-center gap-x-2 text-[14px] bg-danger-500 text-white rounded-lg py-[10px] px-[15px] font-medium"
      @click="() => router.push('/products/create')"
    >
      <AppIcon icon="heroicons-outline:cube" />
      <span>Add Loan Product</span>
    </button>
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
                      active ? 'bg-daner-500 text-white ' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
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
import AppStatusButton from "@/components/AppStatusButton.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moment from "moment";

const router = useRouter();
const route = useRoute();
const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: route.params.id,
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
    header: "Product Name",
    key: "email",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Product Type",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Date",
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
  
]);
</script>
