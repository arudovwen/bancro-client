<template>
  <section>
    <CustomersLoans />
  </section>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
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
</script>
