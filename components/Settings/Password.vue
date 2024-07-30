<template>
  <div class="">
    <div class="flex-1">
      <form @submit.prevent="onSubmit">
        <div class="mb-10">
          <Textinput
            hasicon
            placeholder=""
            label="Old Password"
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
  userId: authStore.userId
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
