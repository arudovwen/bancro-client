<template>
    <div class="flex flex-col gap-y-1 mb-[30px]">
        <PageHeader title="Loans" text="" />
        <div class="">
            <Breadcrumbs :links="links" />
        </div>
    </div>
    <div >
        <AppTab :tabs="tabs" buttonClass="!normal-case" />
        <div>
            <div class="grid gap-x-6 gap-y-16 grid-cols-3">
                <div @click="navigateTo('/loans/apply-form')" v-for="n in content" :key="n">
                    <Loan :title="n.title" :body="n.body" :url="n.url" />
                </div>
            </div>
        </div>
    </div>

  
</template>

<script setup>
import Loan from "./Loan";

const activePage = ref("apply")
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
provide("active", active);
provide("activeTab", activeTab);
provide("networkTab", networkTab);
</script>
