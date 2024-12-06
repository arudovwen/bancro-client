<template>
  <div class="flex flex-col gap-y-1 mb-[30px]">
    <PageHeader title="Loans" text="" />
    <div class="">
      <Breadcrumbs :links="links" />
    </div>
  </div>
  <div>
    <AppTab :tabs="tabs" buttonClass="!normal-case" />
    <div>
      <div v-if="!loading" class="grid gap-x-6 gap-y-16 grid-cols-3">
        <div
          @click="navigateTo(`/loans/apply-form/${n.id}`)"
          v-for="n in rows"
          :key="n"
        >
          <Loan :title="n.name" :body="n.description" :url="n.url" />
        </div>
      </div>
      <LoaderPageLoader v-else />
    </div>
  </div>
</template>

<script setup>
import { getLoanProducts } from "~/services/loanservice";
import Loan from "./Loan";

const activePage = ref("apply");
const loading = ref(true);
const active = ref("active");
const activeTab = ref("airtime");
const networkTab = ref("mtn");
const isOpen = ref(false);

const router = useRouter();
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
const rows = ref([]);
const tabs = [
  {
    title: "Select a Loan Product",
    key: "active",
  },
];

const content = [
  {
    title: "Simple loan",
    body: "Offer your users an easy and secure way to manage and organize data, assets, or resources in a systematic way.",
    url: "",
  },
  {
    title: "NYSC loan",
    body: "Offer your users an easy and secure way to manage and organize data, assets, or resources in a systematic way.",
    url: "",
  },
  {
    title: "HALAL loan",
    body: "Offer your users an easy and secure way to manage and organize data, assets, or resources in a systematic way.",
    url: "",
  },
  {
    title: "Trace loan",
    body: "Offer your users an easy and secure way to manage and organize data, assets, or resources in a systematic way.",
    url: "",
  },
  {
    title: "Mortgage loan",
    body: "Offer your users an easy and secure way to manage and organize data, assets, or resources in a systematic way.",
    url: "",
  },
];

async function getData() {
  try {
    loading.value = true;
    const response = await getLoanProducts();
    if (response.status === 200) {
      rows.value = response.data.data;
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getData();
});
provide("active", active);
provide("activeTab", activeTab);
provide("networkTab", networkTab);
</script>
