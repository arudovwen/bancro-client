<template>
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
            name="currentPin"
            v-model="currentPin"
            v-bind="currentPinAtt"
            :error="errors.currentPin"
          />
        </div>

        <div class="mb-10">
          <Textinput
            hasicon
            placeholder=""
            label="New Transaction PIN"
            type="password"
            name="newPin"
            v-model="newPin"
            v-bind="newPinAtt"
            :error="errors.newPin"
          />
        </div>

        <div class="mb-10">
          <Textinput
            hasicon
            placeholder=""
            label="Confirm Transaction PIN"
            type="password"
            name="confirmPin"
            v-model="confirmPin"
            v-bind="confirmPinAtt"
            :error="errors.confirmPin"
          />
        </div>

        <div class="flex justify-end">
          <AppButton
            :disabled="isLoading"
            :isLoading="isLoading"
            btnClass="text-white bg-danger-500 px-6 !py-[10px] !rounded-lg font-semibold "
            type="submit"
            text=" Update Transaction PIN"
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
import { changePin } from "~/services/authservices";

const isOpen = ref(false);
const isLoading = ref(false);
const authStore = useAuthStore();
const formValues = reactive({
  currentPin: "",
  newPin: "",
  confirmPin: "",
  userId: authStore.userId,
});

const schema = yup.object({
  newPin: yup
    .string()
    .required("Pin is required")
    .length(4, "Pin must be 4 digits")
    .matches(/^\d{4}$/, "Pin must be numeric"),
  
  currentPin: yup
    .string()
    .required("Pin is required")
    .length(4, "Pin must be 4 digits")
    .matches(/^\d{4}$/, "Pin must be numeric"),
  
  confirmPin: yup
    .string()
    .oneOf([yup.ref("newPin"), null], "Pins must match")
    .required("Confirm Pin is required")
    .length(4, "Pin must be 4 digits")
    .matches(/^\d{4}$/, "Pin must be numeric"),
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [newPin, newPinAtt] = defineField("newPin");
const [currentPin, currentPinAtt] = defineField("currentPin");
const [confirmPin, confirmPinAtt] = defineField("confirmPin");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  changePin(values)
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;
        resetForm();
        toast.success("Pin Reset successful");
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
