<template>
  <div v-if="authStore.tierLevel"
    class="flex gap-x-4 items-center bg-[#172031] text-white px-5 py-3 rounded-lg flex-col lg:flex-row gap-y-4 text-center lg:text-left"
  >
    <span class="text-xs text-white"
      >You are currently on
      <span class="font-semibold underline">{{
        TierOptions[authStore.tierLevel]
      }}</span
      >. Upgrade your account to increase your account and transaction
      limit.</span
    >
    <AppButton
      @click="navigateTo('/settings/verifications')"
      btnClass="!text-xs !py-[6px] !px-3 bg-secondary-500 text-primary-500 !rounded font-medium"
      text="Upgrade now"
    />
  </div>
</template>
<script setup>
const authStore = useAuthStore();
</script>
