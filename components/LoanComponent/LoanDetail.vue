<template>
  <div class="flex flex-col gap-y-1 mb-6">
    <PageHeader title="Loans" text="" />
    <div class="">
      <Breadcrumbs :links="links" />
    </div>
  </div>
  <div class="border-t border-[#DFE5EC] flex gap-x-[22px] py-5">
    <div class="max-w-[345px] w-full">
      <LoanComponentActiveLoan
        :detail="detail"
        :canRepay="true"
        @repayClick="isOpen = true"
      />
    </div>
  <div class="flex-1">
    <LoanComponentHistory  />
  </div>
  </div>
  <ModalCenter :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #default>
      <div class="h-full w-full bg-white rounded-lg p-6">
        <RepayLoan :detail="detail" />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import RepayLoan from "./repay-loan";

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
provide("isOpen", isOpen);
</script>
