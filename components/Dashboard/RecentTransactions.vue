<template>
  <div class="border-[#EAECF0] border rounded-xl w-full py-6 bg-white h-full">
    <div class="flex justify-between px-6 mb-5 gap-x-10">
      <span>
        <h2 class="text-lg font-semibold mb-[2px] capitalize">
          Recent transactions
        </h2>
        <p class="text-xs LG:text-sm text-[#71717A]">
          Your most recent transactions from all accounts
        </p>
      </span>
      <button
        @click="navigateTo('/transactions')"
        class="flex items-center h-auto text-xs font-medium text-primary-500 gap-x-2"
      >
        <span class="hidden lg:inline-block"> See all transactions</span>
        <AppIcon icon="fa6-solid:chevron-right" />
      </button>
    </div>

    <div>
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(n, id) in rows"
            :key="id"
            class="border-b border-[#DFE5EC] last:border-none"
          >
            <td class="px-6 py-4">
              <span class="flex items-center gap-x-3">
                <span
                  class="flex items-center justify-center rounded-full h-9 w-9 bg-gray-50"
                >
                  <SvgDebit v-if="n.status == 0" />
                </span>
                <span>
                  <span class="text-sm text-[#0E0F0C] font-medium block">{{
                    n.name
                  }}</span>
                  <span class="text-sm text-[#6A6C6A]">{{ n.action }}</span>
                </span>
              </span>
            </td>
            <td class="px-6 py-4">
              <span>
                <span
                  class="text-sm text-[#0E0F0C] font-medium block"
                  :class="n.status === 1 ? '' : 'text-red-500'"
                  >{{ currencyFormat(n.balance) }}</span
                >
                <span class="text-sm text-[#6A6C6A]">{{ n.date }}</span>
              </span>
            </td>
            <td class="px-6 py-4">
              <AppStatusButton :status="n.status" />
            </td>
          </tr>
        </tbody>
      </table>
      <EmptyData />
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import AppStatusButton from "../AppStatusButton.vue";
import { getTransactions } from "~/services/savingsservice";

const authStore = useAuthStore()
const isLoading = ref(false);
const columns = [
  {
    header: "transaction ref",
    key: "transactionRef",
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
    header: "payment method",
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
];
const query = reactive({
  PageNumber: 1,
  PageSize:8,
  Limit: 8,
  userId: authStore.userId,
});
const rows = ref([]);
async function getData() {
  try {
    isLoading.value = true;
    const response = await getTransactions({
      ...query,
      Offset: query.PageNumber - 1,
      Limit: 8,
      userId: authStore.userId,
    });
    if (response.status === 200) {
      rows.value = response.data.data.map((i) => ({
        ...i,
        beneficiary: i.transaction.customerName,
        amount: currencyFormat(i.transaction.amount),
        paymentMethod: i.paymentMethod,
        date: moment(i.createdAt).format("lll"),
        transactionType: TransType[i.transaction?.actionType],
        status: i.status,
        statusInfo: StatusType[i.status],
        note: i.transaction.note,
        initiatedDate: `Inititated ${moment(i.createdAt).format("lll")}`,
        dateReceived: `Received ${moment(i.createdAt).format("lll")}`,
        reference: i.transaction.transactionId,
        fullBeneficiary: `${i.transaction.customerName} | ${i.transaction.accountNumber} | Access Bank`,
      }));
      query.totalCount = response.data.data.total;
    }
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getData();
});
</script>
