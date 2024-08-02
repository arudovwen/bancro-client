<template>
  <div class="mb-7">
    <PageHeader title="Security" />
  </div>
  <section class="rounded-lg bg-white border border-[#EAECF0] overflow-hidden grid gap-y-6">
    <div
      class="flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-12 max-w-[960px]"
    >
      <PageHeader
        title="Change Password"
        text="Passwords must be at least 8 characters long"
        className="!text-lg !text-[#3C4A67] mb-1"
        subClass=" !text-sm !text-[#667085]"
      />
      <div class="flex-1">
        <form @submit.prevent="onSubmit">
          <div class="mb-10">
            <Textinput
              hasicon
              placeholder=""
              label="Current Password"
              type="password"
              name="currentPassword"
              v-model="currentPassword"
              v-bind="currentPasswordAtt"
              :error="errors.currentPassword"
            />
          </div>

          <div class="mb-10">
            <Textinput
              hasicon
              placeholder=""
              label="New Password"
              type="password"
              name="newPassword"
              v-model="newPassword"
              v-bind="newPasswordAtt"
              :error="errors.newPassword"
            />
          </div>

          <div class="mb-10">
            <Textinput
              hasicon
              placeholder=""
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              v-model="confirmPassword"
              v-bind="confirmPasswordAtt"
              :error="errors.confirmPassword"
            />
          </div>

          <div class="flex justify-end">
            <AppButton
              :disabled="isLoading"
              :isLoading="isLoading"
              btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold "
              type="submit"
              text=" Update password"
            />
          </div>
        </form>
      </div>
    </div>
    <hr class="border-[#2E90FA29]"/>
    <div
      class="flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-12 max-w-[960px]"
    >
      <PageHeader
        title="Transaction PIN"
        text="Set your 4-Digit PIN for authorizing transactions"
        className="!text-lg !text-[#3C4A67] mb-1"
        subClass=" !text-sm !text-[#667085]"
      />
      <div class="flex-1">
        <form @submit.prevent="onSubmit">
          <div class="mb-10">
            <Textinput
              hasicon
              placeholder=""
              label="Current Transaction PIN"
              type="password"
              name="currentPassword"
              v-model="currentPassword"
              v-bind="currentPasswordAtt"
              :error="errors.currentPassword"
            />
          </div>

          <div class="mb-10">
            <Textinput
              hasicon
              placeholder=""
              label="New Transaction PIN"
              type="password"
              name="newPassword"
              v-model="newPassword"
              v-bind="newPasswordAtt"
              :error="errors.newPassword"
            />
          </div>

          <div class="mb-10">
            <Textinput
              hasicon
              placeholder=""
              label="Confirm Transaction PIN"
              type="password"
              name="confirmPassword"
              v-model="confirmPassword"
              v-bind="confirmPasswordAtt"
              :error="errors.confirmPassword"
            />
          </div>

          <div class="flex justify-end">
            <AppButton
              :disabled="isLoading"
              :isLoading="isLoading"
              btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold "
              type="submit"
              text=" Update Transaction PIN"
            />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { changePassword } from "~/services/authservices";

const isOpen = ref(false);
const isLoading = ref(false);
const authStore = useAuthStore();
const formValues = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  userId: authStore.userId,
});

const schema = yup.object({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .nullable(),
  currentPassword: yup.string().required("Current Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [newPassword, newPasswordAtt] = defineField("newPassword");
const [currentPassword, currentPasswordAtt] = defineField("currentPassword");
const [confirmPassword, confirmPasswordAtt] = defineField("confirmPassword");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  changePassword(values)
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;
        toast.success("Password Reset successful");
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
