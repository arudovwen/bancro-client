<template>
  <!-- <h2 class="text-lg font-semibold mb-4 capitalize">Recent loans</h2> -->
  <Table
    :columns="columns"
    :rows="rows"
    :filterOptions="FilterOptions"
    :hasSearch="true"
    :hasFilter="true"
    ><template #table-row="{ row, column }">
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
                    @click="() => router.push(`/customers/12345`)"
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
import moment from "moment";
import AppStatusButton from "../AppStatusButton.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const router = useRouter();

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
  {
    header: "Actions",
    key: "actions",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([
 
]);
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
