<template>
  <!-- <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div> -->
  <div class="flex justify-between items-center mb-[30px]">
    <PageHeader
      title="Instant Transfers"
      text="Send funds to other bank accounts"
    />
    <button
      id="create-product-button"
      class="flex items-center gap-x-2 bg-[#9FE870] text-[14px] text-[#163300] rounded-lg py-[10px] px-[15px] font-medium"
      @click="navigateTo('/transfer')"
    >
      <AppIcon icon="fa:send" />
      <span>New transfer</span>
    </button>
  </div>
  <Table
    :columns="columns"
    :rows="rows"
    :hasSearch="false"
    :hasFilter="false"
    :hasFilterButton="true"
    :hasDate="false"
    :hasExport="false"
    title="Transaction history"
    @filter-click="
      () => {
        showing = 1;
        isOpen = true;
      }
    "
  >
    <template #table-row="{ row, column }">
      <span class="status" v-if="column.header === 'status'">
        <AppStatusButton :status="row.status"
      /></span>
      <span class="relative" v-if="column.key === 'actions'">
        <Menu class="z-10" as="div">
          <Float placement="bottom-end" :offset="4">
            <MenuButton class="outline-none">
              <AppIcon icon="heroicons:ellipsis-vertical-solid" />
            </MenuButton>
            <MenuItems
              class="bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] min-w-[160px] rounded-lg overflow-hidden text-left text-[#454745] flex flex-col gap-y-1 z-10"
            >
              <span
                class="block py-[10px] px-4 cursor-pointer"
                @click="openDetail(row)"
                >View detail</span
              >
            </MenuItems>
          </Float>
        </Menu>
      </span>
    </template>
  </Table>
  <ModalCenter
    :isOpen="isOpen"
    @toggleModal="isOpen = false"
    :canClose="showing === 1"
  >
    <template #default>
      <div class="p-6 rounded-xl">
        <TransfersFilter />
       
      </div>
    </template>
  </ModalCenter>

  <ModalSide :isOpen="isDetail" @togglePopup="isDetail = false" v-if="isDetail">
    <template #content>
      <div class="h-full bg-white rounded-lg py-6">
        <TransfersDetail />
      </div>
    </template>
  </ModalSide>
</template>

<script setup>
import { Float } from "@headlessui-float/vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const showing = ref(1);
const isOpen = ref(false);
const detail = ref(null)
const isDetail = ref(false)
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
    key: "beneficiary",
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
    header: "transaction type",
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

const rows = ref([
  {
    beneficiary: "Success Ahon",
    amount: "NGN 5,000",
    paymentMethod: "Bank transfer",
    date: "22 Jan,2024",
    status: 0,
  },
]);

function openDetail(value) {
  console.log("🚀 ~ openDetail ~ value:", value);
  detail.value  = value
  isDetail.value = true
}
provide("isOpen", isOpen);
provide("showing", showing);
</script>
