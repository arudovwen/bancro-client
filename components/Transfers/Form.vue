<template>
  <form @submit.prevent="onSubmit" class="bg-white rounded-xl p-6">
    <h2 class="text-[#3C4A67] font-semibold text-xl mb-7">
      Transfer to Bank Account
    </h2>

    <div>
      <button
        type="button"
        @click="isOpen = true"
        :class="`min-w-[180px] px-[14px] w-full flex justify-between items-center !bg-white  !rounded-lg text-[#475467] h-12 cursor-pointer border border-[#C8D2DF]`"
      >
        <span class="text-[#AFBACA]">Search beneficiary</span>
        <span><AppIcon icon="humbleicons:chevron-down" /></span>
      </button>

      <div class="my-6 flex gap-x-3 items-center text-[#98A2B3] text-xs">
        <span class="flex-1 border-b border-[#C8D2DF]" />
        <span>OR</span>
        <span class="flex-1 border-b border-[#C8D2DF]" />
      </div>

      <div class="grid grid-cols-1 gap-y-4">
        <div>
          <Textinput
            placeholder=""
            label="Account number"
            name="recipientAccountNumber"
            v-bind="recipientAccountNumberAtt"
            v-model="recipientAccountNumber"
            :error="errors.recipientAccountNumber"
          />
        </div>
        <div>
          <FormGroup
            label="Select Bank"
            :error="errors.biller"
            name="recipientBankCode"
          >
            <SelectVueSelect
              v-model="recipientBankCode"
              :options="banks"
              :reduce="(bank) => bank.value"
              placeholder="Select bank"
              :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
                errors.recipientBankCode ? 'border-red-500' : 'border-[#D0D5DD]'
              }`"
            />
          </FormGroup>
        </div>

        <div>
          <div class="mb-3">
            <Textinput
              placeholder=""
              label="Account name"
              name="recipientAccountName"
              v-bind="recipientAccountNameAtt"
              v-model="recipientAccountName"
              :error="errors.recipientAccountName"
              :isReadonly="true"
              :disabled="true"
              :placeholder="isFetching ? 'Fetching account ...' : ''"
            />
          </div>
          <SwitchGroup>
            <div class="flex items-center gap-x-4">
              <Switch
                v-model="shouldSaveBeneficiary"
                :class="
                  values?.shouldSaveBeneficiary
                    ? 'bg-primary-500'
                    : 'bg-gray-200'
                "
                class="relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none"
              >
                <span
                  :class="
                    values?.shouldSaveBeneficiary
                      ? 'translate-x-4'
                      : 'translate-x-1'
                  "
                  class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform"
                />
              </Switch>
              <SwitchLabel class="!mb-0">Save beneficiary</SwitchLabel>
            </div>
          </SwitchGroup>
        </div>
        <div class="relative">
          <FormGroup label="Amount" :error="errors.amount" name="amount">
            <div class="relative items-center flex">
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
              />
              <span class="absolute right-4 text-sm text-[#344054]">NGN</span>
            </div>
          </FormGroup>
          <span
            class="absolute top-0 right-0 text-[11px] border-[#ABEFC6] border text-[#067647] rounded-[6px] px-[6px] py-[1px] bg-[#ECFDF3]"
            >Balance:
            <span class="font-medium">{{
              currencyFormat(authStore.savingsInfo?.accountBalance)
            }}</span></span
          >
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Narration"
            name="narration"
            v-bind="narrationAtt"
            v-model="narration"
            :error="errors.narration"
          />
        </div>
        <div class="mb-3 mt-4">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            text="Next"
            btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold w-full"
            :isDisabled="isLoading || !meta.valid"
          />
        </div>
      </div>
    </div>
    <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
      <template #default>
        <div class="p-6 rounded-xl">
          <TransfersBeneficiary @getValue="handleData" />
        </div>
      </template>
    </ModalCenter>
  </form>
</template>
<script setup>
import { useForm } from "vee-validate";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import * as yup from "yup";
import { getBanks, validateAccount } from "~/services/savingsservice";
import { toast } from "vue3-toastify";

const active = inject("active");
const isFetching = ref(false);
const isOpen = inject("isOpen");
const authStore = useAuthStore();
const banks = ref([]);
const isLoading = ref(false);

const formData = inject("formData");

const schema = yup.object().shape({
  amount: yup
    .number()
    .required("Amount is required")
    .min(1, "Amount must be greater than 0")
    .max(
      authStore.savingsInfo?.accountBalance,
      `Max amount is ${authStore.savingsInfo?.accountBalance}`
    ),

  recipientAccountNumber: yup
    .string()
    .required("Recipient account number is required")
    .min(10, "Account number must be 11")
    .max(10, "Account number must be 11")
    .matches(/^\d+$/, "Account number must be numeric"),

  recipientAccountName: yup
    .string()
    .required("Recipient account name is required")
    .min(2, "Account name must be at least 2 characters"),

  recipientBankCode: yup
    .string()
    .required("Recipient bank code is required")
    .length(3, "Bank code should be exactly 3 characters"),

  recipientBankName: yup
    .string()
    .required("Recipient bank name is required")
    .min(2, "Bank name must be at least 2 characters"),

  narration: yup.string().max(200, "Narration can be up to 200 characters"),

  shouldSaveBeneficiary: yup
    .boolean()
    .required("Indicate if beneficiary should be saved"),

});

const {
  handleSubmit,
  defineField,
  errors,
  setValues,
  setFieldValue,
  values,
  meta,
} = useForm({
  validationSchema: schema,
  initialValues: formData,
});

const [amount] = defineField("amount");
const [recipientAccountNumber, recipientAccountNumberAtt] = defineField(
  "recipientAccountNumber"
);
const [narration, narrationAtt] = defineField("narration");
const [recipientAccountName, recipientAccountNameAtt] = defineField(
  "recipientAccountName"
);
const [recipientBankCode] = defineField("recipientBankCode");
const [shouldSaveBeneficiary] = defineField("shouldSaveBeneficiary");

async function getAllBanks() {
  const response = await getBanks();
  banks.value = response.data.data.responseBody.map((i) => ({
    label: i.name,
    value: i.code,
  }));
}
const onSubmit = handleSubmit((values) => {
  formData.recipientBankName = values.recipientBankName;
  formData.recipientBankCode = values.recipientBankCode;
  formData.recipientAccountName = values.recipientAccountName;
  formData.recipientAccountNumber = values.recipientAccountNumber;
  formData.amount = values.amount;
  formData.narration = values.narration;
  active.value = 2;
  // isLoading.value = true;
});
watch(recipientBankCode, () => {
  const bank = banks.value.find((i) => i.value === recipientBankCode.value);
  if (bank) {
    setFieldValue("recipientBankName", bank.label);
  }
});
watch(
  () => [values.recipientAccountNumber, values.recipientBankCode],

  async () => {
    if (
      values.recipientAccountNumber.length == 10 &&
      values.recipientBankCode
    ) {
      try {
        isFetching.value = true;
        const response = await validateAccount({
          bankCode: values.recipientBankCode,
          accountNumber: values.recipientAccountNumber,
        });
        if (response.status === 200) {
          setFieldValue(
            "recipientAccountName",
            response.data.data.responseBody.accountName
          );
        }
      } catch (err) {
        console.log("🚀 ~ err:", err);
        toast.error(err.response.data.message);
      } finally {
        isFetching.value = false;
      }
    }
  }
);
onMounted(() => {
  getAllBanks();
});

function handleData(value) {
  setFieldValue("recipientBankName", value.bankName);
  setFieldValue("recipientBankCode", value.bankCode);
  setFieldValue("recipientAccountName", value.name);
  setFieldValue("recipientAccountNumber", value.accountNumber);
  isOpen.value = false;
}
</script>
