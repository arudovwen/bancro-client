<template>
  <div class="">
    <h1 class="text-[#344054] font-semibold mb-5 text-2xl lg:text-4xl">Sign Up 👋</h1>
    <p class="text-[#667085] text-sm mb-6">
      Clarity gives you the blocks and components you need to create a truly
      professional website.
    </p>

    <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-y-5">
      <div>
        <Textinput
          placeholder=""
          label="Company name"
          type="text"
          name="firstName"
          v-bind="firstNameAtt"
          v-model="firstName"
          :error="errors.firstName"
        />
      </div>
      <div v-if="route.params.type==='individual'">
        <Textinput
          icon="line-md:email"
          placeholder=""
          label="Full name"
          name="username"
          v-bind="usernameAtt"
          v-model="username"
          :error="errors.username"
          iconPosition="left"
        />
      </div>
      <div>
        <Textinput
          icon="line-md:email"
          placeholder=""
          label="Email address"
          type="email"
          name="username"
          v-bind="usernameAtt"
          v-model="username"
          :error="errors.username"
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
          :isDisabled="!agree || isLoading"
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
import {
  createTenant,
  registerInvitedUser,
  getInvite,
} from "~/services/authservices";

const agree = ref(false);
const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const formValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  role: route.params.type === "sign-up" ? "owner" : "",
  tenantId: route.params.tenantId,
};

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  tenantId: yup.string().required("Tenant Id is required"),
});
const schema1 = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  tenantId: yup.string().required("Tenant Id is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .nullable(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: route.params.type === "invite" ? schema1 : schema,
  initialValues: formValues,
});
const tenantUserDto = ref(null);
const [password, passwordAtt] = defineField("password");
const [firstName, firstNameAtt] = defineField("firstName");
const [lastName, lastNameAtt] = defineField("lastName");
const [phoneNumber, phoneNumberAtt] = defineField("phoneNumber");

const onSubmit = handleSubmit((values) => {
  navigateTo("/email-verification")
  isLoading.value = true;
  return;
  const data = {
    tenantUserDto: {
      emailAddress: tenantUserDto.value?.email,
      firstName: values?.firstName,
      lastName: values?.lastName,
      phoneNumber: values?.phoneNumber,
      tenantId: tenantUserDto.value?.tenantId,
      role: tenantUserDto.value?.role,
    },
    password: values.password,
    inviteCode: route.params.tenantId,
  };

  (route.params.type === "sign-up" ? createTenant : registerInvitedUser)(
    route.params.type === "sign-up" ? values : data
  )
    .then((res) => {
      if (res.status === 200) {
        toast.info(
          "Sign up successful, Check your email for login instructions"
        );
        navigateTo("/");
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err.response.data.message || err.response.data.Message) {
        toast.error(
          err.response.data.message ||
            err.response.data.Message ||
            "Something went wrong"
        );
      }
    });
});
onMounted(() => {
  if (route.params.type === "invite") {
    getInvite(route.params.tenantId).then((res) => {
      if (res.status === 200) {
        tenantUserDto.value = res.data.data;
      }
    });
  }
});
</script>
