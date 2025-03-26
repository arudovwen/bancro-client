<template>
  <div v-if="stage == 1">
    <div class="text-left">
      <h1 class="text-[#101828] text-[30px] font-bold mb-1">Get Started 👋</h1>
      <p class="mb-7 text-[#475467]">
        To get started, we need to verify either your BVN to create an
        account for you
      </p>
    </div>
    <form
      @submit.prevent="onSubmit"
      v-if="activeForm == 1"
      class="grid gap-y-7"
    >
      <FormGroup
        label="Verification Method"
        :error="errors.kycType"
        name="kycType"
        isCumpulsory
      >
        <SelectVueSelect
          v-model="kycType"
          :options="options"
          :reduce="(kycType) => kycType.value"
          placeholder="Select verification type"
          :clearable="false"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.kycType ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <div class="w-full">
        <Textinput
          placeholder=""
          label="Enter your Personal BVN Number "
          name="number"
          v-bind="numberAtt"
          v-model="number"
          :error="errors.number"
        />
      </div>

      <div class="">
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          text="Submit"
          customLoadingMessage="Validating ..."
          btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold w-full"
        />
      </div>
      <span
        class="flex items-center text-center text-sm text-[#64748B] darks:text-white/80 gap-x-1 justify-center"
      >
        Already have an account?
        <span
          @click="() => navigateTo('/auth/login')"
          class="cursor-pointer font-semibold text-primary-500"
          >Login</span
        >
      </span>
    </form>
  </div>

  <AuthVerifyOtp v-if="stage == 2" />
</template>
<script setup>
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import * as yup from "yup";
import { verifyKyc } from "~/services/authservices.js";

const stage = ref(1);
const activeForm = inject("activeForm");
const userData = inject("userData");
const isLoading = ref(false);
const formValues = {
  kycType: 1,
  number: "",
};

const schema = yup.object({
  kycType: yup.number().required("Select a kycType"),
  number: yup.string().when("kycType", {
    is: 1,
    then: (schema) =>
      schema
        .required("Provide your BVN")
        .length(11, "BVN must be exactly 11 digits")
        .matches(/^\d+$/, "BVN must contain only digits"),
    otherwise: (schema) =>
      schema
        .required("Provide your NIN")
        .length(11, "NIN must be exactly 11 digits")
        .matches(/^\d+$/, "NIN must contain only digits"),
  }),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [number, numberAtt] = defineField("number");
const [kycType] = defineField("kycType");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  const data = {
    kycType: values.kycType,
    number: values.number,
  };
  verifyKyc(data)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Validation successful");
        userData.value = {
          ...res.data.data?.data,
          verificationId: res.data.data?.verification?.reference,
        };
        stage.value = 2;

        isLoading.value = false;
      }
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
      isLoading.value = false;
    });
});

const options = [
  {
    label: "Bank Verification Number",
    value: 1,
  },
  // {
  //   label: "National Identification Number",
  //   value: 0,
  // },
];

provide("stage", stage);
</script>
