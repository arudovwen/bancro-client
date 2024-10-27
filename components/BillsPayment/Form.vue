<template>
  <form @submit.prevent="active = 2" class="bg-white rounded-xl p-6">
    <div>
      <div class="mb-[30px]">
        <TabSwitch :tabs="tabs" />
      </div>
      <div class="mb-[30px]">
        <h2 class="mb-4">Select network</h2>

        <div class="flex gap-x-10 items-center">
          <button
            type="button"
            @click="networkTab = network.value"
            v-for="network in networks"
            :key="network.value"
            :class="`rounded-full h-14 w-14 border-2 flex items-center justify-center ${
              networkTab === network.value
                ? 'border-[#9FE870]'
                : 'border-transparent'
            }`"
          >
            <img
              :src="network.imgUrl"
              class="w-14 h-14 rounded-full"
              width="56"
              height="56"
            />
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-y-4">
        <div>
          <Textinput
            placeholder=""
            label="Phone number"
            name="Phone number"
            v-bind="phoneNumberAtt"
            v-model="phoneNumber"
            :error="errors.phoneNumber"
          />
        </div>
        <div v-if="activeTab === 'data'" class="relative">
          <button
            type="button"
            @click="isOpen = true"
            :class="`min-w-[180px] px-[14px] w-full flex justify-between items-center !bg-white  !rounded-lg text-[#475467] h-12 cursor-pointer border border-[#C8D2DF]`"
          >
            <span class="" v-if="plan?.value">{{ plan.label }}</span>
            <span v-if="!plan.value" class="text-[#AFBACA]">Select Data</span>
            <span><AppIcon icon="humbleicons:chevron-down" /></span>
          </button>
        </div>
        <div class="relative">
          <Textinput
            placeholder=""
            label="Amount"
            name="amount"
            v-bind="amountAtt"
            v-model="amount"
            :error="errors.amount"
          />
        </div>

        <div class="mb-3 mt-4">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            text="Next"
            btnClass="text-primary bg-[#9FE870] !py-3 !rounded-lg font-semibold w-full"
            :isDisabled="isLoading"
          />
        </div>
      </div>
    </div>
  </form>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #default>
      <div class="p-6 rounded-xl">
        <AirtimeAndDataPlans
          @handleClick="
            (val) => {
              setFieldValue('plan', val);
              isOpen = false;
            }
          "
        />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const isOpen = ref(false);
const active = inject("active");
const activeTab = inject("activeTab");
const networkTab = inject("networkTab");
const tabs = [
  {
    label: "airtime",
    value: "airtime",
  },
  {
    label: "data",
    value: "data",
  },
];

const isLoading = ref(false);
const formValues = reactive({
  phoneNumber: "",
  amount: null,
  plan: null,
});

const schema = yup.object().shape({
  phoneNumber: yup.string().required(),
  amount: yup.string().required(),
  plan: yup.object().when("type", {
    is: "data",
    then: (schema) => schema.required().nullable(),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
});

const { handleSubmit, defineField, errors, setValues, setFieldValue } = useForm(
  {
    validationSchema: schema,
    initialValues: formValues,
  }
);
const [phoneNumber, phoneNumberAtt] = defineField("phoneNumber");
const [amount, amountAtt] = defineField("amount");
const [plan, planAtt] = defineField("plan");

watch(activeTab, () => {
  setFieldValue("plan", activeTab.value);
});
provide("isOpen", isOpen);
</script>
