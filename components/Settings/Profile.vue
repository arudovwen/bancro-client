<template>
  <div class="mb-7">
    <PageHeader title="Profile" />
  </div>
  <section class="rounded-lg bg-white border border-[#EAECF0] overflow-hidden">
    <div
      class="h-[140px] relative w-full mb-24"
      style="background: linear-gradient(91.73deg, #9fe870 0%, #079455 108.89%)"
    >
      <span
        :class="`bg-[url('/Noise.png')] absolute w-full top-0 left-0 h-full z-[1]`"
      />
      <span
        :class="`bg-[url('/pattern.png')] absolute w-full top-0 left-0 h-full z-[2]`"
      />
      <div
        class="flex gap-x-4 items-end absolute z-10 left-[48px] top-[110px]"
      >
        <div class="flex items-center">
          <label for="upload" class="!mb-0">
            <span
              v-if="!image"
              class="h-[120px] w-[120px] p-1 rounded-full flex items-center text-sm justify-center bg-gray-200 border-2 border-white"
              >Photo</span
            >
            <img
              v-else
              :src="image"
              class="h-full w-full rounded-full flex items-center justify-center bg-[#F1F3F5]"
            />
            <input
              @change="handleEvent($event)"
              type="file"
              accept="image/*"
              id="upload"
              class="hidden"
            />
          </label>
        </div>
        <div class="pb-1">
          <span
            class="text-[#182230] block rounded-full text-xl font-semibold  cursor-pointer mb-1"
          >
            Adeleke Laketu
          </span>
       <span class="flex gap-x-3 items-center text-sm"><span class="text-sm text-[#667085]">@laketu</span><span class="border border-[#B2DDFF] bg-[#EFF8FF] text-xs text-[#175CD3] px-[6px] rounded-[6px] py-[2px]">Tier 2</span></span>
        </div>
      </div>
    </div>

    <div
      class="flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-12"
    >
    <PageHeader title="Personal Information"  text="Update your personal details" className="!text-lg !text-[#3C4A67] mb-1" subClass=" !text-sm !text-[#667085]" />
      <div class="max-w-[700px] w-full">
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

          <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="Username"
              name="phone"
              v-bind="phoneAtt"
              v-model="phone"
              :error="errors.phone"
            />
          </div>

          <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="Gender"
              name="phone"
              v-bind="phoneAtt"
              v-model="phone"
              :error="errors.phone"
            />
          </div>

          <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="Date of birth"
              name="phone"
              v-bind="phoneAtt"
              v-model="phone"
              :error="errors.phone"
            />
          </div>

          <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="Address"
              name="phone"
              v-bind="phoneAtt"
              v-model="phone"
              :error="errors.phone"
            />
          </div>

          <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="BVN"
              name="phone"
              v-bind="phoneAtt"
              v-model="phone"
              :error="errors.phone"
            />
          </div>
          <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="NIN"
              name="phone"
              v-bind="phoneAtt"
              v-model="phone"
              :error="errors.phone"
            />
          </div>
<div></div>

          <div class="flex justify-end mt-6">
            <AppButton
              type="submit"
              :isLoading="isLoading"
              :isDisabled="isLoading"
              text="Save changes"
              btnClass="text-primary-500 bg-[#9FE870] w-full !px-[114px] !py-[10px] !rounded-lg font-semibold "
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
import { getUserProfile } from "~/services/authservices";

const authStore = useAuthStore();
const isLoading = ref(false);
const formValues = reactive({
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
});
const image = ref(null);
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
  // isLoading.value = true;
  // getUserProfile(authStore.userId).then((res) => {
  //   if (res.status === 200) {
  //     isLoading.value = false;
  //     isLoading.value = false;
  //     setFieldValue("firstName", res.data.firstName);
  //     setFieldValue("lastName", res.data.lastName);
  //     setFieldValue("email", res.data.email);
  //     setFieldValue("phone", res.data.phoneNumber);
  //   }
  // });
});
</script>
