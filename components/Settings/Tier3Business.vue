<template>
  <form @submit.prevent="onSubmit" v-if="active == 1" class="p-2 w-[420px]">
    <legend class="text-xl font-semibold mb-6 block text-[#344054]">
      Business Verification
    </legend>
    <div class="mb-5 w-full">
      <FormGroup
        label="Business Type"
        :error="errors.businessRegistrationType"
        name="businessRegistrationType"
        isCumpulsory
      >
        <SelectVueSelect
          v-model="businessRegistrationType"
          :options="options"
          :reduce="(businessRegistrationType) => businessRegistrationType.value"
          placeholder="Select business type"
          :clearable="false"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.businessRegistrationType
              ? 'border-red-500'
              : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
    </div>

    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="Registration Number"
        name="registrationNumber"
        v-bind="registrationNumberAtt"
        v-model="registrationNumber"
        :error="errors.registrationNumber"
      />
    </div>
    <div class="mb-5 w-full">
      <Textinput
        placeholder=""
        label="TIN Number"
        name="tin"
        v-model="tin"
        :error="errors.tin"
      />
    </div>
    <div class="mb-5">
      <FormGroup
        :error="errors.businessRegistrationDocument"
        label="Upload registration document"
        name="businessRegistrationDocument"
      >
        <FormsFileUploader
          title="Upload Registration Document"
          v-model="businessRegistrationDocument"
        />
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
import { uploadKyc } from "~/services/authservices";
import { toast } from "vue3-toastify";

const emits = defineEmits(["close"]);
const active = ref(1);
const isOpen = inject("isOpen");
const isLoading = ref(false);
const formValues = {
  userType: 1,
  businessRegistrationDocument: "",
  businessRegistrationType: "",
  registrationNumber: "",
  businessRegistrationDocument: "",
  tin: "",
  utilityBill: "null",
};

const schema = yup.object({
  businessRegistrationType: yup.string().required("Select a type"),
  registrationNumber: yup.string().required("Provide your ID number"),
  businessRegistrationDocument: yup.string().required(),
  tin: yup.string().required("Provide your TIN number"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [registrationNumber, registrationNumberAtt] =
  defineField("registrationNumber");
const [businessRegistrationType, businessRegistrationTypeAtt] = defineField(
  "businessRegistrationType"
);
const [businessRegistrationDocument] = defineField(
  "businessRegistrationDocument"
);
const [tin] = defineField("tin");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  uploadKyc(values).then((res) => {
    if (res.status === 200) {
      toast.success("Document submitted successfully");
      isLoading.value = false;
      step.value = 2;
      emits("close");
    } else {
      toast.error("Error submitting document");
      isLoading.value = false;
    }
  }).catch((err) => {
    toast.error(err.response.data.message || "Error submitting document");
    isLoading.value = false;
  }); 
});
const options = [
  {
    label: "Business Name (BN)",
    value: "BN",
  },
  {
    label: "Registered Company (RC)",
    value: "RC",
  },
  {
    label: "Incorporated Trustee (IT)",
    value: "IT",
  },

];
</script>
