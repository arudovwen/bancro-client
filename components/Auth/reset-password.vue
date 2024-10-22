<template>
  <div
    class="pt-0 lg:pt-0 w-full max-w-[500px] mx-auto grid flex-1 items-center"
  >
    <div class="w-full">
      <img src="/ic-password.svg" alt="password" class="w-[66px] h-auto block mx-auto mb-4" />
      <h1 class="text-[#344054] font-semibold mb-1 text-2xl text-center">Reset Password</h1>
      <p class="text-[#637381] text-sm mb-6 text-center">
        Set a new password to your account
      </p>
      <form @submit.prevent="onSubmit">
        <div class="mb-5">
          <Textinput
            hasicon
            placeholder=""
            label="New Password"
            type="password"
            v-model="newPassword"
            v-bind="newPasswordAtt"
            :error="errors.newPassword"
          />
        </div>
        <div class="mb-6">
          <Textinput
            hasicon
            placeholder=""
            label="Confirm Password"
            type="password"
            v-model="confirmPassword"
            v-bind="confirmPasswordAtt"
            :error="errors.confirmPassword"
          />
        </div>

        <div class="grid gap-y-[22px] mb-7">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Reset password"
            btnClass="text-primary-500 bg-[#9FE870] !py-3 !rounded-lg font-semibold "
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
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { resetPassword } from "~/services/authservices";

useHead({
  title: "Reset Password | Bancro",
});

const isLoading = ref(false);
const route = useRoute();
const router = useRouter();
const formValues = {
  confirmPassword: "",
  newPassword: "",
  email: route.params.email,
};

const schema = yup.object({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [newPassword, newPasswordAtt] = defineField("newPassword");
const [confirmPassword, confirmPasswordAtt] = defineField("confirmPassword");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  resetPassword(values)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Password Reset successful");
        router.push("/auth/login");
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
