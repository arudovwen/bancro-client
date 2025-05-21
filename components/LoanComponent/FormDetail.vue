<template>
  <div>
    <div
      v-if="detail"
      class="p-6 bg-white rounded-lg max-w-[344px] border-[#EAECF0] border shadow-[0px_12px_24px_-4px_#919EAB1F]"
    >
      <div class="flex gap-x-4 items-center mb-[11px]">
        <div>
          <img src="/images/loanimg.svg" class="w-10 h-10" alt="loan" />
        </div>

        <h5 class="block font-medium text-[#212B36] text-base">
          {{ detail?.name }}
        </h5>
      </div>
      <p class="text-sm text-[#637381] mb-4">
        {{ detail.description }}
      </p>

      <span class="flex gap-x-2 items-center mb-2"
        ><img src="/images/divide.svg" class="w-auto h-auto" alt="loan" /><span
          class="text-[#667085] text-xs"
          >Interest rate:</span
        >
        <span class="text-xs text-[#344054] font-medium"
          >{{ productDetail?.interestRatePerPeriod }}%</span
        ></span
      >
      <span class="flex gap-x-2 items-center"
        ><img
          src="/images/calendar.svg"
          class="w-auto h-auto"
          alt="calendar"
        /><span class="text-[#667085] text-xs">{{
          Object.keys(JSON.parse(detail?.tenors)).join(", ")
        }}</span>
      </span>
    </div>
  </div>
</template>
<script setup>
defineProps(["detail"]);
const productDetail = inject('productDetail')
</script>
