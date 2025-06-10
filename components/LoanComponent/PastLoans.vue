<template>
  <div class="bg-white border border-[#DFE5EC] rounded-lg">
    <Table
      :columns="columns"
      :rows="rows"
      :hasFilter="true"
      title="Past Loans"
    >
      <template #table-row="{ row, column }">
        <span class="flex gap-x-2 items-center" v-if="column.key === 'status'">
        <AppStatusButton stattype="loan-status" :status="row.status" />
        </span>
        <span class="flex gap-x-2 items-center" v-if="column.key === 'action'">
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
        <LoanComponentLoanReview :detail="detail" />
      </div>
    </template>
  </ModalCenter>
</template>

<script setup>
import { Float } from "@headlessui-float/vue";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import moment from "moment";
import { getLoanRequests } from "~/services/loanservice";

const isOpen = ref(false);
const detail = ref(null);
const columns = [
  {
    header: "Loan name",
    key: "loanName",
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
    header: "Tenure",
    key: "tenor",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "createdAt",
    key: "createdAt",
    isHtml: false,
    isStatus: true,
  },
  {
    header: "Status",
    key: "status",
    isHtml: false,
    isStatus: true,
  },
  {
    header: "",
    key: "action",
    isHtml: true,
    isStatus: false,
  },
];
const queryParams = reactive({
  Search: "",
  Status: 11,
  PageNumber: 1,
  PageSize: 10,
});
const rows = ref([]);

function handleReview(value) {
  isOpen.value = true;
  detail.value = value;
}

async function getData() {
  const response = await getLoanRequests(queryParams);
  if (response.status === 200) {
    rows.value = response.data.data.map((i) => ({
      ...i,
      amount: currencyFormat(i.amount),
      tenor: i.tenor ? `${i.tenor} days` : "-",
      createdAt: i.createdAt ? moment(i.createdAt).format("lll") : "-",
    }));
  }
}
onMounted(() => {
  getData();
});
provide("isOpen", isOpen);
</script>
