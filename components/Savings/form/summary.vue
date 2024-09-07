<template>
  <h2 class="text-xl font-medium text-[#182230] mb-7">Savings Summary</h2>

 
  <form @submit.prevent="handleSubmit" class="bg-white rounded-xl">
    <div class="mb-6">
      <div class="grid grid-cols-1 rounded-lg  border border-[#1633000D] px-6 bg-[#1633000D]">
        <div
          v-for="n in formObject1"
          :key="n.label"
          class="text-sm border-b last:border-none border-[#3440541A]  py-4 "
        >
          <span class="block">
            <span class="block text-[#667085] mb-[2px]">{{ n.label }}</span>
            <span class="block font-medium">-</span>
          </span>
        </div>

     
      </div>
    </div>
    <div class="mb-3 mt-4 flex justify-end gap-x-4">
          <AppButton
            type="button"
            :isLoading="isLoading"
            text="Cancel"
            btnClass="text-primary bg-white border !py-[10px] px-20 min-w-[156px] !rounded-lg font-semibold"
            :isDisabled="isLoading"
          />
          <AppButton
            type="submit"
            :isLoading="isLoading"
            text="Start savings"
            btnClass="text-primary bg-[#9FE870] !py-[10px] !px-10 !rounded-lg min-w-[156px] font-semibold"
            :isDisabled="isLoading"
          />
        </div>
  </form>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #default>
      <div class="p-6 rounded-xl">
        <TransactionsStatus
          title="Savings Created"
          text="Your nysc savings has been created."
          :canClose="false"
          @close="navigateTo('/savings')"
        />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import { navigateTo } from 'nuxt/app';

const isOpen = ref(false);
const isLoading = ref(false);
const formObject1 = [
  {
    label: "Savings Name",
    key: "",
  },
  {
    label: "Amount",
    key: "",
  },

  {
    label: "Interest rate",
    key: "",
  },
  {
    label: "Maturity",
    key: "",
  },

  {
    label: "Estimated  returns",
    key: "",
  },
 
];

function handleSubmit() {
  isOpen.value = true;
}
provide("isOpen", isOpen);
</script>
