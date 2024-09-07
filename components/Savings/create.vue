<template>
  <div class="flex flex-col gap-y-1 mb-[30px]">
    <PageHeader title="Savings" text="" />
    <div class="">
      <Breadcrumbs :links="links" />
    </div>
  </div>
  <div class="mb-6">
    <button
      class="bg-none flex gap-x-2 items-center font-semibold text-[#163300]"
      @click="() => router.push('/accounts')"
    >
      <AppIcon icon="heroicons:arrow-small-left-20-solid" />
      <span>Back</span>
    </button>
  </div>

  <div class="bg-white border border-[#DFE5EC]  rounded-lg py-11 px-12 flex gap-x-24">
<SavingsFormCreate /><SavingsFormPreview />
  </div>
</template>
<script setup>
const links = [
  {
    title: "Savings",
    url: "/savings",
  },
  {
    title: "New savings",
    url: "#",
  },
];
</script>
