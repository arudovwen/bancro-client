<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <Breadcrumbs :links="links" />
      <NuxtLink to="/customers/customer-add">
        <AppButton
          iconPosition="left"
          text="Create customer"
          icon="solar:user-plus-broken"
          btnClass="text-white bg-danger-500 px-6 !py-[10px] !rounded-lg font-semibold "
        />
      </NuxtLink>
    </div>
    <div>
      <div class="grid grid-cols-4 gap-x-6 mb-6 w-full">
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
          <div class="flex flex-col gap-y-2">
            <span class="text-[#101828] font-semibold text-xl">{{
              stats?.[tab.key]?.total || 0
            }}</span>

            <span
              class="font-medium text-sm text-[#067647] flex gap-x-1 items-center"
              ><AppIcon
                icon="mingcute:arrow-up-fill"
                iconClass="text-[#17B26A] text-lg"
              />
              <span> {{ stats?.[tab.key]?.percentChange || 0 }}%</span>
              <span class="text-matta-black">vs last month</span></span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="mb-11">
      <DashboardLoanChart />
    </div>
    <div>
      <DashboardLoanTransactions />
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
    title: "Customers",
    url: "#",
  },
];
const tabs = [
  {
    title: "Registered customers",
    count: "0",
    key: "numberofRequests",
    className: "bg-[#FFC091] text-[#260A2F]",
    icon: "lucide:users",
  },
  {
    title: "Active Loans",
    count: "0",
    key: "disbursedLoan",
    className: "bg-[#A0E1E1] text-[#21231D]",
    icon: "lucide:users",
  },
  {
    title: "Repaid Loans",
    count: "0",
    key: "overDueLoan",
    className: "bg-[#FFEB69] text-[#3A341C]",
    icon: "lucide:users",
  },
  {
    title: "Abandoned Loans",
    count: "0",
    key: "overDueLoan",
    className: "bg-daner-500 text-white ",
    icon: "lucide:users",
  },
];

const stats = ref(null);
</script>
