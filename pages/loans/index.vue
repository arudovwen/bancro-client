<template>
    <LoanComponent />
</template>
<script setup>
import LoanComponent from "~/components/LoanComponent"
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
