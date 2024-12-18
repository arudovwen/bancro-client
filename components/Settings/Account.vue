<template>
  <div class="mb-7">
    <PageHeader title="Account Verifications" />
  </div>
  <section class="rounded-lg bg-white border border-[#EAECF0] pb-20">
    <div
      class="w-full flex gap-x-10 flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-12 max-w-[1064px]"
    >
      <PageHeader
        title="Account Verification"
        text="Provide the required document and details to  upgrade your account"
        className="!text-lg !text-[#3C4A67] mb-1"
        subClass=" !text-sm !text-[#667085]"
      />

      <div class="flex-1">
        <div
          class="flex flex-col justify-center gap-y-[14px] items-center mb-[30px]"
        >
          <span
            v-if="!image"
            class="h-20 w-20 p-1 rounded-full flex items-center text-sm justify-center bg-gray-200 border-2 border-white"
            >Photo</span
          >
          <img
            v-else
            :src="image"
            class="h-full w-full rounded-full flex items-center justify-center bg-[#F1F3F5]"
          />
          <div>
            <span
              class="text-[#182230] block rounded-full text-xl font-semibold cursor-pointer mb-[11px]"
            >
            {{ authStore.fullName || authStore.companyName }}
            </span>
            <span class="flex gap-x-3 items-center text-sm justify-center"
              ><span
                class="border border-[#B2DDFF] bg-[#EFF8FF] text-xs text-[#175CD3] px-[6px] rounded-[6px] py-[2px]"
                >Tier 2</span
              ></span
            >
          </div>
        </div>

        <div class="mb-6 bg-[#182230] py-2 px-4 rounded-lg">
          <div class="mb-[11px] text-xs text-white text-left">
            You are currently on a
            <span class="font-bold underline">Tier 2</span> account. Upgrade
            your account to increase your transaction limits
          </div>
          <div class="grid gap-y-2">
            <div
              v-for="n in limits"
              :key="n.label"
              class="flex justify-start gap-x-5 items-center text-xs text-white"
            >
              <span class="w-[154px]">{{ n.label }}</span>
              <span class="font-medium">{{ currencyFormat(4744757) }}</span>
            </div>
          </div>
        </div>

        <div class="border border-[#D9E4F6] bg-[#2E90FA08] rounded-xl">
          <div
            class="flex justify-between py-4 px-6 border-b last:border-none border-[#D9E4F6]"
            v-for="n in data"
            :key="n.label"
          >
            <span class="text-[#344054] font-medium">{{ n.label }}</span>
            <span>
              <button
                @click="openModal(n.key)"
                v-if="n.status === 'none'"
                class="underline py-[1px] text-[#2E90FA] text-xs font-medium"
              >
                {{ n.buttonText }}
              </button>

              <AppStatusButton
                v-else
                :status="n.status"
                :mini="true"
                stattype="textstattus"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #default>
      <div class="p-6 rounded-xl">
        <SettingsBvnForm v-if="showing === 'bvn'" />
        <SettingsNinForm v-if="showing === 'nin'" />
        <SettingsIdentity v-if="showing === 'identity'" />
        <SettingsAddressForm v-if="showing === 'address'" />
      </div>
    </template>
  </ModalCenter>
</template>

<script setup>
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

const showing = ref(1);
const isOpen = ref(false);
const authStore = useAuthStore()
const data = [
  {
    label: "Bank Verification Number",
    status: "pendingverification",
    buttonText: "Provide BVN",
    key: "bvn",
  },
  {
    label: "National Identification Number",
    status: "none",
    buttonText: "Provide NIN",
    key: "nin",
  },
  {
    label: "Face  Verification",
    status: "none",
    buttonText: "Upload ID",
    key: "identity",
  },
  {
    label: "Date of Birth",
    status: "verified",
    buttonText: "Provide email address",
    key: "email",
  },
  {
    label: "Resedential Address",
    status: "none",
    buttonText: "Upload Utility Bill",
    key: "address",
  },
  {
    label: "Next of Kin",
    status: "verified",
    buttonText: "Provide email address",
    key: "email",
  },
  {
    label: "Sign an Indemnity agreement",
    status: "verified",
    buttonText: "Provide Phone number",
    key: "phone",
  },
];
const companyData = [
  {
    label: "Bank Verification Number",
    status: "pendingverification",
    buttonText: "Provide BVN",
    key: "bvn",
  },
  {
    label: "National Identification Number",
    status: "none",
    buttonText: "Provide NIN",
    key: "nin",
  },
  {
    label: "Company Profile",
    status: "none",
    buttonText: "Upload ID",
    key: "identity",
  },
  {
    label: "Certificate of Incorporation",
    status: "verified",
    buttonText: "Provide email address",
    key: "email",
  },
  {
    label: "Memorandum & Articles of Association",
    status: "none",
    buttonText: "Upload Utility Bill",
    key: "address",
  },
  {
    label: "CAC Status Report",
    status: "verified",
    buttonText: "Provide email address",
    key: "email",
  },
  {
    label: "Utility Bill",
    status: "verified",
    buttonText: "Provide Phone number",
    key: "phone",
  },
];
const limits = [
  {
    label: "Daily Transaction Limit:",
    key: "",
  },
  {
    label: "Maximum Account Balance:",
    key: "",
  },
];

const open = ref(false);
const img = ref("");
const image = ref(null);
const route = useRoute();

const isLoading = ref(false);
onMounted(() => {
  getData();
});
function openModal(key) {
  showing.value = key;
  isOpen.value = true;
}
function getData() {}
provide("isOpen", isOpen);
</script>
