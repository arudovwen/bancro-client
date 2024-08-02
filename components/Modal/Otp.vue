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
        {{ title }}
      </h1>
      <p class="text-[#637381] text-sm mb-6 text-center">
        {{ subtext }}
      </p>
      <form @submit.prevent="onSubmit">
        <div class="mb-5">
          <div class="flex gap-x-2 justify-center mb-8">
            <v-otp-input
              ref="otpInput"
              v-model:value="form.otp"
              :input-classes="`otp-input w-12 h-12 flex items-center border border-matta-black/20 focus:border-[#4A5578] outline-none mx-1 rounded-md text-center text-sm `"
              separator=" "
              :num-inputs="numInput"
              :should-auto-focus="true"
              input-type="letter-numeric"
              :placeholder="['o', 'o', 'o', 'o', 'o', 'o']"
            />
          </div>
        </div>

        <div class="grid gap-y-[22px] mb-7">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Verify code"
            btnClass="text-primary-500 bg-[#9FE870] !py-3 !rounded-lg font-semibold "
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import VOtpInput from "vue3-otp-input";
// import { resend2FA } from "~/services/authservices";

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
  email: {
    default: "",
  },
  subtext: {
    default:
      "We have sent an OTP to your email address and your registered mobile number",
  },
});
const emit = defineEmits(["handleSubmit", "close"]);

const form = reactive({
  otp: "",
});

const countdown = ref(0);
const isResending = ref(false);

async function onSubmit() {
  emit("handleSubmit", form.otp);
}
function resendOTP() {
  if (countdown.value === 0) {
    // resend2FA({ email: props.email }).then((res) => {
    //   if (res.status === 200) {
    //     // Start the countdown
    //     countdown.value = 60;
    //     isResending.value = true;
    //     const interval = setInterval(() => {
    //       countdown.value--;
    //       if (countdown.value <= 0) {
    //         clearInterval(interval);
    //         isResending.value = false;
    //       }
    //     }, 1000);
    //   }
    // });
    // Logic to actually resend the OTP can go here
  }
}
</script>
