<template>
  <Requests />
</template>

<script setup>
import Requests from "@/components/Requests";
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
