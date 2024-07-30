<template>
  <Requests />
</template>

<script setup>
import Requests from "@/components/Requests";
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
