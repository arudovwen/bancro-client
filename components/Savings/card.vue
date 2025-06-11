<template>
  <div
    class="rounded-lg border border-[#F2F4F7] bg-white py-[15px] shadow-[0px_4px_8px_-2px_#1018281A] cursor-pointer"
  >
    <div class="px-4">
      <div class="flex justify-between items-center mb-5">
        <span class="text-sm font-semibold capitalize text-[#344054]"
          >Card Savings</span
        >
        <span
          class="text-xs px-[6px] py-[2px] rounded-[6px] bg-[#FFFAEB] border border-[#FEDF89] text-[#B54708] font-medium"
          >Regular Savings</span
        >
      </div>
      <span
        class="flex justify-between items-center text-sm mb-1 text-[#475467]"
      >
        <span class="block text-sm text-[#667085]"
          >Amount:<span class="font-medium ml-1">{{
            currencyFormat(detail?.amountRepaid)
          }}</span></span
        >
        <span class="block text-sm text-[#344054] font-medium">{{
          currencyFormat(detail?.amount - detail?.amountRepaid)
        }}</span></span
      >
      <div class="mb-4">
        <AppLine
          :value="getPercentage(detail?.amountRepaid, detail?.amount)"
        />
      </div>
      <div class="grid gap-y-2">
        <span class="flex justify-between items-center text-xs">
          <span class="block text-[#667085]"
            >Interest rate:
            <span class="font-medium text-[#666666] ml-1">{{
              detail?.interestRate
            }}</span></span
          >
          <span class="block text-[#101828] font-medium"
            >{{ detail?.daysLeft }}% p/a</span
          ></span
        >
        <span class="flex justify-between items-center text-xs">
          <span class="block text-[#667085]"
            >Interest accrued:
            <span class="font-medium text-[#666666] ml-1">{{
              detail?.interestRate
            }}</span></span
          >
          <span class="block text-[#101828] font-medium">{{
            currencyFormat(0)
          }}</span></span
        >
        <span class="flex justify-between items-center text-xs">
          <span class="block text-[#667085]"
            >Due date:
            <span class="font-medium text-[#666666] ml-1">{{
              detail?.interestRate
            }}</span></span
          >
          <span class="block text-[#101828] font-medium">{{
            moment().format("ll")
          }}</span></span
        >
      </div>
    </div>
    <div class="flex justify-end px-4 pt-3 mt-3 border-t border-[#ECF1F6]">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="text-primary bg-white border border-[#D0D5DD] !py-1 !px-3 !rounded font-semibold text-sm capitalize"
          >
            Actions
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none grid"
          >
            <template v-for="option in options" :key="option.key">
              <MenuItem v-slot="{ active }">
                <button
                  class="py-2 px-4 text-left"
                  type="button"
                  @click="
                    console.log('hfwlfof');
                    handleOpen(option.key);
                  "
                >
                  {{ option.label }}
                </button>
              </MenuItem>
            </template>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #default>
      <div class="p-6 rounded-xl max-w-[400px]">
        <SavingsFormTopup v-if="filter === 'topup'" />
        <SavingsFormWithdraw v-if="filter === 'withdraw'" />
      </div>
    </template>
  </ModalCenter>

  <ActionModal
    :open="isCloseOpen"
    type="confirm"
    title="Do you want to close this savings"
    btnText="Close savings"
    :isCancel="true"
    @actionItem="
      () => {
        isCloseOpen = false;
      }
    "
    @close="isCloseOpen = false"
  />
</template>
<script setup>
import moment from "moment";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

defineProps(["detail", "canRepay"]);
const isCloseOpen = ref(false);
const isLoading = ref(false);
const isOpen = ref(false);
const emits = defineEmits(["repayClick"]);
const filter = ref(null);
function getPercentage(part, total) {
  return (part / total) * 100;
}

const options = [
  {
    label: "Top-up",
    key: "topup",
  },
  {
    label: "Withdraw",
    key: "withdraw",
  },
  {
    label: "Close savings",
    key: "close",
  },
];

function handleOpen(option) {
  filter.value = option;
  option === "close" ? (isCloseOpen.value = true) : (isOpen.value = true);
}
provide("isOpen", isOpen);
</script>
