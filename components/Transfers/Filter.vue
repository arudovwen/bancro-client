<template>
  <form @submit.prevent="onSubmit" class="p-2 w-[410px]">
    <legend class="text-xl font-semibold mb-6 block text-[#344054] ">
      Filter
    </legend>
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
    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="Beneficiary bank"
        name="startDate"
        v-bind="startDateAtt"
        v-model="startDate"
        :error="errors.startDate"
      />
    </div>
    <div class="mb-8 w-full">
      <Textinput
        placeholder=""
        label="Transaction reference"
        name="endDate"
        v-bind="endDateAtt"
        v-model="endDate"
        :error="errors.endDate"
      />
    </div>
    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="Beneficiary account number"
        name="startDate"
        v-bind="startDateAtt"
        v-model="startDate"
        :error="errors.startDate"
      />
    </div>
    <div class="mb-8 w-full">
      <Textinput
        placeholder=""
        label="Amount"
        name="endDate"
        v-bind="endDateAtt"
        v-model="endDate"
        :error="errors.endDate"
      />
    </div>

    <div class="flex gap-x-4">
      <AppButton
        type="button"
        @click="isOpen=false"
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

const showing = inject("showing");
const isOpen = inject("isOpen");
const isLoading = ref(false);
const formValues = {
  startDate: "",
  endDate: "",
};

const schema = yup.object({
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [startDate, startDateAtt] = defineField("startDate");
const [endDate, endDateAtt] = defineField("endDate");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  showing.value = 2;
});
</script>
