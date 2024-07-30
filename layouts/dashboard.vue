<template>
  <section class="flex h-screen w-screen">
    <div class="w-max h-full border-r border-[#ECECEC] bg-white min-w-[280px]">
      <div class="pt-6 px-[25px] mb-10">
        <AppLogo imgClass="w-[150px]" />
      </div>
      <!-- sIDE BAR  -->
      <div>
        <AppSideBar />
      </div>
    </div>
    <div class="flex-1 bg-[#EFF2F4] h-full overflow-y-auto">
      <div
        class="bg-white border-b border-[#EDEFEB] flex justify-between py-4 px-[25px] items-center"
      >
        <span class="font-semibold capitalize text-lg"></span>
        <div class="flex gap-x-2 items-center">
          <Notifications /> <span class="h-10 w-10 rounded-full flex items-center justify-center"><SvgSettings /></span> <ProfileMenu />
        </div>
      </div>
      <div class="py-8 px-11">
        <slot />
      </div>
    </div>
  </section>
  <AppLogout v-if="isSigniningOut" />
</template>
<script setup>
definePageMeta({ middleware: "auth" });

const route = useRoute();
const isSigniningOut = ref(false);
function getHeader(value) {
  switch (value) {
    case "index":
      return "Dashboard";
      break;
    case "customers-customer-add":
      return "Add customer";
      break;
    case "customers-business":
      return "Add business";
      break;
    case "requests-create":
      return "Create requests";
      break;

    case "products-create":
      return "Create product";
      break;

    default:
      return value;
      break;
  }
}
provide("isSigniningOut", isSigniningOut);
</script>
