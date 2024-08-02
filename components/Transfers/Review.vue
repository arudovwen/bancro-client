<template>
  <div class="bg-white rounded-xl p-6">
    <h2
      class="text-[#3C4A67] font-semibold text-xl mb-7 flex items-center gap-x-7"
    >
      <span @click="active=1"
        ><AppIcon icon="uiw:arrow-left"
      /></span>
      Review transfer
    </h2>
    <div
      class="border border-[#21231D1A] bg-[#A0E1E11A] px-4 pt-8 rounded-lg mb-6"
    >
      <div class="mb-10 w-full">
        <div class="flex justify-center mb-3">
          <SvgTransfer />
        </div>
        <span
          class="block text-3xl font-semibold text-[#344054] text-center mb-4"
          >{{ currencyFormat(13874747) }}</span
        >
        <div class="flex justify-center gap-x-2 items-center">
          <span class="text-xs text-[#667085]">Transfer Amount</span>
        </div>
      </div>

      <div class="border-t border-[#21231D1A] p-4 flex justify-between">
        <span class="flex items-center gap-x-4">
          <span class="block">
            <span class="text-sm text-[#98A2B3] block leading-normal mb-[2px]"
              >Beneficiary</span
            >
            <span
              class="text-sm text-[#344054] font-medium block leading-normal"
              >0731082157 - Access Bank - Ralph Edwards</span
            >
          </span>
        </span>
      </div>
      <div class="border-t border-[#21231D1A] p-4 flex justify-between">
        <span class="flex items-center gap-x-4">
          <span class="block">
            <span class="text-sm text-[#98A2B3] block leading-normal mb-[2px]"
              >Narration</span
            >
            <span
              class="text-sm text-[#344054] font-medium block leading-normal"
              >FX Change on Leatherback</span
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
        text="Confirm Transfer"
        btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold w-full"
      />
    </div>
  </div>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #default>
      <div class="p-6 rounded-xl">
        <TransactionsStatus
          title="Transaction Successful"
          text="Your transfer of N5,000.00 to Adeleke Laketu was successful"
          :canClose="false"
        />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
const isOpen = ref(false);
const active = inject("active")
provide("isOpen", isOpen);
</script>
