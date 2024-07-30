<template>
  <section>
    <!-- <AppTab :tabs="tabs" /> -->
    <div>
      <!-- <DashboardLoans v-if="active === 'loans'" /> -->
      <DashboardPayments v-if="active === 'payments'" />
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
