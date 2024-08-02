<template>
    <SettingsPassword />
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
  </script>
  