<template>
  <div class="bg-white rounded-xl p-6">
    <h2 class="text-[#3C4A67] font-semibold text-xl mb-[2px]">
      Recent Transfers
    </h2>
    <p class="text-xs text-[#6A6C6A] mb-6">
      Quickly send money to your recent beneficiaries
    </p>

    <div v-if="rows.length && !isLoading" class="grid grid-cols-1 gap-y-[10px]">
      <div
        class="border border-[#21231D1A] bg-[#A0E1E11A] p-4 rounded-lg flex justify-between"
        v-for="n in rows"
        :key="n.id"
      >
        <span class="flex items-center gap-x-4">
          <SvgBeneficiary />
          <span class="block">
            <span
              class="text-sm text-[#344054] font-medium block leading-normal"
              >{{ n.beneficiary }}</span
            >
            <span class="text-sm text-[#98A2B3] block leading-normal"
              >{{n.transaction?.accountNumber}} - Access Bank</span
            >
          </span>
        </span>
        <span
          class="text-sm text-[#344054] font-semibold block leading-normal"
          >{{ n.amount }}</span
        >
      </div>
    </div>

    <EmptyData v-if="!rows.length && !isLoading" title="No recent transfer" />

    <TableLoader v-if="isLoading" />
  </div>
</template>
<script setup>
import moment from "moment";
import { getTransactions } from "~/services/savingsservice";

const isLoading = ref(true);
const authStore = useAuthStore();
const query = reactive({
  savingsId: authStore.savingsInfo.id,
  PageSize: 5,
  PageNumber: 1,
  pagecount: 5,
  totalCount: 0,
  Limit: 5,
  userId: authStore.userId,
});
const rows = ref([]);
const TransType = {
  0: "Debit",
  1: "Credit",
  2: "Refund",
};
async function getData() {
  try {
    isLoading.value = true;
    const response = await getTransactions(query);
    if (response.status === 200) {
      rows.value = response.data.data.map((i) => ({
        ...i,
        beneficiary: i.transaction.customerName,
        amount: currencyFormat(i.transaction.amount),
        paymentMethod: i.paymentMethod,
        date: moment(i.createdAt).format("lll"),
        transactionType: TransType[i.transaction?.actionType],
        status: i.status,
        note: i.transaction.note,
      
      }));
    }
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getData();
});
</script>
