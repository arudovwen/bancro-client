<template>
  <div class="bg-white rounded-xl p-6">
    <h2 class="text-[#3C4A67] font-semibold text-xl mb-[2px]">
      Recent Transfers
    </h2>
    <p class="text-xs text-[#6A6C6A] mb-6">
      Quickly send money to your recent beneficiaries
    </p>

    <div class="grid grid-cols-1 gap-y-[10px]">
      <div
        class="border border-primary-100/20 bg-primary-100/20 p-4 rounded-lg flex justify-between"
        v-for="n in 4"
        :key="n"
      >
        <span class="flex items-center gap-x-4">
          <SvgBeneficiary />
          <span class="block">
            <span
              class="text-sm text-[#344054] font-medium block leading-normal"
              >Ralph Edwards</span
            >
            <span class="text-sm text-[#98A2B3] block leading-normal"
              >0731082157 - Access Bank</span
            >
          </span>
        </span>
        <span
          class="text-sm text-[#344054] font-semibold block leading-normal"
          >{{ currencyFormat(46578) }}</span
        >
      </div>
    </div>
  </div>
</template>
