<template>
    <div class="flex justify-between items-center mb-[30px]">
        <PageHeader title="Loans" text="" />
        <button id="create-product-button"
            class="flex items-center gap-x-2 bg-[#9FE870] text-[14px] text-[#163300] rounded-lg py-[10px] px-[15px] font-medium"
            @click="navigateTo('/loans/apply')">
            <AppIcon icon="iconoir:piggy-bank" />
            <span>Apply for loan</span>
        </button>
    </div>
    <div>
        <AppTab :tabs="tabs" buttonClass="" />
      <LoanComponentActiveLoans v-if="active==='active'" />
      <LoanComponentPastLoans v-if="active==='past'" />
      <LoanComponentLoanRequests v-if="active==='request'" />
      <LoanComponentLoanOffers v-if="active==='offers'" />
    </div>
</template>

<script setup>
const active = ref("active");
const activeTab = ref("airtime");
const networkTab = ref("mtn");
const isOpen = ref(false);

const router = useRouter();
const links = [
    {
        title: "Loans",
        url: "#",
    },
    {
        title: "Apply for loan",
        url: "#",
    },
];
const tabs = [
    {
        title: "active loans",
        key: "active",
    },
    {
        title: "past loans",
        key: "past",
    }, {
        title: "loan request",
        key: "request",
    },{
        title: "loan offers",
        key: "offers",
    },
];
provide("active", active);
provide("activeTab", activeTab)
provide("networkTab", networkTab)
</script>