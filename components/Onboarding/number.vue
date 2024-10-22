<template>
  <div class="text-center">
    <span class="mb-4 flex justify-center">
      <svg
        width="73"
        height="73"
        viewBox="0 0 73 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M31.9071 6.78293L16.7292 12.4709C13.2313 13.7788 10.3721 17.9154 10.3721 21.6567V44.2563C10.3721 47.8455 12.7446 52.56 15.6342 54.7196L28.7133 64.4834C33.0021 67.7075 40.0587 67.7075 44.3475 64.4834L57.4267 54.7196C60.3163 52.56 62.6887 47.8455 62.6887 44.2563V21.6567C62.6887 17.9154 59.8296 13.7788 56.3316 12.4709L41.1538 6.78293C38.5683 5.84002 34.4316 5.84002 31.9071 6.78293Z"
          fill="#163300"
        />
        <path
          d="M36.1958 34.3709C36.2567 34.3709 36.3175 34.3709 36.3783 34.3709H36.4392H36.5C39.9979 34.2492 42.7354 31.4204 42.7658 27.8921C42.7658 24.3029 39.8459 21.3829 36.2567 21.3829C32.6675 21.3829 29.7475 24.3029 29.7475 27.8921C29.8083 31.39 32.5458 34.2492 36.1958 34.3709Z"
          fill="#163300"
        />
        <path
          d="M43.1613 40.7887C39.4808 38.3554 33.5191 38.3554 29.8083 40.7887C28.105 41.9446 27.1013 43.5871 27.1013 45.2904C27.1013 47.0241 28.0745 48.6058 29.8083 49.7617C31.6637 50.9783 34.0666 51.6171 36.4696 51.6171C38.8725 51.6171 41.3058 51.0087 43.1308 49.7617C44.8341 48.6058 45.8379 46.9633 45.8379 45.26C45.8684 43.5262 44.895 41.9446 43.1613 40.7887Z"
          fill="#163300"
        />
      </svg>
    </span>
    <h1 class="text-[#101828] text-[30px] mb-1">Hello {{authStore.fullName || authStore.companyName}}</h1>
    <p class="mb-7 text-[#475467]">
      Welcome Onboard. To get started, we need to verify either your BVN or NIN
      to create an account for you
    </p>
  </div>
  <form
    @submit.prevent="onSubmit"
    v-if="active == 1"
    class="px-8 py-10 bg-white rounded-lg border border-[#DFE5EC] grid gap-y-7"
  >
    <FormGroup
      label="Verification Method"
      :error="errors.method"
      name="method"
      isCumpulsory
    >
      <SelectVueSelect
        v-model="method"
        :options="options"
        :reduce="(method) => method.value"
        placeholder="Select verification type"
        :clearable="false"
        :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
          errors.method ? 'border-red-500' : 'border-[#D0D5DD]'
        }`"
      />
    </FormGroup>
    <div class="w-full">
      <Textinput
        placeholder=""
        label="Enter number"
        name="bvn"
        v-bind="bvnAtt"
        v-model="bvn"
        :error="errors.bvn"
      />
    </div>

    <div class="">
      <AppButton
        type="submit"
        :isLoading="isLoading"
        :isDisabled="isLoading"
        text="Verify"
        btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold w-full"
      />
    </div>
  </form>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const authStore = useAuthStore()
const active = inject("active");
const isLoading = ref(false);
const formValues = {
  method: "",
  bvn: "",
};

const schema = yup.object({
  method: yup.string().required("Select a  method"),
  bvn: yup.string().required("Provide your BVN"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [bvn, bvnAtt] = defineField("bvn");
const [method] = defineField("method");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  active.value = 2;
});

const options = [
  {
    label: "Bank Verification Number",
    value: "bvn",
  },
  {
    label: "National Identification Number",
    value: "nin",
  },
];
</script>
