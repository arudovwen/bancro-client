<template>
  <div class="flex flex-col gap-y-1 mb-10">
    <PageHeader title="Airtime & Data" text="" />
    <div class="mb-6">
      <Breadcrumbs :links="links" />
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
    <AirtimeAndDataForm v-if="active === 1" />
    <AirtimeAndDataReview v-if="active === 2" />
    <div>
      <AirtimeAndDataRecent />
    </div>
  </div>
</template>

<script setup>
const active = ref(1);
const activeTab = ref("airtime");
const networkTab = ref("mtn");
const isOpen = ref(false);

const router = useRouter();
const links = [
  {
    title: "Payments",
    url: "3",
  },
  {
    title: "Airtime & Data",
    url: "#",
  },
];
provide("active", active);
provide("activeTab",activeTab)
provide("networkTab",networkTab)
</script>
