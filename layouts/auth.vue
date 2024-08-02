<template>
  <div class="min-h-screen w-screen flex flex-col p-5">
    <div class="mb-10"><AppLogo imgClass="w-[160px] lg:!w-[180px]" /></div>
    <div class="flex-1 flex items-center justify-center">
      <div
        class="w-full lg:w-[80vw] max-h-[714px] grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-20 max-w-[1200px] mx-auto"
      >
        <div class="bg-[#163300A6] h-full w-full hidden lg:flex rounded-2xl">
          <img
            :src="
             active === 'personal account'
                ? '/individual.png'
                : '/business-signup.png'
            "
            class="object-cover w-full h-full rounded-2xl"
          />
        </div>
        <div class="h-full overflow-y-auto lg:overflow-y-hidden">
          <div class="max-w-[461px] mx-auto h-full flex items-center">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({ middleware: "auth" });
const route = useRoute();
const active = ref("personal account")
provide("active", active)
</script>
