<template>
  <div
    v-if="!isSuccessOpen"
    class="bg-white w-full md:min-w-[400px] text-[#344054]"
  >
    <legend class="block text-[20px] font-bold mb-8 text-left">
      Loan Repayment
    </legend>
    <form @submit.prevent="onSubmit" class="grid w-full gap-y-4">
      <FormGroup
        label="Repayment type"
        :error="errors.repaymentType"
        name="repaymentType"
        isCumpulsory
      >
        <SelectVueSelect
          v-model="repaymentType"
          :options="options"
          :reduce="(repaymentType) => repaymentType.value"
          placeholder="Select repayment type"
          :clearable="false"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.repaymentType ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>

      <FormGroup
        label="Amount"
        :error="errors.amount"
        name="amount"
        :isCumpulsory="true"
      >
        <div class="relative flex items-center">
          <CurrencyInput
            min="1"
            :class="`outline-none px-[14px] py-[10px] min-w-[180px] w-full !bg-white disabled:bg-gray-50 border !rounded-lg !text-[#475467] !h-11 cursor-pointer placeholder:text-[14px] ${
              errors.amount ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
            v-model="amount"
            :options="{
              currency: 'ngn',
              currencyDisplay: 'hidden',
            }"
            :placeholder="`Amount left: ${currencyFormat(
              detail?.repaymentBalance || 0
            )}`"
            :disabled="repaymentType === 'full'"
          />
          <span class="absolute right-4 text-sm text-[#344054]">NGN</span>
        </div>
        <div
          v-if="
            amount > authStore.savingsInfo?.accountBalance &&
            active === 'wallet'
          "
          class="mt-2 text-sm text-red-500"
        >
          amount is more than your wallet balance
        </div>
      </FormGroup>

      <div class="grid gap-y-4">
        <button
          v-for="n in content"
          :key="n.label"
          @click="
            () => {
              active = n.value;
            }
          "
          type="button"
          :disabled="n.disabled"
          class="border border-[#D0D5DD] rounded-xl p-5 flex justify-between items-center text-left disabled:opacity-65"
        >
          <span class="flex items-center gap-x-3">
            <span class="text-xl"><AppIcon :icon="n.icon" /></span>
            <span class="text-sm font-medium">
              <span class="block font-medium">{{ n.label }}</span>
              <span v-if="n.value === 'wallet'" class="text-xs font-normal"
                >Balance:
                {{
                  currencyFormat(authStore.savingsInfo?.accountBalance || 0)
                }}</span
              >
            </span>
          </span>

          <span :class="active === n.value ? 'text-primary-500' : ''"
            ><AppIcon
              :icon="
                active === n.value
                  ? 'fa-solid:dot-circle'
                  : 'pepicons-pencil:circle-big'
              "
          /></span>
        </button>
      </div>
      <div class="mt-8">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AppButton
            type="button"
            :isDisabled="loading"
            @click="isOpen = false"
            text="Cancel"
            btnClass="normal-case bg-transparent border border-[#D0D5DD] rounded-lg !py-3"
          />
          <AppButton
            type="submit"
            :isLoading="loading"
            :isDisabled="
              isLoading ||
              (amount > authStore.savingsInfo?.accountBalance &&
                active === 'wallet')
            "
            text="Make payment"
            btnClass="normal-case  !py-3 text-primary bg-[#9FE870] "
          />
        </div>
      </div>
    </form>
  </div>
  <ActionModal
    :open="isSuccessOpen"
    type="success"
    title="Request Successful"
    text="Your payment is being processed, you will be notified as soon as it is completed"
    btn-text="Done"
    :isOkay="true"
    :isCancel="false"
    :canClose="false"
    @actionItem="
      () => {
        isOpen = false;
        isSuccessOpen = false;
      }
    "
  />
</template>
<script setup>
import { nanoid } from "nanoid";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
// import { getWalletBalance, walletRepayment } from "~/services/walletservice";
import { initiateVerify } from "~/utils/verification";
import { repayLoan } from "~/services/loanservice";

const refresh = inject("refresh");
const authStore = useAuthStore();
const active = ref("wallet");
const isOpen = inject("isOpen");
const isLoading = ref(false);
const data = ref(null);
const props = defineProps(["detail"]);
const isSuccessOpen = ref(false);
const formValues = {
  id: "",
  amount: null,
  repaymentType: "partial",
  max: props.detail?.repaymentBalance || 0,
};
const options = [
  {
    label: "Partial payment",
    value: "partial",
  },
  {
    label: "Full payment",
    value: "full",
  },
];
const schema = yup.object({
  amount: yup.number().required("Amount is required").max(yup.ref("max")),
  repaymentType: yup.string().required("Country is required"),
});
const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [amount] = defineField("amount");
const [repaymentType] = defineField("repaymentType");

const content = [
  {
    label: "Pay with Bank Card",
    value: "monnify",
    icon: "bi:credit-card",
    disabled: true,
  },
  {
    label: "Pay with Wallet Balance",
    value: "wallet",
    icon: "ph:wallet-bold",
  },
];
const loading = ref(false);
function onSuccess(response) {
  if (response.status?.toLowerCase() === "success") {
    isSuccessOpen.value = true;
    loading.value = false;
  }
}
function onModalClose() {
  loading.value = false;
  toast.error("Payment cancelled");
}
async function makePayment(values) {
  loading.value = true;
  data.value = {
    email: authStore.userInfo?.email,
    name: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`,
    amount: values?.amount,
    phoneNumber: authStore.userInfo?.phoneNumber,
    reference: `RPM-${props?.detail?.financeRequestNo}-${nanoid(6)}`,
    ...values,
  };
  const loanData = {
    transactionAmount: values.amount,
    loanRequestId: props.detail.id,
  };
  // if (active.value !== "monnify") {
  //   initiateVerify(data.value, onModalClose, onSuccess);
  // } else {
  try {
    const res = await repayLoan(loanData);
    if (res.status === 200) {
      isSuccessOpen.value = true;
      loading.value = false;
      refresh.value = !refresh.value;
    }
  } catch (err) {
    toast.error(err.response?.data?.message || err?.response?.data?.Message);
  } finally {
    loading.value = false;
  }
  // }
}

const onSubmit = handleSubmit((values) => {
  makePayment(values);
});
const balance = ref(null);
onMounted(() => {
  // getWalletBalance().then((res) => {
  //   if (res.status === 200) {
  //     balance.value = res.data.data;
  //   }
  // });
});

watch(repaymentType, () => {
  if (repaymentType.value === "full") {
    amount.value = props.detail?.repaymentBalance || 0;
  }
});
</script>
