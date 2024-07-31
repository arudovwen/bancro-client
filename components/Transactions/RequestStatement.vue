<template>
  <form @submit.prevent="onSubmit" class="p-2 w-[420px]">
    <legend class="text-xl font-semibold mb-6 block text-[#344054]">
      Request statement of account
    </legend>
    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="Start date"
        name="startDate"
        v-bind="startDateAtt"
        v-model="startDate"
        :error="errors.startDate"
        type="date"
      />
    </div>
    <div class="mb-8 w-full">
      <Textinput
        placeholder=""
        label="End date"
        name="endDate"
        v-bind="endDateAtt"
        v-model="endDate"
        :error="errors.endDate"
        type="date"
      />
    </div>

    <div class="">
      <AppButton
        type="submit"
        :isLoading="isLoading"
        :isDisabled="isLoading"
        text="Request statement"
        btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold w-full"
      />
    </div>
  </form>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const showing = inject("showing");
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
