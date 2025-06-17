<template>
  <IdleTimer />
  <section class="flex w-screen h-screen">
    <div
      class="w-max h-full border-r border-[#ECECEC] bg-white min-w-[280px] hidden lg:inline"
    >
      <div class="pt-6 px-[25px] mb-10">
        <AppLogo imgClass="w-[120px]" />
      </div>
      <!-- sIDE BAR  -->
      <div>
        <AppSideBar />
      </div>
    </div>
    <div class="flex-1 bg-[#EFF2F4] h-full overflow-y-auto">
      <AppHeader />
      <div class="px-5 py-8 lg:px-8">
        <slot />
      </div>
    </div>
  </section>
  <AppLogout v-if="isSigniningOut" />
</template>
<script setup>
import {
  getSavingsAccountByUserid,
  getSavingsAccountClientByUserid,
  getAccountTier,
} from "~/services/savingsservice";
import { getTierStatus } from "~/services/authservices";
definePageMeta({ middleware: ["auth", "onboarding"] });

const authStore = useAuthStore();
const isSigniningOut = ref(false);
async function getData() {
  const response = await getSavingsAccountByUserid(authStore.userId);

  if (response.status === 200) {
    const data1 = response.data.data;
    authStore.setSavingsInfo(data1);
  }
}
function getTier() {
  getTierStatus().then((res) => {
    if (res.status === 200) {
      authStore.setTier(res.data.data?.tierName?.toLowerCase());
    }
  });
}

onMounted(() => {
  getData();
  getTier();
});
provide("isSigniningOut", isSigniningOut);
</script>
