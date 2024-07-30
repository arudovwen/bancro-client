<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <div
    class="rounded-lg bg-white border border-[#EAECF0] flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-[35px]"
  >
    <div class="flex gap-x-[54px] w-full">
      <div class="w-[200px]">Bar</div>
      <div class="flex-1 max-w-[550px] w-full">
        <CustomersBusinessDetails v-if="active === 'business details'" />
        <CustomersBusinessDirectors v-if="active === 'directors'" />
        <CustomersBusinessInformation
          v-if="active === 'business information'"
        />
        <CustomersBusinessRepresentatives
          v-if="active === 'company representatives'"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const links = [
  {
    title: "Customers",
    url: "/customers",
  },
  {
    title: "Create business account",
    url: "#",
  },
];

const pageTabs = [
  {
    title: "business information",
    key: "business information",
  },
  {
    title: "business details",
    key: "business details",
  },
  {
    title: "directors",
    key: "directors",
  },
  {
    title: "company representatives",
    key: "company representatives",
  },
];
const active = ref("company representatives");
const stats = ref(null);

provide("active", active);
</script>
