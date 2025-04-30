<template>
  <div class="mb-7">
    {{ config?.private?.PREMBLY_KEY }}
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
        <div class="mb-6 bg-[#182230] py-2 px-4 rounded-lg">
          <div class="mb-[11px] text-xs text-white text-left">
            You are currently on a
            <span class="font-bold underline">{{
              TierOptions[authStore.tierLevel]
            }}</span>
            account. Upgrade your account to increase your transaction limits
          </div>
          <div class="grid gap-y-2">
            <div
              v-for="n in limitData"
              :key="n.label"
              class="flex justify-start gap-x-5 items-center text-xs text-white"
            >
              <span class="w-[154px]">{{ n.label }}</span>
              <span class="font-medium">{{
                currencyFormat(limits?.[n.key] || 0)
              }}</span>
            </div>
          </div>
          <!-- <div class="mt-4">
            <button
              class="text-[#163300] font-medium bg-[#9FE870] border border-[#9FE870] px-2 py-[6px] text-xs rounded-[6px] active:scale-95"
            >
              Upgrade
            </button>
          </div> -->
        </div>

        <div class="grid gap-y-3">
          <div
            v-for="(n, index) in TierData"
            :key="n.label"
            class="py-4 border rounded-lg border-[#D9E4F6] bg-[#F9FCFF]"
          >
            <div class="flex justify-between items-center px-6">
              <span class="flex gap-x-[10px] items-center">
                <img src="~/assets/images/svg/tier.svg" :alt="n.label" />
                <span class="text-[#344054] font-medium text-sm">{{
                  n.label
                }}</span></span
              >
              <span>
                <button
                  v-if="n.status === 'upgrade'"
                  @click="
                    () => {
                      clickVerify(n.config_id);
                    }
                  "
                  class="text-[#163300] font-medium bg-[#9FE870] border border-[#9FE870] px-2 py-[3px] text-xs rounded-[6px] active:scale-95"
                >
                  Upgrade
                </button>
                <button
                  v-if="n.status === 'none'"
                  class="py-[1px] text-[#637381] text-xs font-medium"
                  @click="openTab(index)"
                >
                  <AppIcon icon="fa6-solid:chevron-right" />
                </button>

                <AppStatusButton
                  @click="openTab(index)"
                  v-if="n.status === 'verified'"
                  :status="n.status"
                  :mini="true"
                  stattype="textstattus"
                />
              </span>
            </div>
            <div
              v-if="n.options.length && n.isOpen"
              class="border-t mt-4 border-[#D9E4F6]"
            >
              <div
                class="flex justify-between py-4 px-6 last:pb-0 border-b last:border-none border-[#D9E4F6]"
                v-for="k in n.options"
                :key="k.label"
              >
                <span class="text-[#344054] font-medium">{{ k.label }}</span>
                <span>
                  <span v-if="!profileData?.[k.valueKey]">
                    <button
                      v-if="k.config_id"
                      @click="
                        type = k.type;
                        clickVerify(k.config_id);
                      "
                      :disabled="
                        profileData?.tierName?.toLowerCase() !==
                          n.prerequisite || isVerifying
                      "
                      class="underline py-[1px] text-[#2E90FA] text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ isVerifying ? "Verifying data .." : k.buttonText }}
                    </button>
                    <button
                      v-else
                      :disabled="
                        profileData?.tierName?.toLowerCase() !==
                          n.prerequisite || isVerifying
                      "
                      @click="openModal(k.key)"
                      class="underline py-[1px] text-[#2E90FA] text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ isVerifying ? "Verifying data" : k.buttonText }}
                    </button>
                  </span>
                  <AppStatusButton
                    v-else
                    status="verified"
                    :mini="true"
                    stattype="textstattus"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #default>
      <div class="p-6 rounded-xl">
        <Tier3Business
          v-if="authStore.userInfo.customerType?.toLowerCase() === 'business'"
          @close="getData()"
        />
        <Tier3Personal
          v-if="authStore.userInfo.customerType?.toLowerCase() === 'individual'"
          @close="getData()"
        />
      </div>
    </template>
  </ModalCenter>
</template>

<script setup>
import { useRoute } from "vue-router";

import {
  verifyTier2,
  getTierStatus,
  getTierLimits,
} from "~/services/authservices";
import Tier3Business from "./Tier3Business.vue";
import Tier3Personal from "./Tier3Personal.vue";

