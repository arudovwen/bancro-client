<template>
  <form @submit.prevent="onSubmit" class="p-2 w-[410px]">
    <legend class="text-xl font-semibold mb-6 block text-[#344054]">
      Filter
    </legend>

    <!-- Start Date -->
    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="Date range"
        name="startDate"
        v-bind="startDateAtt"
        v-model="startDate"
        :error="errors.startDate"
      />
    </div>

    <!-- End Date -->
    <div class="mb-8 w-full">
      <Textinput
        placeholder=""
        label="Transaction status"
        name="endDate"
        v-bind="endDateAtt"
        v-model="endDate"
        :error="errors.endDate"
      />
    </div>

    <!-- Beneficiary Bank -->
    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="Beneficiary bank"
        name="beneficiaryBank"
        v-bind="beneficiaryBankAtt"
        v-model="beneficiaryBank"
        :error="errors.beneficiaryBank"
      />
    </div>
    <div class="flex mb-5 w-full gap-x-8 input">
      <Checkbox label="Debit" labelClass="text-xs md:text-sm" v-model="debit" :checked="debit" />

      <Checkbox
        label="Credit"
        labelClass="text-xs md:text-sm"
        v-model="credit"
        :checked="credit"
      />
    </div>

    <!-- Transaction Reference -->
    <div class="mb-8 w-full">
      <Textinput
        placeholder=""
        label="Transaction reference"
        name="transactionReference"
        v-bind="transactionReferenceAtt"
        v-model="transactionReference"
        :error="errors.transactionReference"
      />
    </div>

    <!-- Beneficiary Account Number -->
    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="Beneficiary account number"
        name="beneficiaryAccountNumber"
        v-bind="beneficiaryAccountNumberAtt"
        v-model="beneficiaryAccountNumber"
        :error="errors.beneficiaryAccountNumber"
      />
    </div>

    <!-- Amount -->
    <div class="mb-8 w-full">
      <Textinput
        placeholder=""
        label="Amount"
        name="amount"
        v-bind="amountAtt"
        v-model="amount"
        :error="errors.amount"
      />
    </div>

    <!-- Buttons -->
    <div class="flex gap-x-4">
      <AppButton
        type="button"
        @click="isOpen = false"
        :isLoading="isLoading"
        :isDisabled="isLoading"
        text="Clear"
        btnClass="text-[#344054] bg-white border border-[#D0D5DD] !py-3 !rounded-lg font-semibold w-full"
      />
      <AppButton
        type="submit"
        :isLoading="isLoading"
        :isDisabled="isLoading"
        text="Apply filter"
        btnClass="text-white bg-danger-500  border border-primary !py-3 !rounded-lg font-semibold w-full"
      />
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

// Injection of values from parent context
const showing = inject("showing");
const isOpen = inject("isOpen");
const isLoading = ref(false);
const emits = defineEmits(["apply"]);
// Define form values
const formValues = {
  startDate: "",
  endDate: "",
  beneficiaryBank: "",
  transactionReference: "",
  beneficiaryAccountNumber: "",
  amount: null,
  credit: true,
  debit: true,
};

// Yup validation schema
const schema = yup.object({
  startDate: yup.string(),
  endDate: yup.string(),
  beneficiaryBank: yup.string(),
  transactionReference: yup.string(),
  beneficiaryAccountNumber: yup.string(),
  credit: yup.boolean(),
  debit: yup.boolean(),
  amount: yup.number().positive("Amount must be positive").nullable(),
});

// Define fields
const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [startDate, startDateAtt] = defineField("startDate");
const [endDate, endDateAtt] = defineField("endDate");
const [beneficiaryBank, beneficiaryBankAtt] = defineField("beneficiaryBank");
const [transactionReference, transactionReferenceAtt] = defineField(
  "transactionReference"
);
const [beneficiaryAccountNumber, beneficiaryAccountNumberAtt] = defineField(
  "beneficiaryAccountNumber"
);
const [amount, amountAtt] = defineField("amount");
const [debit, debitAtt] = defineField("debit");
const [credit, creditAtt] = defineField("credit");

// Handle form submission
const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  emits("apply", values);
});
</script>
