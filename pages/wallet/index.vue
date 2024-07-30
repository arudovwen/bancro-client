<template>
  <section>
    <Wallet />
  </section>
</template>

<script setup>
import Wallet from "@/components/Wallet";
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
