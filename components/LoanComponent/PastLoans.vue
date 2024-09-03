<template>
  <div class="bg-white border border-[#DFE5EC] rounded-lg">
    <Table
      :columns="columns"
      :rows="rows"
      :hasExport="false"
      title="Past Loans"
    >
      <template #table-row="{ row, column }">
        <span class="flex gap-x-2 items-center" v-if="column.key === 'actions'">
          <Menu class="" as="div">
            <Float placement="bottom-end" :offset="4">
              <MenuButton class="outline-none">
                <AppIcon icon="heroicons:ellipsis-vertical-solid" />
              </MenuButton>
              <MenuItems
                class="bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] min-w-[140px] rounded-xl overflow-hidden text-left text-[#454745] flex flex-col gap-y-1"
              >
                <button
                  @click="handleReview(row)"
                  class="block py-2 px-4 cursor-pointer"
                >
                  Review request
                </button>
                <span class="block py-2 px-4 cursor-pointer text-red-600"
                  >Delete request</span
                >
              </MenuItems>
            </Float>
          </Menu>
        </span>
      </template>
    </Table>
  </div>
  <ModalCenter :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #default>
      <div class="h-full w-full bg-white rounded-lg p-6">
        <!-- <RepayLoan :detail="detail" /> -->
      </div>
    </template>
  </ModalCenter>
</template>

<script setup>
import { Float } from "@headlessui-float/vue";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";

const isOpen = ref(false);
const detail = ref(null);
const columns = [
  {
    header: "Loan type",
    key: "date",
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
    header: "Interest rate",
    key: "channel",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Tenor",
    key: "channel",
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
    header: "",
    key: "actions",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([]);

function handleReview(value) {
  isOpen.value = true;
  detail.vlaue = value;
}
</script>
