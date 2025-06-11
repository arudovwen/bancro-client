<template>
  <button
    class="rounded-lg border border-[#F2F4F7] bg-white py-3 px-4 shadow-[0px_4px_8px_-2px_#1018281A] cursor-pointer w-full"
  >
    <span class="px-4">
      <div class="flex items-center justify-between mb-5">
        <span class="text-sm font-semibold capitalize text-[#344054]">{{
          detail?.loanName
        }}</span>
        <span
          class="text-xs px-[6px] py-[2px] rounded-[6px] bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647] font-medium"
          >Active</span
        >
      </div>

      <span
        class="flex justify-between items-center text-sm mb-1 text-[#475467]"
      >
        <span class="block text-sm text-[#344054]"
          >Amount:<span class="ml-1 font-medium">{{
            currencyFormat(detail?.totalRepaymentAmount)
          }}</span></span
        >
        <span class="block text-sm text-[#344054] font-medium"
          >Left:
          {{
            currencyFormat(detail?.totalRepaymentAmount - detail?.amountRepaid)
          }}</span
        ></span
      >
      <div class="mb-4">
        <AppLine
          :value="
            getPercentage(detail?.amountRepaid, detail?.totalRepaymentAmount)
          "
        />
      </div>
      <span class="flex items-center justify-between text-xs">
        <span class="block text-[#344054]"
          >Interest rate:
          <span class="font-medium text-[#344054] ml-1"
            >{{ detail?.interestRate }}%</span
          ></span
        >
        <span class="block text-[#344054]">{{ detail?.tenor }}</span></span
      >
    </span>
    <span
      v-if="canRepay"
      class="flex justify-end px-4 pt-3 mt-3 border-t border-[#ECF1F6]"
    >
      <AppButton
        @click="emits('repayClick')"
        type="button"
        :isLoading="isLoading"
        text="Repay loan"
        btnClass="text-primary bg-[#9FE870] !py-1 !px-4 !rounded min-w-[100px] font-semibold"
        :isDisabled="isLoading"
      />
    </span>
  </button>
</template>
<script setup>
defineProps(["detail", "canRepay"]);
const isLoading = ref(false);
const emits = defineEmits(["repayClick"]);
function getPercentage(part, total) {
  return (part / total) * 100;
}
</script>
