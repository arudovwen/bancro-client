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

      <form @submit.prevent="onSubmit">
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
            btnClass="text-white bg-danger-500 !py-3 !rounded-lg font-semibold "
          />
        </div>
      </form>
      <div class="text-center text-sm">
        <NuxtLink to="/auth/login" class="text-[#64748B] font-semibold">
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
  title: "Forgot password | Cowry",
});
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { forgotPassword } from "~/services/authservices";

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

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  forgotPassword({ username: values.email })
    .then((res) => {
      if (res.status === 200) {
        toast.info("Otp sent, Check your email");
        navigateTo(`/auth/password-reset/${encodeURIComponent(values.email)}`);
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
