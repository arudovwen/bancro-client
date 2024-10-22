<template>
  <AuthResetPassword v-if="active === 2" />
  <AuthValidatepassword v-if="active === 1" />
</template>
<script setup>
definePageMeta({
  layout: "subauth",
  middleware: "auth",
});

const active = ref(1);

provide("active", active);
</script>
