<template>
  <div class="">
    <h1 class="text-[#344054] font-semibold mb-5 text-2xl lg:text-4xl">
      Sign In 👋
    </h1>
    <p class="text-[#667085] text-sm mb-6">
      Welcome Back! Sign in with your registered email address and your password
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
const formValues = inject("formValues");

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

const active = inject("active");
const [username, usernameAtt] = defineField("username");
const [password, passwordAtt] = defineField("password");

const route = useRoute();
const router = useRouter();

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  formValues.username = values.username;
  loginUser(values)
    .then((res) => {
      if (res.status === 200) {
        if (!res.data.succeeded) {
          toast.error(res.data.message);
          isLoading.value = false;
          return;
        }

        toast.info("Verify Login Request");
        router.replace({
          path: route.path,
          query: { email: values.username },
        });
        active.value = 2;
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err?.response?.data?.message || err?.response?.data?.Message) {
        toast.error(
          err?.response?.data?.message || err?.response?.data?.Message
        );
      }
      if (
        (
          err?.response?.data?.message || err?.response?.data?.Message
        )?.includes(
          "You are yet to confirm your mail, ensure you confirm mail before you sign int"
        )
      ) {
        router.push(
          `/auth/email-verification/${encodeURIComponent(values.username)}`
        );
      }
    });
});
</script>
