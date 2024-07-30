<template>
  <div class="bg-white w-full sm:min-w-[350px]">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      {{ detail ? "Update" : "Create" }} Tenant
    </legend>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-y-6 w-full">
      <div>
        <Textinput
          placeholder=""
          label="Email"
          name="emailAddress"
          type="email"
          classInput="!h-[45px]"
          v-model="emailAddress"
          v-bind="emailAddressAtt"
          :error="errors.emailAddress"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Company name"
          name="companyName"
          classInput="!h-[45px]"
          v-model="companyName"
          v-bind="companyNameAtt"
          :error="errors.companyName"
        />
      </div>

      <div class="grid grid-cols-2 gap-x-4 mt-4">
        <button
          @click="isOpen = false"
          type="button"
          class="appearance-none leading-none px-5 lg:px-10 py-[10px] rounded-lg text-primary border-primary- border hover:bg-gray-300"
        >
          Cancel
        </button>
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          :text="`${detail ? 'Update' : 'Create'}`"
          btnClass="normal-case btn-primary !py-3"
        />
      </div>
    </form>
  </div>
  <ActionModal
    :open="isSuccessOpen"
    type="success"
    title="Signup Success"
    text="Tenant was added successfully"
    btnText="Close"
    :is-okay="true"
    :isCancel="false"
    @actionItem="
      () => {
        isSuccessOpen = false;
        handleSuccess();
      }
    "
    @close="handleSuccess"
  />
  <ActionModal
    :open="isErrorOpen"
    type="reject"
    title="Request Failed"
    :text="errorText"
    btnText="Retry"
    @actionItem="() => (isErrorOpen = false)"
    @close="() => (isOpen = false)"
  />
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { signupTenant,getRoles } from "~/services/authservices";
import { validateAccount } from "~/services/walletservice";

const emits = defineEmits(["refresh", "close"]);
const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const errorText = ref("Settlement creation failed");
const props = defineProps(["id", "detail"]);
const isOpen = inject("isOpen");
const handleSuccess = inject("handleSuccess");
const isLoading = ref(false);

const formValues = reactive({
  emailAddress: "",
  companyName: "",
});

const schema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  emailAddress: yup.string().required("Email is required"),
});

const { handleSubmit, defineField, errors, setValues } = useForm(
  {
    validationSchema: schema,
    initialValues: formValues,
  }
);
onMounted(() => {
  if (props.detail) {
    setValues(props.detail);
  }

});

const [emailAddress, emailAddressAtt] = defineField("emailAddress");
const [companyName, companyNameAtt] = defineField("companyName");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  signupTenant(values)
    .then((res) => {
      if (res.status === 200) {
        emits("refresh");
        isLoading.value = false;
        isSuccessOpen.value = true;
       
      }
    })

    .catch((err) => {
      errorText.value =
        err.response.data.message ||
        err.response.data.Message ||
        "Tenant creation failed";
      isErrorOpen.value = true;
      isLoading.value = false;
    });
});

// watch(emailAddress, () => {
//   validateAccount().then((res) => {});
// });
</script>
