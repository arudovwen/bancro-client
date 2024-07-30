<template>
  <Products />
</template>

<script setup>
import Products from "@/components/Products";
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
