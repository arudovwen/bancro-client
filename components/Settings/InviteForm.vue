<template>
  <div class="bg-white w-full sm:min-w-[350px]">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      {{ detail ? "Update" : "Invite" }} Member
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
      <FormGroup label="Role" :error="errors.role" name="role">
        <SelectVueSelect
          v-model="role"
          :disabled="loadingRoles"
          :options="roles"
          :reduce="(role) => role.value"
          :placeholder="loadingRoles ? 'Fetching list' : 'Select role'"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.role ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>

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
          :text="`${detail ? 'Update' : 'Send'}`"
          btnClass="normal-case btn-primary !py-3"
        />
      </div>
    </form>
  </div>
  <ActionModal
    :open="isSuccessOpen"
    type="success"
    title="Member Added"
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
import { inviteTenant, getRoles } from "~/services/authservices";

const authStore = useAuthStore()
const roles = ref([]);
const emits = defineEmits(["refresh", "close"]);
const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const errorText = ref("Invite failed");
const props = defineProps(["id", "detail"]);
const isOpen = inject("isOpen");
const handleSuccess = inject("handleSuccess");
const isLoading = ref(false);

const loadingRoles = ref(false);
const formValues = reactive({
  emailAddress: "",
  role: "",
  tenantId: authStore.tenantId
});

const schema = yup.object().shape({
  role: yup.string().required("Role is required"),
  emailAddress: yup.string().required(),
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
  getRoles().then((res) => {
    roles.value = res.data.data.filter(i=> i.toLowerCase() !== "superadmin" && i.toLowerCase() !== "owner").map((i) => ({ label: i, value: i }));
  });
});

const [emailAddress, emailAddressAtt] = defineField("emailAddress");
const [role, roleAtt] = defineField("role");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  inviteTenant(values)
    .then((res) => {
      if (res.status === 200) {
        emits("refresh");
        isLoading.value = false;
        isSuccessOpen.value = false;
        isOpen.value = false;
        toast.success("Invite sent")
      }
    })

    .catch((err) => {
      errorText.value =
        err.response.data.message ||
        err.response.data.Message ||
        "Invite failed";
      isErrorOpen.value = true;
      isLoading.value = false;
    });
});

// watch(emailAddress, () => {
//   validateAccount().then((res) => {});
// });
</script>
