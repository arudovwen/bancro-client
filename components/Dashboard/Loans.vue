<template>
  <div class="grid h-full gap-y-3">
    <div
      class="border-[#EAECF0] border rounded-xl w-full p-6 bg-white flex justify-between gap-x-4"
    >
      <button
        v-for="n in tabs"
        :key="n.title"
        class="flex flex-col text-center capitalize gap-y-1"
        @click="navigateTo(n.url)"
      >
        <span
          class="h-14 w-14 rounded-full flex items-center justify-center bg-[#9FE87066]"
        >
          <SvgBuy v-if="n.icon === 'buy'" /> <SvgPay v-if="n.icon === 'pay'" />
          <SvgSend v-if="n.icon === 'send'" />
          <SvgPlus v-if="n.icon === 'add'" />
        </span>
        <span class="font-medium text-[10px]">{{ n.title }}</span>
      </button>
    </div>
    <div class="border-[#EAECF0] border rounded-xl w-full py-6 bg-white">
      <div>
        <h2 class="text-[#101828] text-base font-semibold block mb-4 px-6">
          Active Loans
        </h2>
        <div class="grid grid-cols-1 gap-y-4" v-if="rows.length && !loading">
          <div
            @click="navigateTo(`/loans/detail/${detail.id}`)"
            v-for="(detail, id) in rows"
            :key="id"
            class="border-b border-[#DFE5EC] last:border-none px-6"
          >
            <span class="flex items-center justify-between">
              <div class="flex flex-col mb-3 gap-y-1">
                <span class="text-sm font-semibold capitalize text-[#344054]">{{
                  detail?.loanName
                }}</span>
                
              <span class="flex items-center text-xs gap-x-1">
                <span class="block text-[#667085]"
                  >Interest rate:
                  <span class="font-medium text-[#666666] ml-1"
                    >{{ detail?.interestRate }}%</span
                  ></span
                >,
                <span class="block text-[#667085]">{{
                  detail?.tenor
                }}</span></span
              >
              </div>
              <span
                class="flex justify-between items-center text-sm mb-1 text-[#475467]"
              >
                <span></span>
                <span class="block text-sm text-[#344054] font-medium">{{
                  detail?.amount
                }}</span></span
              >

            </span>
          </div>
        </div>
        <div v-if="loading">
          <TableLoader />
        </div>
        <div
          v-if="!rows.length && !loading"
          class="flex items-center justify-center"
        >
          <SvgEmpty />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { getLoanRequests } from "~/services/loanservice";
import ActiveLoan from "../LoanComponent/ActiveLoan.vue";

const tabs = [
  // {
  //   title: "add money",
  //   count: "0",
  //   key: "numberofRequests",
  //   className: "bg-[#FFC091] text-[#260A2F]",
  //   icon: "add",
  // },
  {
    title: "send money",
    count: "0",
    key: "disbursedLoan",
    className: "bg-[#A0E1E1] text-[#21231D]",
    icon: "send",
    url: "/transfers",
  },
  {
    title: "buy airtime",
    count: "0",
    key: "overDueLoan",
    className: "bg-[#FFEB69] text-[#3A341C]",
    icon: "buy",
    url: "/airtime-and-data",
  },
  {
    title: "pay bills",
    count: "0",
    key: "overDueLoan",
    className: "bg-[#9FE870] text-[#163300]",
    icon: "pay",
    url: "/bill-payment",
  },
];
const loading = ref(false);
const queryParams = reactive({
  PageNumber: 1,
  PageSize: 10,
  Status: 10,
});
const stats = ref(null);
const rows = ref([]);
async function getData() {
  try {
    loading.value = true;
    const response = await getLoanRequests(queryParams);
    if (response.status === 200) {
      rows.value = response.data.data.map((i) => ({
        ...i,
        amount: currencyFormat(i.approvedAmount),
        tenor: i.tenure ? `${i.tenure} days` : "-",
        createdAt: i.createdAt ? moment(i.createdAt).format("lll") : "-",
      }));
    }
  } finally {
    loading.value = false;
  }
}
function getPercentage(part, total) {
  return (part / total) * 100;
}

onMounted(() => {
  getData();
});
</script>
