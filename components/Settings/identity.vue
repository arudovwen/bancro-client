<template>
  <form @submit.prevent="onSubmit" v-if="active == 1" class="p-2 w-[420px]">
    <legend class="text-xl font-semibold mb-6 block text-[#344054]">
      Identity Verification
    </legend>
    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="Business Type"
        name="idType"
        v-bind="idTypeAtt"
        v-model="idType"
        :error="errors.idType"
      />
    </div>

    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="Registration Number"
        name="idNumber"
        v-bind="idNumberAtt"
        v-model="idNumber"
        :error="errors.idNumber"
      />
    </div>
    <div class="mb-5">
      <FormsFileUploader title="Upload Document" />
    </div>

    <div class="">
      <AppButton
        type="submit"
        :isLoading="isLoading"
        :isDisabled="isLoading"
        text="Upload"
        btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold w-full"
      />
    </div>
  </form>
  <ModalOtp
    v-if="active == 2"
    title="Verify OTP"
    subtext="A verification code has been sent to 0816272**** and ***********007@gmail.com"
    @handleSubmit="finalSubmit"
    @close="isOpen = false"
  />
  <TransactionsStatus
    v-if="active == 3"
    title="BVN Linked"
    text="Your BVN has been successfully liked to your account"
  />
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const active = ref(1);
const isOpen = inject("isOpen");
const isLoading = ref(false);
const formValues = {
  idNumber: "",
  idType: "",
  url: "",
};

const schema = yup.object({
  idType: yup.string().required("Select a type"),
  idNumber: yup.string().required("Provide your ID number"),
  url: yup.string().required(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [idNumber, idNumberAtt] = defineField("idNumber");
const [idType, idTypeAtt] = defineField("idType");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  active.value = 2;
});
const finalSubmit = () => {
  active.value = 3;
};
</script>
