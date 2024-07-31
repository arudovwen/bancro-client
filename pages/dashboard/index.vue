<template>
  <section>
    <!-- <AppTab :tabs="tabs" /> -->
    <div class="flex gap-x-4 mb-10"><div class="p-4 bg-white max-w-[330px] w-full"></div>
     
    <div class="flex-1 p-4 bg-white">  <DashboardPayments v-if="active === 'payments'" /></div>
    
    </div>

    <div  class="flex gap-x-4">
      <div class="p-4 bg-white flex-1"></div>
      <div class="p-4 bg-white max-w-[446px] w-full"></div>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
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
