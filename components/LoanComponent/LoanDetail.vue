<template>
  <div class="flex flex-col mb-6 gap-y-1">
    <PageHeader title="Loans" text="" />
    <div class="">
      <Breadcrumbs :links="links" />
    </div>
  </div>
  <div class="border-t border-[#DFE5EC] flex gap-x-[22px] py-5">
    <div class="max-w-[345px] w-full">
      <LoanComponentActiveLoan
        :detail="{
          ...detail,
          amount: currencyFormat(detail?.amount),
        }"
        :canRepay="true"
        @repayClick="isOpen = true"
      />
    </div>
    <div class="flex-1">
      <LoanComponentHistory />
    </div>
  </div>
  <ModalCenter :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #default>
      <div class="w-full h-full p-6 bg-white rounded-lg">
        <RepayLoan :detail="detail" />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import { getLoanRequests } from "~/services/loanservice";
import RepayLoan from "./repay-loan";

const { id } = useRoute().params;
const isOpen = ref(false);
const detail = ref(null);
const links = [
  {
    title: "Loans",
    url: "/loans",
  },
  {
    title: "Loan details",
    url: "#",
  },
];

async function getData() {
  const response = await getLoanRequests({ LoanId: id });
  if (response.status === 200) {
    detail.value = {...response.data.data?.[0], amount: response.data.data?.[0].approvedAmount};
  }
}

onMounted(() => {
  getData();
});
provide("isOpen", isOpen);
</script>
