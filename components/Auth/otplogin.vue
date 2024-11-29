<template>
  <div
    class="pt-0 lg:pt-0 w-full max-w-[500px] mx-auto grid flex-1 items-center"
  >
    <div class="w-full">
      <img
        src="/ic-email-inbox.svg"
        alt="password"
        class="w-[66px] h-auto block mx-auto mb-4"
      />
      <h1 class="text-[#344054] font-semibold mb-1 text-2xl text-center">
        OTP Verification
      </h1>
      <p class="text-[#637381] text-sm mb-6 text-center">
        Enter the 6-Digit verification code sent to your registered email
        address. Check your inbox.
      </p>
      <form @submit.prevent="onSubmit">
        <div class="mb-5">
          <div class="flex gap-x-2 justify-center mb-8">
            <v-otp-input
              ref="otpInput"
              v-model:value="otpToken"
              :input-classes="`otp-input w-12 h-12 flex items-center border border-matta-black/20 focus:border-[#4A5578] outline-none mx-1 rounded-md text-center text-sm `"
              separator=" "
              :num-inputs="6"
              :should-auto-focus="true"
              input-type="letter-numeric"
              :placeholder="['-', '-', '-', '-', '-', '-']"
            />
          </div>
        </div>
        <div class="text-right mb-4">
          <button
            @click="resendOTP"
            :disabled="isResending"
            type="button"
            class="text-primary-500 font-semibold text-sm"
          >
            Resend OTP
          </button>
          <span v-if="isResending"> ({{ countdown }} seconds)</span>
        </div>

        <div class="grid gap-y-[22px] mb-7">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Verify OTP"
            btnClass="text-primary-500 bg-[#9FE870] !py-3 !rounded-lg font-semibold"
          />
        </div>
      </form>
      <div class="text-center text-sm">
        <span @click="active = 1" class="text-[#64748B] font-semibold">
          Go back
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import * as yup from "yup";
import { loginVerifyOtp, resend2FA } from "~/services/authservices";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import VOtpInput from "vue3-otp-input";

const route = useRoute();
const authStore = useAuthStore();
const formValues = inject("formValues");
console.log("🚀 ~ formValues:", formValues);
const active = inject("active");
const form = reactive({
  otpToken: "",
  username: formValues.username || route.query.email,
});

const schema = yup.object({
  otpToken: yup.string().required("Token is required").min(6).max(6),
  username: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    ...form,
    username: formValues.username || route.query.email,
  },
});

const [otpToken] = defineField("otpToken");

const countdown = ref(0);
const isResending = ref(false);
const isLoading = ref(false);

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;

  loginVerifyOtp(values)
    .then((res) => {
      if (res.status === 200) {
        if (!res.data.succeeded) {
          toast.error(res.data.message);
          isLoading.value = false;
          return;
        }
        authStore.setLoggedUser(res.data.data);
        toast.success("Login successful");
        window.location.replace("/");
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
});

function resendOTP() {
  if (countdown.value === 0) {
    resend2FA({ email: formValues.username || route.query.email }).then(
      (res) => {
        if (res.status === 200) {
          // Start the countdown
          toast.info("OTP sent , check your email");
          countdown.value = 60;
          isResending.value = true;
          const interval = setInterval(() => {
            countdown.value--;
            if (countdown.value <= 0) {
              clearInterval(interval);
              isResending.value = false;
            }
          }, 1000);
        }
      }
    );
  }
}
</script>

<style>
/* Add any styles you need here */
</style>
