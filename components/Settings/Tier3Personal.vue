<template>
  <form @submit.prevent="onSubmit" v-if="step == 1" class="p-2 w-[420px]">
    <legend class="text-xl font-semibold mb-6 block text-[#344054]">
      Address Verification
    </legend>

    <div class="mb-5">
      <FormGroup :error="errors.utilityBill" label="Utility Bill" name="utilityBill">
        <FormsFileUploader title="Upload Utility bill" v-model="utilityBill" />
      </FormGroup>
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
  
  <TransactionsStatus
    v-if="step == 2"
    title="Document Submitted"
    text="Your document  has been successfully submitted."
  />
</template>
<script setup>
import {  uploadKyc } from "~/services/authservices";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";

const emits = defineEmits(["close"]);
const step = ref(1);
const isLoading = ref(false);
const formValues = {
  userType: 0,
  utilityBill: "",
};

const schema = yup.object({
  userType: yup.number().required(),
  utilityBill: yup.string().required(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [utilityBill,] = defineField("utilityBill");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  uploadKyc(values).then((res) => {
    if (res.status === 200) {
    
      isLoading.value = false;
      step.value = 2;
      emits('close')
    } else {
      toast.error("Error submitting document");
      isLoading.value = false;

    }
  }).catch((err) => {
    toast.error(err.response.data.message || "Error submitting document");
    isLoading.value = false;
  }); 

});
</script>
