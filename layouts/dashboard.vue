<template>
  <IdleTimer />
  <section class="flex h-screen w-screen">
    <div
      class="w-max h-full border-r border-[#ECECEC] bg-white min-w-[280px] hidden lg:inline"
    >
      <div class="pt-6 px-[25px] mb-10">
        <AppLogo imgClass="w-[150px]" />
      </div>
      <!-- sIDE BAR  -->
      <div>
        <AppSideBar />
      </div>
    </div>
    <div class="flex-1 bg-[#EFF2F4] h-full overflow-y-auto">
      <AppHeader />
      <div class="py-8 px-5 lg:px-8">
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

definePageMeta({ middleware: ["auth", "onboarding"] });

const authStore = useAuthStore();
const route = useRoute();
const isSigniningOut = ref(false);
async function getData() {
  const response = await getSavingsAccountByUserid(authStore.userId);
  const response1 = await getSavingsAccountClientByUserid(authStore.userId);
  if (response.status === 200) {
    console.log("🚀 ~ getData ~ response.data.data:", response.data.data);
  }

  if (response1.status === 200) {
    const data1 = response1.data.data.savingsAccounts[0];

    authStore.setSavingsInfo(data1);
  }
}
function getTier() {
  getAccountTier().then((res) => {
    if (res.status === 200) {
      authStore.setTier(res.data.data?.toLowerCase());
    }
  });
}

onMounted(() => {
  getData();
  getTier();
});
provide("isSigniningOut", isSigniningOut);
</script>
