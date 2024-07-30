<template>
  <div>
    <div class="mb-7">
      <Breadcrumbs :links="links" />
    </div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <span class="block text-lg font-semibold capitalize"
          >Success AHon
          <span
            class="text-xs font-medium px-2 py-[2px] rounded-full text-[#067647] border border-[#ABEFC6] bg-[#ECFDF3]"
            >Active</span
          ></span
        >
        <span class="uppercase text-xs">USER ID: #10761</span>
      </div>
      <Menu class="relative" as="div">
        <MenuButton class="outline-none">
          <AppButton
            iconPosition="left"
            text="Actions"
            icon="ion:chevron-down-outline"
            btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold "
          />
        </MenuButton>
        <MenuItems
          class="absolute top-[100%] mt-1 right-0 bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] min-w-[147px] rounded-xl overflow-hidden text-left text-[#454745] flex flex-col gap-y-1"
        >
          <MenuItem>
            <span class="px-6 py-2 text-sm block whitespace-nowrap"
              >Blacklist user</span
            ></MenuItem
          >
          <MenuItem>
            <span class="px-6 py-2 text-sm block whitespace-nowrap"
              >Deactvate user</span
            ></MenuItem
          >
          <MenuItem>
            <span class="px-6 py-2 text-sm block text-red-500 whitespace-nowrap"
              >Delete account</span
            ></MenuItem
          >
        </MenuItems>
      </Menu>
    </div>
    <div class="mb-10">
      <div class="grid grid-cols-4 gap-x-6 w-full">
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
              tab.isAmount
                ? currencyFormat(stats?.[tab.key]?.total || 0)
                : stats?.[tab.key]?.total || 0
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <AppTab :tabs="pageTabs" />
      <div>
        <CustomersProfile v-if="active === 'profile'" />
        <CustomersLoansTab v-if="active === 'loans'" />
        <CustomersGuarantor v-if="active === 'guarantor'" />
        <CustomersCollateral v-if="active === 'collateral'" />
        <CustomersDocuments v-if="active === 'documents'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Customers",
    url: "/customers",
  },
  {
    title: "12345",
    url: "#",
  },
];
const tabs = [
  {
    title: "Active loans",
    count: "0",
    key: "numberofRequests",
    className: "bg-[#FFC091] text-[#260A2F]",
    icon: "lucide:users",
    isAmount: true,
  },
  {
    title: "Total repayments",
    count: "0",
    key: "disbursedLoan",
    className: "bg-[#A0E1E1] text-[#21231D]",
    icon: "lucide:users",
    isAmount: false,
  },
  {
    title: "Overdue Loans",
    count: "0",
    key: "overDueLoan",
    className: "bg-[#FFEB69] text-[#3A341C]",
    icon: "lucide:users",
    isAmount: false,
  },
  {
    title: "Pending Loans",
    count: "0",
    key: "overDueLoan",
    className: "bg-[#9FE870] text-[#163300]",
    icon: "lucide:users",
    isAmount: false,
  },
];

const pageTabs = [
  {
    title: "profile",
    key: "profile",
  },
  {
    title: "loans",
    key: "loans",
  },
  {
    title: "documents",
    key: "documents",
  },
  {
    title: "guarantor",
    key: "guarantor",
  },
  {
    title: "collateral",
    key: "collateral",
  },
];
const active = ref("documents");
const stats = ref(null);

provide("active", active);
</script>
