<template>
  <section
    class="rounded-lg bg-white border border-[#EAECF0] flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-[60px]"
  >
    <div class="max-w-[600px] w-full">
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
      >
        <div>
          <Textinput
            :placeholder="isLoading ? 'Fetching...' : ''"
            label="First name"
            name="firstName"
            v-bind="firstNameAtt"
            v-model="firstName"
            :error="errors.firstName"
          />
        </div>
        <div>
          <Textinput
            :placeholder="isLoading ? 'Fetching...' : ''"
            label="Last name "
            name="lastName"
            v-bind="lastNameAtt"
            v-model="lastName"
            :error="errors.lastName"
          />
        </div>
        <div>
          <Textinput
            :placeholder="isLoading ? 'Fetching...' : ''"
            label="Email"
            type="email"
            name="email"
            v-bind="emailAtt"
            v-model="email"
            :error="errors.email"
          />
        </div>
        <div>
          <Textinput
            :placeholder="isLoading ? 'Fetching...' : ''"
            label="phone number"
            name="phone"
            v-bind="phoneAtt"
            v-model="phone"
            :error="errors.phone"
          />
        </div>

        <div class="md:col-span-2 flex justify-end mt-6">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Save changes"
            btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold "
          />
        </div>
      </form>
      <hr class="border-[#D0D5DD] my-7" />
      <SettingsPassword />
    </div>
  </section>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { getUserProfile } from "~/services/authservices";

const authStore = useAuthStore();
const isLoading = ref(false);
const formValues = reactive({
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
});

const schema = yup.object().shape({
  lastName: yup.string().required("Last name is required"),
  firstName: yup.string().required("First name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});
const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const [email, emailAtt] = defineField("email");
const [phone, phoneAtt] = defineField("phone");
const [firstName, firstNameAtt] = defineField("firstName");
const [lastName, lastNameAtt] = defineField("lastName");

onMounted(() => {
  isLoading.value = true;
  getUserProfile(authStore.userId).then((res) => {
    if (res.status === 200) {
      isLoading.value = false;
      isLoading.value = false;
      setFieldValue("firstName", res.data.firstName);
      setFieldValue("lastName", res.data.lastName);
      setFieldValue("email", res.data.email);
      setFieldValue("phone", res.data.phoneNumber);
    }
  });
});
</script>
