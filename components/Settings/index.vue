<template>
  <div class="mb-[30px]">
    <Breadcrumbs :links="links" />
  </div>
  <section>
    <AppTab :tabs="tabs" />
    <div>
      <SettingsBusinessProfile v-if="active === 'business profile'" />
      <SettingsBankAccounts v-if="active === 'bank accounts'" />
      <SettingsTeams v-if="active === 'teams'" />
      <SettingsApiKeys v-if="active === 'api & webhooks'" />
      <SettingsProfile v-if="active === 'profile'" />
    </div>
  </section>
</template>

<script setup>

const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Settings",
    url: "#",
  },
];
const tabs = [
  {
    title: "business profile",
    key: "business profile",
  },
  {
    title: "bank accounts",
    key: "bank accounts",
  },
  {
    title: "teams",
    key: "teams",
  },
  {
    title: "api & webhooks",
    key: "api & webhooks",
  },
  {
    title: "profile",
    key: "profile",
  },
];
const active = ref("business profile");
provide("active", active);
</script>
