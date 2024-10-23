<template>
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
definePageMeta({ middleware: ["auth", "onboarding"] });

const route = useRoute();
const isSigniningOut = ref(false);

provide("isSigniningOut", isSigniningOut);
</script>
