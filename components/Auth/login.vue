<template>
  <div class="">
    <h1 class="text-[#344054] font-semibold mb-5 text-2xl lg:text-4xl">
      Welcome Back
    </h1>
    <p class="text-[#667085] text-sm mb-6">
      We're eliminating the friction and bias of traditional financing,
      connecting business builders to capital at the click of a button.
    </p>

    <form @submit.prevent="onSubmit">
      <div class="mb-5 w-full">
        <Textinput
          icon="line-md:email"
          placeholder=""
          label="Email address"
          type="email"
          name="username"
          v-bind="usernameAtt"
          v-model="username"
          :error="errors.username"
        />
      </div>

      <div class="mb-10 w-full">
        <Textinput
          hasicon
          placeholder=""
          label="Password"
          type="password"
          name="password"
          v-model="password"
          v-bind="passwordAtt"
          :error="errors.password"
        />
      </div>
      <span class="flex items-center text-sm mb-5">
        <span class="font-semibold text-primary hover:underline pb-[1px]">
          <NuxtLink to="/auth/forgot-password">Forgot password?</NuxtLink></span
        >
      </span>
      <div class="grid gap-y-[22px] mb-6">
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          text="Login"
          btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold "
        />
      </div>

      <span
        class="xl:col-span-2 flex items-center text-center text-sm text-[#64748B] darks:text-white/80 gap-x-1 justify-center"
      >
        Don't have an account?
        <span
          @click="() => router.push('/auth/register')"
          class="cursor-pointer font-semibold text-primary-500"
          >Sign Up</span
        >
      </span>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { loginUser } from "~/services/authservices";

useHead({
  title: "Login | Bancro",
  meta: [{ name: "description", content: "Login | Bancro" }],
});

const isLoading = ref(false);
const formValues = {
  username: "",
  password: "",
  grantType: "password",
};

const schema = yup.object({
  username: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup.string().required("Password is required"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const authStore = useAuthStore();

const [username, usernameAtt] = defineField("username");
const [password, passwordAtt] = defineField("password");

const route = useRoute();
const router = useRouter();

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  navigateTo("/");
  return;
  loginUser(values)
    .then((res) => {
      if (res.status === 200) {
        authStore.setLoggedUser(res.data.data);

        toast.success("Login successful");
        if (route.query.redirected_from) {
          window.location.replace(route.query.redirected_from);
          return;
        }

        window.location.replace("/");
      }
    })

    .catch((err) => {
      console.log("🚀 ~ onSubmit ~ err:", err);
      isLoading.value = false;
      if (err?.response?.data?.message || err?.response?.data?.Message) {
        toast.error(
          err?.response?.data?.message || err?.response?.data?.Message
        );
      }
      // if (
      //   (err?.response?.data?.message || err?.response?.data?.Message)?.includes(
      //     "username has not verified yet"
      //   )
      // ) {
      //   router.push(
      //     `/auth/resend-verification/${encodeURIComponent(values.username)}`
      //   );
      // }
    });
});
</script>
