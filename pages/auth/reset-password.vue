<template>
  <AuthResetPassword />
</template>
<script setup>
definePageMeta({
  layout: "subauth",
  middleware: "auth",
});
</script>
