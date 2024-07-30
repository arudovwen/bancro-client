<template>
  <Disbursements />
</template>
<script setup>
import Disbursements from "@/components/Disbursements"
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
