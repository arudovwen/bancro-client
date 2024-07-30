<template>
  <div class="w-full">
    <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 w-full"
    >
      <div>
        <Textinput
          placeholder=""
          label="Email address"
          name="Business name"
          v-bind="businessNameAtt"
          v-model="businessName"
          :error="errors.businessName"
          type="email"
        />
      </div>
      <FormGroup label="Country" :error="errors.country" name="country">
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
      <div class="md:col-span-2">
        <Textarea
          placeholder=""
          label="Registered business address"
          name="description"
          v-bind="descriptionAtt"
          v-model="description"
          :error="errors.description"
        />
      </div>
      <div class="md:col-span-2">
        <Textarea
          placeholder=""
          label="Opening address"
          name="description"
          v-bind="descriptionAtt"
          v-model="description"
          :error="errors.description"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Tax Identification Number"
          name="Business name"
          v-bind="businessNameAtt"
          v-model="businessName"
          :error="errors.businessName"
        />
      </div>

      <FormGroup
        label="Nature of business"
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
      <FormGroup label="Number of staff" :error="errors.gender" name="gender">
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

      <div class="">
        <Textinput
          placeholder=""
          label="Shop name"
          name="website"
          v-bind="websiteAtt"
          v-model="website"
          :error="errors.website"
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
      <FormGroup
        v-if="country?.toLowerCase() == 'nigeria'"
        label="Lga"
        :error="errors.lga"
      >
        <SelectVueSelect
          class="w-full"
          v-model.value="lga"
          :options="lgasOption"
          placeholder="Select your lga"
          name="lga"
          :reduce="(lga) => lga.value"
        />
      </FormGroup>
      <FormGroup label="Bank name" :error="errors.gender" name="gender">
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
      <div>
        <Textinput
          placeholder=""
          label="Account number"
          name="description"
          v-bind="descriptionAtt"
          v-model="description"
          :error="errors.description"
        />
      </div>
      <div class="md:col-span-2">
        <Textinput
          placeholder=""
          label="Account name"
          name="description"
          v-bind="descriptionAtt"
          v-model="description"
          :error="errors.description"
        />
      </div>
      <div class="md:col-span-2 flex justify-between gap-4 mt-6">
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
          text="Next"
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
