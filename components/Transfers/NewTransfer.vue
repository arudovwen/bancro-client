<template>
  <section>
    <div class="mb-10">
      <PageHeader title="New Transfer" />
      <Breadcrumbs :links="links" />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
      <TransfersReview />
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

provide("isOpen", isOpen);
</script>
