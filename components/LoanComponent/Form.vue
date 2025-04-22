<template>
  <div class="flex flex-col gap-y-1 mb-4">
    <PageHeader title="Loans" text="" />
    <div class="">
      <Breadcrumbs :links="links" />
    </div>
  </div>
  <div
    v-if="detail"
    class="border border-[#DFE5EC] rounded-lg bg-white py-[42px] px-[48px] gap-x-20 flex"
  >
    <FormDetail :detail="detail" />
    <div class="flex-1">
      <FormOne v-if="activeForm == 1" />
      <FormTwo v-if="activeForm == 2 && showRequirement" />
      <FormThree v-if="activeForm == 3 && showOthers" />
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
import {
  getLoanOthers,
  getLoanProductById,
  getLoanProducts,
  getLoanRequirements,
} from "~/services/loanservice";

const showRequirement = ref(false);
const showOthers = ref(false)
const route = useRoute();
const detail = ref(null);
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
const requirements = ref(null);
const formValues = reactive({
  one: {
    amount: null,
    purpose: "",
    tenor: "",
    document: "",
  },
  documents: [],
  others: [],
});
onMounted(() => {
  // getLoanProductById(route.params.id).then((res) => {
  //   if (res.status === 200) {
  //     detail.value = res.data.data;
  //   }
  // });
  getLoanProducts({ PageSize: 10000 }).then((res) => {
    if (res.status === 200) {
      detail.value = res.data.data.find((i) => i.id == route.params.id);
      getLoanRequirements(detail.value.productId).then((res) => {
        if (res.status === 200) {
          requirements.value = res.data.data;
          formValues.documents = requirements.value.map((i) => ({
            documentName: i.name,
            narration: i.description,
            viewUrl: "",
            downloadUrl: "",
            documentType: 0,
          }));
          showRequirement.value = true;
        }
      });
      getLoanOthers(detail.value.productId).then((res) => {
        if (res.status === 200) {
          formValues.others = res.data.data.map((i) => ({
            ...i,
            label: i.name,

            value: '',
          }));
          showOthers.value = true;
        }
      });
    }
  });
});
provide("activeForm", activeForm);
provide("detail", detail);
provide("formValues", formValues);
provide("requirements", requirements);
</script>
