<template>
  <div
    class="rounded-lg bg-white border border-[#EAECF0] flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-[60px]"
  >
    <div class="flex-1">
      <div class="flex gap-x-3 items-center mb-10">
        <div class="flex items-center">
          <span>
            <span
              v-if="!image"
              class="h-24 w-24 rounded-full flex items-center text-sm justify-center bg-[#F1F3F5]"
              >Photo</span
            >
            <img
              v-else
              :src="image"
              class="h-24 w-24 rounded-full flex items-center justify-center bg-[#F1F3F5]"
            />
          </span>
        </div>
        <div class="flex items-center gap-x-3">
          <label for="upload">
            <span
              class="text-[#344054] rounded-full px-1 py-3 text-sm cursor-pointer"
            >
              Upload logo
            </span>
            <input
              @change="handleEvent($event)"
              type="file"
              accept="image/*"
              id="upload"
              class="hidden"
            />
          </label>
        </div>
      </div>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 max-w-[600px]"
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
            label="Business category"
            name="Business category"
            v-bind="businessCategoryAtt"
            v-model="businessCategory"
            :error="errors.businessCategory"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Business Email"
            type="email"
            name="email"
            v-bind="emailAtt"
            v-model="email"
            :error="errors.email"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Business phone number"
            name="phone"
            v-bind="phoneAtt"
            v-model="phone"
            :error="errors.phone"
          />
        </div>
        <div class="md:col-span-2">
          <Textarea
            placeholder=""
            label="Business description"
            name="description"
            v-bind="descriptionAtt"
            v-model="description"
            :error="errors.description"
          />
        </div>
        <div class="">
          <Textinput
            placeholder=""
            label="Website"
            name="website"
            v-bind="websiteAtt"
            v-model="website"
            :error="errors.website"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Address"
            name="address"
            v-bind="addressAtt"
            v-model="address"
            :error="errors.address"
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
        <div class="md:col-span-2 flex justify-end mt-6">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Save changes"
            btnClass="text-primary-500 bg-[#9FE870] !py-3 !rounded-lg font-semibold "
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import countries from "~/utils/countries.json";
import CountryList from "country-list-with-dial-code-and-flag";
import Lgas from "~/utils/lgastate.json";

const store = useAuthStore();
const deleteText = ref("");
const isShowing = ref("crop");
const open = ref(false);
const img = ref("");
const image = ref(null);
const route = useRoute();
const isOpen = ref(false);
const formValues = reactive({
  photo: "",
  businessName: "",
  businessCategory: "",
  country: "",
  state: "",
  lga: "",
  email: "",
  phone: "",
  description: "",
  address: "",
  website: "",
});

const schema = yup.object().shape({
  photo: yup.string().required("Photo is required"),
  businessName: yup.string().required("Business name is required"),
  businessCategory: yup.string().required("Business category is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("LGA is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),

  description: yup.string().required("Description is required"),
  address: yup.string().required("Address is required"),
  website: yup.string().url("Invalid URL").nullable(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const authStore = useAuthStore();
const [email, emailAtt] = defineField("email");
const [phone, phoneAtt] = defineField("phone");
const [businessName, businessNameAtt] = defineField("businessName");
const [businessCategory, businessCategoryAtt] = defineField("businessCategory");
const [address, addressAtt] = defineField("address");
const [website, websiteAtt] = defineField("website");
const [country, countryAtt] = defineField("country");
const [state, stateAtt] = defineField("state");
const [lga, lgaAtt] = defineField("lga");
const [description, descriptionAtt] = defineField("description");

const isLoading = ref(false);
onMounted(() => {});

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

const lgasOption = computed(() => {
  return Lgas.find(
    (i) => i?.state?.toLowerCase() === state?.value?.label?.toLowerCase()
  )?.lgas?.map((i) => {
    return { label: i, value: i };
  });
});

const fullName = computed(() => {
  return `${form.firstName} ${form.lastName}`;
});
</script>
