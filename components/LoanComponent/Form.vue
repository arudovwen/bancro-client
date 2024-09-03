<template>
  <div class="flex flex-col gap-y-1 mb-4">
    <PageHeader title="Loans" text="" />
    <div class="">
      <Breadcrumbs :links="links" />
    </div>
  </div>
  <div
    class="border border-[#DFE5EC] rounded-lg bg-white py-[42px] px-[48px] gap-x-20 flex"
  >
    <FormDetail />
    <div class="flex-1">
      <FormOne v-if="activeForm == 1" />
      <FormTwo v-if="activeForm == 2" />
      <FormThree v-if="activeForm == 3" />
      <FormSummary v-if="activeForm == 4" />
    </div>
  </div>
</template>
<script setup>
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import FormSummary from "./FormSummary";
import FormDetail from "./FormDetail";

const links = [
  {
    title: "Loans",
    url: "/loans",
  },
  {
    title: "Apply for loan",
    url: "#",
  },
];
const activeForm = ref(1);

provide("activeForm", activeForm);
</script>
