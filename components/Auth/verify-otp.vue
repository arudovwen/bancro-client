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
        Enter the 6-Digit verification code sent to your registered phone
        number.
      </p>
      <form @submit.prevent="onSubmit">
        <div class="mb-5">
          <div class="flex justify-center mb-8 gap-x-2">
            <v-otp-input
              ref="otpInput"
              v-model:value="code"
              :input-classes="`otp-input w-12 h-12 flex items-center border border-matta-black/20 focus:border-[#4A5578] outline-none mx-1 rounded-md text-center text-sm `"
              separator=" "
              :num-inputs="6"
              :should-auto-focus="true"
              input-type="letter-numeric"
              :placeholder="['-', '-', '-', '-', '-', '-']"
            />
          </div>
        </div>
        <div class="mb-4 text-right">
          <button
            @click="resendOTP"
            :disabled="isResending"
            type="button"
            class="text-sm font-semibold text-primary-500 disabled:opacity-60 disabled:text-gray-500"
          >
            Resend OTP
          </button>
          <span v-if="isResending" class="text-xs"> ({{ countdown }} seconds)</span>
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
      <div class="text-sm text-center">
        <button
          type="button"
          @click="stage = 1"
          class="text-[#64748B] font-semibold"
        >
          Go back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import * as yup from "yup";
import {
  resendValidateOtp,
  signupValidateOtpPhone,
} from "~/services/authservices.js";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import VOtpInput from "vue3-otp-input";

const stage = inject("stage");
const route = useRoute();
const activeForm = inject("activeForm");
const userData = inject("userData");
const form = reactive({
  code: "",
});

const schema = yup.object({
  code: yup.string().required("Token is required").min(6).max(6),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    ...form,
  },
});

const [code] = defineField("code");

const countdown = ref(0);
const isResending = ref(false);
const isLoading = ref(false);

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;

  signupValidateOtpPhone({ ...values, smsPinId: userData.value.smsPinId })
    .then((res) => {
      if (res.status === 200) {
        if (!res.data.succeeded) {
          toast.error(res.data.message);
          isLoading.value = false;
          return;
        }
        activeForm.value = 2;
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err?.response?.data);
    });
});

function resendOTP() {
  if (countdown.value === 0) {
    resendValidateOtp(userData.value.number).then((res) => {
      if (res.status === 200) {
        toast.info("OTP sent , check your phone ");
        countdown.value = 60;
        userData.value.smsPinId = res.data.data;
        isResending.value = true;
        const interval = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            clearInterval(interval);
            isResending.value = false;
          }
        }, 1000);
      }
    });
  }
}
</script>

<style>
/* Add any styles you need here */
</style>