const showing = ref(1);
const isOpen = ref(false);
const isVerifying = ref(false);
const authStore = useAuthStore();
const config = useRuntimeConfig();

const TierData = ref([
  {
    label: "Tier 1",
    options: [
      {
        label: "Bank Verification Number",
        status: "verified",
        buttonText: "Provide BVN",
        key: "bvn",
        config_id: config.public.BVN_KEY,
        valueKey: "isBvnVerified",
      },
    ],
    isOpen: false,
    status: "none",
    prerequisite: "tier0",
  },
  {
    label: "Tier 2",
    options: [
      {
        label: "Residential Address",
        status: "verified",
        buttonText: "Upload Utility Bill",
        key: "address",
        config_id: config.public.BVN_KEY,
        type: 1,
        valueKey: "addressMatches",
      },
      {
        label: "Date of Birth",
        status: "verified",
        buttonText: "Provide your DOB",
        key: "dob",
        config_id: config.public.BVN_KEY,
        type: 1,
        valueKey: "isDOBVerified",
      },
      {
        label: "National Identification Number",
        status: "none",
        buttonText: "Provide NIN",
        key: "nin",
        config_id: config.public.NIN_KEY,
        type: 0,
        valueKey: "isNinVerified",
      },

      {
        label: "Face  Verification",
        status: "none",
        buttonText: "Upload ID",
        key: "identity",
        config_id: config.public.BVN_KEY,
        type: 2,
        valueKey: "isBvnFaceVerified",
      },

      {
        label: "Government ID",
        status: "none",
        buttonText: "Provide Government ID",
        key: "govtId",
        config_id: config.public.GOVT_KEY,
        type: 1,
        valueKey: "isConfirmedGovernmentId",
      },
    ],
    isOpen: false,
    status: "none",
    prerequisite: "tier1",
  },
  {
    label: "Tier 3",
    options: [
      {
        label: "Documents verification",
        status: "none",
        buttonText: "Upload Document",
        key: "documents",
        type: 1,
        valueKey: "utilityBillWithinThreeMonths",
      },
    ],
    status: "none",
    isOpen: false,
    prerequisite: "tier2",
  },
]);
const profileData = ref(null);

const type = ref(null);
const limitData = ref([
  {
    label: "Daily Transaction Limit:",
    key: "DailyDebitLimit",
  },
  {
    label: "Maximum Account Balance:",
    key: "BalanceLimit",
  },
]);
const limits = ref(null);
const isLoading = ref(false);
onMounted(() => {
  getData();
});
function openModal(key) {
  showing.value = key;
  isOpen.value = true;
}
async function getData() {
  try {
    const tierStatusResponse = await getTierStatus();
    if (tierStatusResponse.status === 200) {
      const tier = tierStatusResponse.data.data?.tierName?.toLowerCase();
      profileData.value = tierStatusResponse.data.data;
      authStore.setTier(tier);

      const nextTierIndex = tierStatusResponse.data.data?.tier + 1;
      if (!TierData.value[nextTierIndex]?.isOpen) {
        openTab(nextTierIndex);
      }

      const tierLimitsResponse = await getTierLimits({
        userType: authStore.userInfo.customerType === "individual" ? 0 : 1,
        tierLevel: tier,
      });

      if (tierLimitsResponse.status === 200) {
        limits.value = tierLimitsResponse.data;
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isVerifying.value = false;
  }
}
function openTab(index) {
  TierData.value[index].isOpen = !TierData.value[index].isOpen;
}
function onModalClose() {}

function onSuccess(response) {
  const data = {
    verificationType: type.value,
    jsonResponse: response.channel,
  };
  console.log("Data", data);
  isVerifying.value = true;
  verifyTier2(data);
  getData();
}
function clickVerify(config_id) {
  const data = {
    merchant_key: "live_pk_PgbSjJl15Wt95osJXhfgQt2KqRJHaWv0ZhSTN2t",
    first_name: authStore.userInfo.firstName,
    last_name: authStore.userInfo.lastName,
    email: authStore.userInfo.email,
    config_id,
    user_ref: `${authStore.userInfo.id}_${type.value}`,
  };
  initiateVerify(data, onSuccess, onModalClose);
}
provide("isOpen", isOpen);
</script>
