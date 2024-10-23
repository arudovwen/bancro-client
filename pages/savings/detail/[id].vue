<template>
    <SavingsDetail />
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
</script>
