<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <div
    class="rounded-lg bg-white border border-[#EAECF0] flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-[35px]"
  >
    <div class="max-w-[600px] w-full">
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
        />

        <Textinput
          placeholder=""
          label="Last name "
          name="Business category"
          v-bind="businessCategoryAtt"
          v-model="businessCategory"
          :error="errors.businessCategory"
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

        <Textinput
          placeholder=""
          label="phone number"
          name="phone"
          v-bind="phoneAtt"
          v-model="phone"
          :error="errors.phone"
        />
        <FormGroup label="Gender" :error="errors.gender" name="gender">
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
        <div class="md:col-span-2">
          <Textinput
            placeholder=""
            label="Address"
            name="phone"
            v-bind="phoneAtt"
            v-model="phone"
            :error="errors.phone"
          />
        </div>

        <FormGroup
          label="State of residence"
          :error="errors.state"
          name="state"
        >
          <SelectVueSelect
            v-model="state"
            :options="states"
            :reduce="(state) => state.value"
            placeholder="Select state"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
              errors.state ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
          />
        </FormGroup>
        <FormGroup label="Citizenship" :error="errors.country" name="country">
          <SelectVueSelect
            v-model="country"
            :options="allcountries"
            :reduce="(country) => country.value"
            placeholder="Select Citizenship"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
              errors.country ? 'border-red-500' : 'border-[#D0D5DD]'
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

        <Textinput
          placeholder=""
          label="NIN"
          name="phone"
          v-bind="phoneAtt"
          v-model="phone"
          :error="errors.phone"
        />
        <div class="md:col-span-2 flex justify-end mt-6">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Save changes"
            btnClass="text-white bg-danger-500 px-6 !py-[10px] !rounded-lg font-semibold "
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
});
import { useForm } from "vee-validate";
import * as yup from "yup";
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "@/utils/countries.json";
import Lgas from "@/utils/lgastate.json";

const links = [
  {
    title: "Customers",
    url: "/customers",
  },
  {
    title: "Create personal account",
    url: "#",
  },
];

const isLoading = ref(false);
const formValues = reactive({
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  state: "",
  country: "",
  gender: "",
});

const schema = yup.object().shape({
  lastName: yup.string().required("Last name is required"),
  firstName: yup.string().required("First name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
});
const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const [email, emailAtt] = defineField("email");
const [phone, phoneAtt] = defineField("phone");
const [firstName, firstNameAtt] = defineField("firstName");
const [lastName, lastNameAtt] = defineField("lastName");
const [country, countryAtt] = defineField("country");
const [state, stateAtt] = defineField("state");
const [gender, genderAtt] = defineField("gender");

const allcountries = computed(() => {
  return CountryList.map((item) => {
    return {
      id: "",
      label: `${item.name}`,
      value: item.name,
    };
  });
});
const mystates = computed(() => {
  if (!country.value) return [];
  return countries.find(
    (item) => item.name.toLowerCase() == country.value.toLowerCase()
  ).states;
});

const states = computed(() => {
  return mystates.value.map((item) => {
    return {
      id: item.code,
      label: item.name,
      value: item.name,
    };
  });
});
</script>
