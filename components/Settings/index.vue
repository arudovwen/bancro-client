<template>
  <div class="mb-[30px]">
    <Breadcrumbs :links="links" />
  </div>
  <section>
    <AppTab :tabs="tabs" />
    <div>
     
      <SettingsAccount v-if="active === 'verification'" />
      <SettingsPassword v-if="active === 'security'" />
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
    title: "profile",
    key: "profile",
  },
  {
    title: "security",
    key: "security",
  },
  {
    title: "verification",
    key: "verification",
  },

];
const active = ref("profile");
provide("active", active);
</script>
