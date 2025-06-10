<template>
  <div class="bg-white border border-[#DFE5EC] rounded-lg">
    <Table
      :columns="columns"
      :rows="rows"
      :hasFilter="true"
      title="Past Loans"
      :queryParams="queryParams"
      :isLoading="loading"
    >
      <template #table-row="{ row, column }">
        <span class="flex items-center gap-x-2" v-if="column.key === 'status'">
          <AppStatusButton stattype="loan-status" :status="row.status" />
        </span>
        <span class="flex items-center gap-x-2" v-if="column.key === 'action'">
          <Menu class="" as="div">
            <Float placement="bottom-end" :offset="4">
              <MenuButton class="outline-none">
                <AppIcon icon="heroicons:ellipsis-vertical-solid" />
              </MenuButton>
              <MenuItems
                class="bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] min-w-[140px] rounded-xl overflow-hidden text-left text-[#454745] flex flex-col gap-y-1"
              >
                <!-- <MenuItem>
                  <button
                    @click="handleReview(row)"
                    class="block px-4 py-2 cursor-pointer"
                  >
                    Review request
                  </button></MenuItem
                > -->
                <MenuItem>
                  <button class="block px-4 py-2 text-red-600 cursor-pointer">
                    Delete request
                  </button></MenuItem
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
      <div class="w-full h-full p-6 bg-white rounded-lg">
        <LoanComponentLoanReview :detail="detail" />
      </div>
    </template>
  </ModalCenter>
</template>

<script setup>
import { Float } from "@headlessui-float/vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moment from "moment";
import { getLoanRequests } from "~/services/loanservice";

const loading = ref(true);
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
    header: "Approved Amount",
    key: "approvedAmount",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Interest rate",
    key: "interestRate",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Tenure",
    key: "tenure",
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
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
  totalCount: 0,
  Status: 11,
  // status:"submitted"
});
const rows = ref([]);

function handleReview(value) {
  detail.value = value;
  isOpen.value = true;
}

async function getData() {
  try {
    loading.value = true;
    const response = await getLoanRequests(queryParams);
    if (response.status === 200) {
      queryParams.totalCount = response.data.totalCount;
      rows.value = response.data.data.map((i) => ({
        ...i,
        amount: currencyFormat(i.amount),
        approvedAmount: currencyFormat(i.approvedAmount),
        tenure: i.tenure ? `${i.tenure} days` : "-",
        interestRate: i.interestRate ? `${i.interestRate}%` : "-",
        status: 11,
        createdAt: i.createdAt ? moment(i.createdAt).format("lll") : "-",
      }));
    }
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  getData();
});
watch(
  () => [queryParams.PageNumber, queryParams.PageSize, queryParams.Search],
  () => {
    getData();
  }
);
provide("isOpen", isOpen);
</script>
