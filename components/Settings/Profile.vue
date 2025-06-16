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
      <div class="flex gap-x-4 items-end absolute z-10 left-[48px] top-[110px]">
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
            class="text-[#182230] block rounded-full text-xl font-semibold cursor-pointer mb-1"
          >
            {{ authStore.fullName || authStore.companyName }}
          </span>
          <span class="flex items-center text-sm gap-x-3">
            <!-- <span class="text-sm text-[#667085]">@laketu</span
            > -->
            <span
              class="border border-[#B2DDFF] bg-[#EFF8FF] text-xs text-[#175CD3] px-[6px] rounded-[6px] py-[2px] capitalize"
              >{{ TierOptions[authStore.tierLevel] }}</span
            ></span
          >
        </div>
      </div>
    </div>

    <div
      class="flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-12"
    >
      <PageHeader
        title="Personal Information"
        text="Update your personal details"
        className="!text-lg !text-[#3C4A67] mb-1"
        subClass=" !text-sm !text-[#667085]"
      />
      <div class="max-w-[700px] w-full">
        <form
          @submit.prevent="onSubmit"
          class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
        >
          <div v-if="firstName">
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="First name"
              name="firstName"
              v-bind="firstNameAtt"
              v-model="firstName"
              :error="errors.firstName"
            />
          </div>
          <div v-if="lastName">
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="Last name "
              name="lastName"
              v-bind="lastNameAtt"
              v-model="lastName"
              :error="errors.lastName"
            />
          </div>
          <div v-if="companyName">
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="companyName"
              name="companyName"
              v-bind="companyNameAtt"
              v-model="companyName"
              :error="errors.companyName"
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
              :is-readonly="true"
            />
          </div>

          <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="phone number"
              name="phoneNumber"
              v-bind="phoneNumberAtt"
              v-model="phoneNumber"
              :error="errors.phoneNumber"
            />
          </div>

          <div>
            <FormGroup
              name="gender"
              :error="errors.gender"
              label="Gender"
              isCumpulsory
              info
              infoTitle="Kindly select from the list the appropriate type of product package"
            >
              <SelectVueSelect
                v-model="gender"
                :options="GenderOptions"
                :reduce="(gender) => gender.value"
                placeholder="Select gender"
                :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] cursor-pointer ${
                  errors.title ? 'border-red-500' : 'border-[#D0D5DD]'
                }`"
              />
            </FormGroup>
          </div>

          <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="Date of birth"
              name="dateOfBirth"
              v-bind="dateOfBirthAtt"
              v-model="dateOfBirth"
              :error="errors.dateOfBirth"
            />
          </div>

          <!-- <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="Address"
              name="address"
              v-bind="addressAtt"
              v-model="address"
              :error="errors.address"
            />
          </div> -->

          <!-- <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="BVN"
              name="bvn"
              v-bind="bvnAtt"
              v-model="bvn"
              :error="errors.bvn"
            />
          </div>
          <div>
            <Textinput
              :placeholder="isLoading ? 'Fetching...' : ''"
              label="NIN"
              name="nin"
              v-bind="ninAtt"
              v-model="nin"
              :error="errors.nin"
            />
          </div> -->
          <div></div>

          <!-- <div class="flex justify-end mt-6">
            <AppButton
              type="submit"
              :isLoading="isLoading"
              :isDisabled="isLoading"
              text="Save changes"
              btnClass="text-primary-500 bg-[#9FE870] w-full !px-[114px] !py-[10px] !rounded-lg font-semibold "
            />
          </div> -->
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import moment from "moment";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { getUserProfile, updateProfile } from "~/services/authservices";

const authStore = useAuthStore();
const isLoading = ref(false);
const formValues = reactive({
  lastName: "",
  firstName: "",
  email: "",
  phoneNumber: "",
  gender: "",
  dateOfBirth: "",
  userId: authStore.userId,
  companyName: "",
});
const image = ref(null);
const schema = yup.object().shape({
  companyName: yup.string().nullable(),
  lastName: yup.string().nullable(),
  firstName: yup.string().nullable(),
  email: yup.string().email("Invalid email").nullable(),
  phoneNumber: yup.string().nullable(),
  gender: yup.string().nullable(),
  dateOfBirth: yup.date().nullable(),
});
const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const [email, emailAtt] = defineField("email");
const [phoneNumber, phoneNumberAtt] = defineField("phoneNumber");
const [firstName, firstNameAtt] = defineField("firstName");
const [lastName, lastNameAtt] = defineField("lastName");
const [gender] = defineField("gender");
const [dateOfBirth, dateOfBirthAtt] = defineField("dateOfBirth");
const [companyName, companyNameAtt] = defineField("companyName");

onMounted(() => {
  isLoading.value = true;
  getUserProfile(authStore.userId).then((res) => {
    if (res.status === 200) {
      isLoading.value = false;
      isLoading.value = false;
      const {
        avatarUrl,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber,
        email,
        companyName,
      } = res.data.data;
      const tempData = {
        avatarUrl,
        firstName,
        lastName,
        dateOfBirth: moment(dateOfBirth).format('l'),
        gender,
        phoneNumber,
        email,
        companyName,
      };
      Object.keys(tempData).forEach((key) => {
        setFieldValue(key, tempData[key]);
      });
    }
  });
});

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  isLoading.value = true;
  updateProfile(values)
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;
        toast.success("Profile update successful");
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
