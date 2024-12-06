<template>
  <h2 class="text-xl font-medium text-[#182230] mb-3">Loan Details</h2>

  <div class="border-b mt-2 mb-7 border-[#D0D5DD]" />
  <form @submit.prevent="onSubmit" class="bg-white rounded-xl">
    <div>
      <div class="grid grid-cols-1 gap-y-4">
        <div>
          <FormGroup label="Loan Amount" :error="errors.amount" name="amount">
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
            <span class="block mt-[2px] text-sm text-[#5F738C]"
              >Max Amount: {{ currencyFormat(100000) }}</span
            >
          </FormGroup>
        </div>

        <div class="relative">
          <Textinput
            placeholder=""
            label="Loan purpose"
            name="purpose"
            v-bind="purposeAtt"
            v-model="purpose"
            :error="errors.purpose"
          />
        </div>
        <FormGroup label="Tenor" :error="errors.tenor" name="tenor">
          <SelectVueSelect
            v-model="tenor"
            :options="TenorOptions"
            :reduce="(tenor) => tenor.value"
            placeholder="Select tenor"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
              errors.status ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
          />
        </FormGroup>
        <!-- <FormGroup
          label="Bank Statement (Upload up to 6 months bank statement)"
          :error="errors.document"
          name="document"
        >
          <FormsFileUploader
            title="Format: PDF,CSV, XLSX"
            uploadTitle="Bank statement"
            fileUrl=""
            v-model="document"
          />
        </FormGroup> -->

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
            text="Next"
            btnClass="text-primary bg-[#9FE870] !py-[10px] !px-10 !rounded-lg min-w-[156px] font-semibold"
            :isDisabled="isLoading"
          />
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import CurrencyInput from "../CurrencyInput.vue";

const detail = inject("detail");
const formValues = inject("formValues");

console.log("🚀 ~ detail:", detail.value?.tenors);
const isOpen = ref(false);
// ample payload : {
//   "id": 0,
//   "name": "NYSC Loan",
//   "productId": "1",
//   "amount": 50000,
//   "purpose": "urgent 2k",
//   "tenor": 70,
//   "document": [
//     {
//       "documentName": "Signature",
//       "narration": "Testing document",
//       "viewUrl": "https://dev.gateway.matta.trade/uploads/c5a0484c-f86a-48f4-af4e-2d433e51537e.png",
//       "downloadUrl": "https://dev.gateway.matta.trade/uploads/c5a0484c-f86a-48f4-af4e-2d433e51537e.png",
//       "documentType": 0
//     }
//   ]
// }
const activeForm = inject("activeForm");
const TenorOptions = computed(() => {
  const ParsedTenors = detail.value?.tenors
    ? JSON.parse(detail.value?.tenors)
    : [];

  return Object.keys(ParsedTenors)?.map((key) => ({
    label: key,
    value: ParsedTenors[key],
  }));
});
const isLoading = ref(false);

const schema = yup.object().shape({
  amount: yup.string().required("Specify an amount"),
  purpose: yup.string().required("Specify your purpose"),
  tenor: yup.string().required("Select a tenor"),
  document: yup.string(),
});

const { handleSubmit, defineField, errors, setValues, setFieldValue } = useForm(
  {
    validationSchema: schema,
    initialValues: formValues.one,
  }
);
const [amount, amountAtt] = defineField("amount");
const [purpose, purposeAtt] = defineField("purpose");
const [tenor, tenorAtt] = defineField("tenor");
const [document] = defineField("document");
const onSubmit = handleSubmit((values) => {
  formValues.one = values;
  activeForm.value = 2;
});
</script>
