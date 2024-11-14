<template>
  <div class="bg-white rounded-xl p-6">
    <h2
      class="text-[#3C4A67] font-semibold text-xl mb-7 flex items-center gap-x-7"
    >
      <span @click="active = 1"><AppIcon icon="uiw:arrow-left" /></span>
      Review purchase
    </h2>
    <div
      class="border border-primary-100/20 bg-primary-100/20 px-4 pt-8 rounded-lg mb-6"
    >
      <div class="mb-10 w-full">
        <!-- <div class="flex justify-center mb-3">
          <img
            :src="networks.find((i) => i.value === networkTab).imgUrl"
            class="w-14 h-14 rounded-full"
            width="56"
            height="56"
          />
        </div> -->
        <span
          class="block text-2xl font-semibold text-[#344054] text-center mb-[11px]"
          >{{ currencyFormat(1387) }}</span
        >
        <div class="flex justify-center gap-x-2 items-center">
          <span class="text-xs text-[#667085] capitalize"
            >DSTV Payment</span
          >
        </div>
      </div>

      <div class="border-t border-[#21231D1A] p-4 flex justify-between">
        <span class="flex items-center gap-x-4">
          <span class="block">
            <span class="text-sm text-[#98A2B3] block leading-normal mb-[2px]"
              >Bill ID</span
            >
            <span
              class="text-sm text-[#344054] font-medium block leading-normal"
              >0731082157</span
            >
          </span>
        </span>
      </div>
    </div>
    <div class="mb-8 w-full">
      <Textinput
        hasicon
        placeholder="****"
        label="Enter you 4-Digit PIN to complete this transaction"
        type="password"
        name="password"
      />
    </div>
    <div>
      <AppButton
        @click="isOpen = true"
        type="button"
        :text="`Buy`"
        btnClass="text-white bg-danger-500  !py-3 !rounded-lg font-semibold w-full"
      />
    </div>
  </div>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #default>
      <div class="p-6 rounded-xl">
        <TransactionsStatus
          title="Topup Successful"
          :text="`Your bill payment  was successful`"
          :canClose="false"
        />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
const isOpen = ref(false);
const active = inject("active");
const activeTab = inject("activeTab");
const networkTab = inject("networkTab");

provide("isOpen", isOpen);
</script>
