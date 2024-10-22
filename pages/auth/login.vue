<template>
  <AuthLogin v-if="active === 1" />
  <AuthOtplogin v-if="active === 2" />
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
const active = ref(1);
const formValues = {
  username: "",
  password: "",
  grantType: "password",
};

provide("active", active);
provide("formValues", formValues);
</script>
