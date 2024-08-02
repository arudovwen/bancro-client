<template>
  <section>
    <div class="mb-10">
      <PageHeader title="New Transfer" />
      <Breadcrumbs :links="links" />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
      <TransfersForm v-if="active === 1" />
      <TransfersReview v-if="active === 2" />
      <div>
        <TransfersRecent />
      </div>
    </div>
  </section>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #default>
      <div class="p-6 rounded-xl">
        <TransfersBeneficiary />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
const isOpen = ref(false);
const active = ref(1);
const enabled = ref(false);
const isLoading = ref(false);
const links = [
  {
    title: "Transfers",
    url: "/transfers",
  },
  {
    title: "New Transfer",
    url: "#",
  },
];

provide("active", active);
provide("isOpen", isOpen);
</script>
