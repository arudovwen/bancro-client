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
                      active ? 'bg-[#9FE870] text-[#163300]' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                      @click="() => router.push(`/accounts/12345`)"
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
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moment from "moment";

const router = useRouter()

const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Accounts",
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

const rows = ref([]);
</script>
