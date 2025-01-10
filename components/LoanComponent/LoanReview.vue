<template>
  <h2 class="text-[#344054] font-semibold text-2xl mb-6">Review Loan Offer</h2>
  <div class="grid grid-cols-1 gap-y-2">
    <div
      class="text-sm grid grid-cols-1 gap-4 border border-[#16330017] rounded-lg px-5 p-4 bg-[#1633000D]"
    >
      <span
        class="block border-b border-[#3440541A] last:border-none pb-2"
        v-for="n in formObject"
        :key="n.label"
      >
        <span class="block text-[#667085] mb-[2px]">{{ n.label }}</span>
        <span class="block font-medium">{{ detail?.[n.key] }}</span>
      </span>
    </div>

    <div class="mb-3 mt-4 flex justify-end gap-x-4">
      <AppButton
        type="button"
        text="Reject terms"
        btnClass="text-primary bg-white border !py-[10px] px-20 min-w-[156px] !rounded-lg font-semibold"
        :isDisabled="isLoading"
        @click="updateStatus(false)"
      />
      <AppButton
        type="button"
      
        text="Accept terms"
        btnClass="text-primary bg-[#9FE870] !py-[10px] !px-10 !rounded-lg min-w-[156px] font-semibold"
        :isDisabled="isLoading"
        @click="updateStatus(true)"
      />
    </div>
  </div>
  <!-- <TransactionsStatus
    title="Review Sent"
    text="Your review has been submitted for processing."
    :canClose="false"
  /> -->
</template>
<script setup>
import { toast } from "vue3-toastify";
import { approveLoanOffer } from "~/services/loanservice";

const isLoading = ref(false);
const props = defineProps(["detail"]);
const formObject = [
  {
    label: "Amount",
    key: "amount",
  },
  {
    label: "Approved amount",
    key: "approvedAmount",
  },
  {
    label: "Loan Tenor",
    key: "tenor",
  },

  {
    label: "Interest rate",
    key: "interestRate",
  },
  {
    label: "Due Date",
    key: "",
  },

  {
    label: "Penalty",
    key: "",
  },
  {
    label: "Repayment Amount",
    key: "",
  },
  {
    label: "No of Repayment",
    key: "",
  },
];

function updateStatus(val) {
  isLoading.value = true;
  approveLoanOffer({
    offerId: props.detail.id,
    isApproved: val,
  })
    .then((res) => {
      if (res.status === 200) {
        toast.success("Request updated");
        isLoading.value = false;
      }
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
      isLoading.value = false;
    });
}
</script>
