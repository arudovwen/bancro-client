<template>
  <div class="bg-white w-full sm:min-w-[550px]">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      {{ detail ? "Update" : "Add" }} Representative
    </legend>
    <div class="">
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
      >
        <Textinput
          placeholder=""
          label="First name"
          name="Business name"
          v-bind="businessNameAtt"
          v-model="businessName"
          :error="errors.businessName"
        />
        <Textinput
          placeholder=""
          label="Middle name"
          name="Business name"
          v-bind="businessNameAtt"
          v-model="businessName"
          :error="errors.businessName"
        /><Textinput
          placeholder=""
          label="Last name"
          name="Business name"
          v-bind="businessNameAtt"
          v-model="businessName"
          :error="errors.businessName"
        />
        <Textinput
          placeholder=""
          label="Date of birth"
          name="Business name"
          v-bind="businessNameAtt"
          v-model="businessName"
          :error="errors.businessName"
          type="date"
        />
        <Textinput
          placeholder=""
          label="Email address"
          type="email"
          name="email"
          v-bind="emailAtt"
          v-model="email"
          :error="errors.email"
        />

        <FormGroup label="Relationship" :error="errors.gender" name="gender">
          <SelectVueSelect
            v-model="gender"
            :options="GenderOptions"
            :reduce="(gender) => gender.value"
            placeholder="Select gender"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
              errors.gender ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
          />
        </FormGroup>

        <Textinput
          placeholder=""
          label="BVN"
          name="phone"
          v-bind="phoneAtt"
          v-model="phone"
          :error="errors.phone"
        />

        <div>
          <Textinput
            placeholder=""
            label="NIN"
            name="phone"
            v-bind="phoneAtt"
            v-model="phone"
            :error="errors.phone"
          />
        </div>

        <div class="md:col-span-2 flex justify-between gap-x-4 mt-6">
          <AppButton
            type="button"
            @click="emits('close')"
            text="Cancel"
            btnClass=" w-full bg-transparent border border-gray-200 px-6 !py-[10px] !rounded-lg font-semibold "
          />
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Add director"
            btnClass="text-white bg-danger-500 px-6 !py-[10px] !rounded-lg font-semibold w-full"
          />
        </div>
      </form>
    </div>
  </div>
  <ActionModal
    :open="isSuccessOpen"
    type="success"
    title="Setllement Added"
    :text="errorText"
    btnText="Okay"
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
import { addSettlement, updateSettlement } from "~/services/settlementservice";
import { validateAccount } from "~/services/walletservice";

const emits = defineEmits(["refresh", "close"]);
const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const errorText = ref("Settlement creation failed");
const props = defineProps(["id", "detail"]);
const isOpen = inject("isOpen");
const handleSuccess = inject("handleSuccess");
const isLoading = ref(false);
const roles = ref([
  {
    label: "Admin",
    value: 0,
  },
]);
const loadingRoles = ref(false);
const formValues = reactive({
  id: null,
  role: "",
  email: "",
  accountName: "",
  isPrimaryAccount: false,
});

const schema = yup.object().shape({
  role: yup.string().required("Role name is required"),
  email: yup.string().required(),
});

const { handleSubmit, defineField, errors, setValues, setFieldValue } = useForm(
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
const [role] = defineField("role");
const [email, emailAtt] = defineField("email");
const [isPrimaryAccount, isPrimaryAccountAtt] = defineField("isPrimaryAccount");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  (!props.detail ? addSettlement : updateSettlement)(values)
    .then((res) => {
      if (res.status === 200) {
        emits("refresh");
        isLoading.value = false;
        isSuccessOpen.value = false;
        isOpen.value = false;
      }
    })

    .catch((err) => {
      errorText.value =
        err.response.data.message ||
        err.response.data.Message ||
        "Settlement creation failed";
      isErrorOpen.value = true;
      isLoading.value = false;
    });
});

// watch(email, () => {
//   validateAccount().then((res) => {});
// });
</script>
