<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <Breadcrumbs :links="links" />
    </div>
    <div>
      <div class="grid grid-cols-3 gap-x-6 mb-6 w-full">
        <div
          v-for="tab in tabs"
          :key="tab.title"
          class="rounded-[12px] bg-white border border-[#EAECF0] p-6 shadow-[0px_1px_2px_0px_#1018280D]"
        >
          <div class="flex gap-x-4 items-center mb-2">
            <span
              :class="tab.className"
              class="rounded-full h-9 w-9 flex items-center justify-center"
              ><AppIcon :icon="tab.icon" iconClass="text-base" />
            </span>
            <p class="text-sm font-medium text-[#6A6C6A]">
              {{ tab.title }}
            </p>
          </div>
          <div class="flex flex-col gap-y-2 w-full">
            <span class="text-[#101828] font-semibold text-xl"
              >NGN {{ stats?.[tab.key]?.total || 0 }}</span
            >
            <div class="flex gap-x-2 overflow-scroll no-scrollbar">
              <AppButton :btnClass="`bg-[#9fe870]`">
                <span class="">
                  {{ tab.primaryAction.label }}
                </span>
              </AppButton>
              <AppButton
                :isLoading="false"
                :btnClass="`bg-white text-black border`"
                v-if="tab.secondaryAction"
              >
                <span class="">
                  {{ tab.secondaryAction.label }}
                </span>
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppTab :tabs="tabs2" />
    <div>
      <DashboardLoanTransactions v-if="active === 'all_transactions'" />
    </div>
  </div>
</template>

<script setup>
const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Wallet",
    url: "#",
  },
];
const tabs = [
  {
    title: "Service Wallet",
    count: "0",
    key: "numberofRequests",
    className: "bg-[#FFC091] text-[#260A2F]",
    icon: "lucide:users",
    primaryAction: {
      label: "Fund Wallet",
    },
  },
  {
    title: "Disbursement Wallet",
    count: "0",
    key: "disbursedLoan",
    className: "bg-[#A0E1E1] text-[#21231D]",
    icon: "lucide:users",
    primaryAction: {
      label: "View Account Details",
    },
  },
  {
    title: "Repayment Wallet",
    count: "0",
    key: "overDueLoan",
    className: "bg-[#FFEB69] text-[#3A341C]",
    icon: "lucide:users",
    primaryAction: {
      label: "Withdraw Funds",
    },
    secondaryAction: {
      label: "Transfer",
    },
  },
];

const tabs2 = [
  {
    title: "All Transactions",
    key: "all_transactions",
  },
  {
    title: "Service Wallet",
    key: "service_wallet",
  },
  {
    title: "Disbursements",
    key: "disbursements",
  },
  {
    title: "Repayments",
    key: "repayments",
  },
];

const stats = ref(null);
const active = ref("all_transactions");
provide("active", active);
</script>
