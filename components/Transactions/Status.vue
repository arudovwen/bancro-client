<template>
  <div class="text-center w-[400px]">
    <div class="mb-5 flex items-center justify-center">
      <SvgFly v-if="status === 'success'" />
      <SvgFailed v-if="status === 'failed'" />
    </div>
    <h1 class="font-semibold text-2xl mb-[14px] text-[#212B36]">{{ title }}</h1>
    <p class="text-[#637381] mb-8">
      {{ text }}
    </p>
    <div class="">
      <AppButton
        type="button"
        text="Done"
        @click="
          isOpen = false;
          emits('close');
        "
        btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold w-full"
      />
    </div>
  </div>
</template>

<script setup>
const isOpen = inject("isOpen");
const emits = defineEmits(["close"]);

defineProps({
  status: {
    default: "success",
  },
  title: {
    default: "Email Sent",
  },
  text: {
    default:
      "Your statement of account has been sent to your registered email address",
  },
});
</script>
