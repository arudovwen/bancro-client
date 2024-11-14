<template>
  <section>
    <div class="flex justify-between items-center mb-[30px]">
      <PageHeader
        :title="`Hello ${
          authStore.userInfo.firstName || authStore.companyName
        },`"
        text="Welcome to your dashboard"
      />
      <button
        id="create-product-button"
        class="flex items-center gap-x-2 bg-danger-500 text-white text-[14px]  rounded-lg py-[10px] px-[15px] font-medium"
        @click="() => navigateTo('/products/create')"
      >
        <AppIcon icon="lets-icons:add-square-duotone" />
        <span>Fund account</span>
      </button>
    </div>
  
    <div class="flex flex-col lg:flex-row gap-5 mb-10">
      <div class="lg:max-w-[330px] w-full">
        <DashboardCards />
      </div>

      <div class="flex-1">
        <DashboardPaymentChart />
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-5">
      <div class="flex-1">
        <div>
          <DashboardRecentTransactions />
        </div>
      </div>
      <div class="lg:max-w-[446px] w-full">
        <DashboardLoans />
      </div>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "onboarding"],
  roles: [
    "superadmin",
    "admin",
    "operations",
    "member",
    "superadmin",
    "developer",
    "owner",
    "finance",
  ],
});

const authStore = useAuthStore();
const tabs = [
  {
    title: "payments",
    key: "payments",
  },
  {
    title: "loans",
    key: "loans",
  },
];
const active = ref("payments");
provide("active", active);
</script>
