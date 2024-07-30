<template>
  <AuthLogin />
</template>
<script setup>
definePageMeta({
  layout: "auth",
  middleware: "auth",
  roles: [
    "superadmin",
    "Admin",
    "Operations",
    "Member",
    "superadmin",
    "Developer",
    "Owner",
    "Finance",
  ],
});
</script>
