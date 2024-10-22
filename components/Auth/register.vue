<template>
  <div class="w-full">
    <h1 class="text-[#344054] font-semibold mb-5 text-2xl lg:text-4xl">
      Sign Up 👋
    </h1>
    <p class="text-[#667085] text-sm mb-6">Let’s get started</p>
    <div
      class="mb-[22px] border border-[#E4E7EC] rounded-[10px] bg-[#F9FAFB] flex items-center p-1"
    >
      <button
        v-for="n in tabs"
        :key="n.value"
        @click="setFieldValue('customerType', n.value)"
        class="font-semibold py-2 px-2 text-center justify-center text-xs md:text-sm flex items-center flex-1 capitalize rounded-[10px] lg:text-sm"
        :class="
          values.customerType === n.value
            ? 'bg-white text-[#344054] active'
            : 'text-[#667085]'
        "
      >
        {{ n.label }}
      </button>
    </div>

    <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-y-5">
      <div v-if="values?.customerType === 1">
        <Textinput
          placeholder=""
          label="Company name"
          type="text"
          name="companyName"
          v-bind="companyNameAtt"
          v-model="companyName"
          :error="errors.companyName"
        />
      </div>
      <div v-if="values?.customerType === 0">
        <Textinput
          placeholder=""
          label="First name"
          name="firstName"
          v-bind="firstNameAtt"
          v-model="firstName"
          :error="errors.firstName"
        />
      </div>
      <div v-if="values?.customerType === 0">
        <Textinput
          placeholder=""
          label="Last name"
          name="lastName"
          v-bind="lastNameAtt"
          v-model="lastName"
          :error="errors.lastName"
        />
      </div>
      <div>
        <Textinput
          icon="line-md:email"
          placeholder=""
          label="Email address"
          type="email"
          name="email"
          v-bind="emailAtt"
          v-model="email"
          :error="errors.email"
          iconPosition="left"
        />
      </div>

      <div>
        <Textinput
          placeholder=""
          label="Password"
          type="password"
          name="password"
          v-bind="passwordAtt"
          v-model="password"
          :error="errors.password"
          autocomplete="do-not-autofill"
          hasicon
        />
      </div>

      <div class="grid gap-y-[22px] mb-3 mt-4">
        <AppButton
          type="submit"
          :isLoading="isLoading"
          text="Create account"
          btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold "
          :isDisabled="isLoading"
        />
      </div>
      <span
        class="flex items-center text-center text-sm text-[#64748B] darks:text-white/80 gap-x-1 justify-center"
      >
        Already have an account?
        <span
          @click="() => router.push('/auth/login')"
          class="cursor-pointer font-semibold text-primary-500"
          >Login</span
        >
      </span>
    </form>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  title: "Register | Bancro",
});
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { signupUser } from "~/services/authservices";

const router = useRouter();
const tabs = [
  { label: "personal account", value: 0 },
  { label: "business account", value: 1 },
];
const isLoading = ref(false);
const formValues = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  password: "",
  customerType: 0,
};

const schema = yup.object({
  customerType: yup.number().required(),
  firstName: yup.string().when("customerType", {
    is: 0,
    then: (schema) => schema.required("First name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  lastName: yup.string().when("customerType", {
    is: 0,
    then: (schema) => schema.required("Last name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  companyName: yup.string().when("customerType", {
    is: 1,
    then: (schema) => schema.required("Company name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: yup.string().required("Password is required"),
});

const { handleSubmit, defineField, errors, setFieldValue, values } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [password, passwordAtt] = defineField("password");
const [firstName, firstNameAtt] = defineField("firstName");
const [lastName, lastNameAtt] = defineField("lastName");
const [email, emailAtt] = defineField("email");
const [companyName, companyNameAtt] = defineField("companyName");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  signupUser({ ...values })
    .then((res) => {
      if (res.status === 200) {
        if (!res.data.succeeded) {
          toast.error(res.data.message);
          isLoading.value = false;
          return;
        }
        toast.success("Signup successful");
        navigateTo(`/auth/email-verification/${encodeURIComponent(values.email)}`);
        isLoading.value = true;
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err?.response?.data?.message || err?.response?.data?.Message) {
        toast.error(
          err?.response?.data?.message || err?.response?.data?.Message
        );
      }
    });

  isLoading.value = true;
});
</script>

<style>
.active {
  box-shadow: 0px 1px 2px 0px #1018280f;
  box-shadow: 0px 1px 3px 0px #1018281a;
}
</style>
