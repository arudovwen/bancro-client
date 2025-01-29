<template>
  <AuthRegister v-if="activeForm === 2" />
  <AuthBvnRegistration v-if="activeForm === 1" />
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: "auth",
});
const activeForm = ref(1);
const userData = ref(null);

provide("activeForm", activeForm);
provide("userData", userData);
</script>
