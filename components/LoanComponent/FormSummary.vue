<template>
  <h2 class="text-xl font-medium text-[#182230] mb-3">Summary</h2>

  <div class="border-b mt-2 mb-7 border-[#D0D5DD]" />
  <form @submit.prevent="handleSubmit" class="bg-white rounded-xl">
    <div>
      <div class="grid grid-cols-1 gap-y-4">
        <div
          class="text-sm grid grid-cols-2 gap-4 border border-[#16330017] rounded-lg p-6 bg-[#1633000D]"
        >
          <span class="block" v-for="n in formObject1" :key="n.label">
            <span class="block text-[#667085] mb-[2px]">{{ n.label }}</span>
            <span class="block font-medium">{{ formData[n.key] || "-" }}</span>
          </span>
          <div class="col-span-2 border-b border-[#3440541A]" />
          <span class="block" v-for="n in formObject2" :key="n.label">
            <span class="block text-[#667085] mb-[2px]">{{ n.label }}</span>
            <span class="block font-medium">{{ formData[n.key] || "-" }}</span>
          </span>
          <div class="col-span-2 border-b border-[#3440541A]" />
          <span class="block" v-for="n in formObject3" :key="n.label">
            <span class="block text-[#667085] mb-[2px]">{{ n.label }}</span>
            <span class="block font-medium">{{ formData[n.key] || "-" }}</span>
          </span>
        </div>

        <div class="mb-3 mt-4 flex justify-end gap-x-4">
          <AppButton
            type="button"
            @click="activeForm--"
            text="Back"
            btnClass="text-primary bg-white border !py-[10px] px-20 min-w-[156px] !rounded-lg font-semibold"
            :isDisabled="isLoading"
          />
          <AppButton
            type="submit"
            :isLoading="isLoading"
            text="submit"
            btnClass="text-primary bg-[#9FE870] !py-[10px] !px-10 !rounded-lg min-w-[156px] font-semibold"
            :isDisabled="isLoading"
          />
        </div>
      </div>
    </div>
  </form>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false"  :canClose="false">
    <template #default>
      <div class="p-6 rounded-xl">
        <TransactionsStatus
          title="Application Sent"
          text="Your loan application has been submitted for processing."
          :canClose="false"
          @close="navigateTo('/loans')"
        />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import { toast } from "vue3-toastify";
import { postLoanRequest } from "~/services/loanservice";

const isOpen = ref(false);
const detail = inject("detail");
const formValues = inject("formValues");
const activeForm = inject("activeForm")
const formObject1 = [
  {
    label: "Loan type",
    key: "name",
  },
  {
    label: "Amount",
    key: "tempAmount",
  },
];
const formObject2 = [
  {
    label: "Interest rate",
    key: "",
  },
  {
    label: "Tenor",
    key: "tenor",
  },
];
const formObject3 = [
  {
    label: "Loan purpose",
    key: "purpose",
  },
  {
    label: "Identification",
    key: "",
  },
];
const isLoading = ref(false)
const formData = computed(() => ({
  ...formValues.one,
  documents:formValues.documents,
  others:formValues.others,
  tempAmount: currencyFormat(formValues.one.amount),
  ...detail.value,
}));
async function handleSubmit() {
  try {
    isLoading.value = true
    const response = await postLoanRequest({...formData.value, productId: formValues.value?.productId.toString()});
    if (response.status === 200) {
      isOpen.value = true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed");
  }finally{
    isLoading.value = false
  }
}
provide("isOpen", isOpen);
</script>
