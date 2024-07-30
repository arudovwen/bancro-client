<template>
  <div class="p-6 max-w-[500px] mx-auto items-center grid flex-1">
    <div class="w-full">
  
      <h1 class="text-[#344054] font-semibold mb-5 text-4xl">
        Forgot password
      </h1>
      <p class="text-[#667085] text-sm mb-6">
        Don’t worry, it happens to the best of us. Provide your registered email
        address and we’ll get you sorted out.
      </p>

      <form @submit.prevent="onSubmit" v-if="!isSent">
        <div class="mb-5">
          <Textinput
            icon="line-md:email"
            placeholder=""
            label="Email address"
            type="email"
            v-bind="emailAtt"
            v-model="email"
            :error="errors.email"
          />
        </div>

        <div class="grid gap-y-[22px] mb-7">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Request password reset"
            btnClass="text-primary-500 bg-[#9FE870] !py-3 !rounded-lg font-semibold "
          />
        </div>
      </form>
      <div class="text-center text-sm">
        <NuxtLink to="/" class="text-[#64748B] font-semibold">
         Go back
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  title: "Forgot password | Bancro",
});
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";

import { forgotPassword } from "~/services/authservices";

const title1 = "Forgot password";
const title2 = "Check your email";
const text1 =
  "Enter the email associated with your account and we”ll send you instructions to reset your password";
const text2 =
  "We have sent an account activation link to your email address. Click on the link to activate your account.";
const isSent = ref(false);

const isLoading = ref(false);

const formValues = {
  email: "",
};

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [email, emailAtt] = defineField("email");
const route = useRoute();
const router = useRouter();

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  forgotPassword(values.email)
    .then((res) => {
      if (res.status === 200) {
        isSent.value = true;
        navigateTo(
          `/auth/reset-password?email=${email.value}&code=${encodeURIComponent(
            res.data
          )}`
        );
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err.response.data.message || err.response.data.Message) {
        toast.error(err.response.data.message || err.response.data.Message);
      }
    });
});
</script>
