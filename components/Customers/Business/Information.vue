<template>
  <div class="w-full">
    <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 w-full"
    >
      <div>
        <Textinput
          placeholder=""
          label="Business name"
          name="Business name"
          v-bind="businessNameAtt"
          v-model="businessName"
          :error="errors.businessName"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Incorporation date"
          name="Business name"
          v-bind="businessNameAtt"
          v-model="businessName"
          :error="errors.businessName"
          type="date"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Phone number"
          name="phone"
          v-bind="phoneAtt"
          v-model="phone"
          :error="errors.phone"
        />
      </div>
      <FormGroup label="Industry" :error="errors.gender" name="gender">
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

      <FormGroup
        label="Incorporation type"
        :error="errors.gender"
        name="gender"
      >
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
      <FormGroup
        label="Country of incorporation"
        :error="errors.country"
        name="country"
      >
        <SelectVueSelect
          v-model="country"
          :options="allcountries"
          :reduce="(country) => country.value"
          placeholder="Select country"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.country ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <div>
        <Textinput
          placeholder=""
          label="Incorporation number"
          name="Business category"
          v-bind="businessCategoryAtt"
          v-model="businessCategory"
          :error="errors.businessCategory"
        />
      </div>
      <div class="">
        <Textinput
          placeholder=""
          label="Website url"
          name="website"
          v-bind="websiteAtt"
          v-model="website"
          :error="errors.website"
        />
      </div>

      <div class="md:col-span-2">
        <Textinput
          placeholder=""
          label="Address"
          name="description"
          v-bind="descriptionAtt"
          v-model="description"
          :error="errors.description"
        />
      </div>

      <FormGroup label="State" :error="errors.state" name="state">
        <SelectVueSelect
          v-model="state"
          :disabled="!country"
          :options="states"
          :reduce="(state) => state.value"
          placeholder="Select state"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.state ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <div>
        <Textinput
          placeholder=""
          label="City"
          name="Business category"
          v-bind="businessCategoryAtt"
          v-model="businessCategory"
          :error="errors.businessCategory"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Zipcode"
          name="Business category"
          v-bind="businessCategoryAtt"
          v-model="businessCategory"
          :error="errors.businessCategory"
        />
      </div>

      <div class="flex items-end">
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          text="Create account"
          icon="uil:plus"
          btnClass="text-primary-500 bg-[#9FE870] !py-3 !rounded-lg font-semibold w-full"
        />
      </div>
    </form>
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
