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
        Email Verification
      </h1>
      <p class="text-[#637381] text-sm mb-6 text-center">
        Enter the 6-Digit verification code sent to your registered email
        address. Check your inbox.
      </p>
      <form @submit.prevent="onSubmit">
        <div class="mb-5">
          <div class="mb-4">
            <Textinput
              v-model="token"
              v-bind="tokenAtt"
              :error="errors.token"
              required
              placeholder="Enter token"
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
            text="Verify code"
            btnClass="text-primary-500 bg-[#9FE870] !py-3 !rounded-lg font-semibold"
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
import { toast } from "vue3-toastify";
import * as yup from "yup";
import { resend2FA, signupVerify } from "~/services/authservices";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  title: {
    default: "Enter your transaction PIN",
  },
  numInput: {
    default: 6,
  },
  isLoading: {
    default: false,
  },
  subtext: {
    default:
      "We have sent an OTP to your email address and your registered mobile number",
  },
});

const route = useRoute();
const router = useRouter();

const form = reactive({
  token: "",
  email: route.params.email,
});

const schema = yup.object({
  token: yup.string().required("Token is required").min(6).max(6),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: { ...form, email: route.params.email },
});

const [token, tokenAtt] = defineField("token");

const countdown = ref(0);
const isResending = ref(false);
const isLoading = ref(false);

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;

  signupVerify(values)
    .then((res) => {
      if (res.status === 200) {
        if (!res.data.succeeded) {
          toast.error(res.data.message);
          isLoading.value = false;
          return;
        }
        toast.success("Email verification successful");
        router.push("/auth/login");
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
    resend2FA({ email: route.params.email }).then((res) => {
      if (res.status === 200) {
        // Start the countdown
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
    });
  }
}
</script>

<style>
/* Add any styles you need here */
</style>
