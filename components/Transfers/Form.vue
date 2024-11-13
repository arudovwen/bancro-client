<template>
  <form @submit.prevent="active = 2" class="bg-white rounded-xl p-6">
    <h2 class="text-[#3C4A67] font-semibold text-xl mb-7">
      Transfer to Bank Account
    </h2>

    <div>
      <button
        type="button"
        @click="isOpen = true"
        :class="`min-w-[180px] px-[14px] w-full flex justify-between items-center !bg-white  !rounded-lg text-[#475467] h-12 cursor-pointer border border-[#C8D2DF]`"
      >
        <span class="text-[#AFBACA]">Search beneficiary</span>
        <span><AppIcon icon="humbleicons:chevron-down" /></span>
      </button>

      <div class="my-6 flex gap-x-3 items-center text-[#98A2B3] text-xs">
        <span class="flex-1 border-b border-[#C8D2DF]" />
        <span>OR</span>
        <span class="flex-1 border-b border-[#C8D2DF]" />
      </div>

      <div class="grid grid-cols-1 gap-y-4">
        <div>
          <Textinput
            placeholder=""
            label="Account number"
            name="Business name"
            v-bind="accountNumberAtt"
            v-model="accountNumber"
            :error="errors.accountNumber"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Select Bank"
            name="Business name"
            v-bind="accountNumberAtt"
            v-model="accountNumber"
            :error="errors.accountNumber"
          />
        </div>

        <div>
          <div class="mb-3">
            <Textinput
              placeholder=""
              label="Beneficiary name"
              name="Business name"
              v-bind="accountNumberAtt"
              v-model="accountNumber"
              :error="errors.accountNumber"
            />
          </div>
          <SwitchGroup>
            <div class="flex items-center gap-x-4">
              <Switch
                v-model="enabled"
                :class="enabled ? 'bg-primary-500' : 'bg-gray-200'"
                class="relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none"
              >
                <span
                  :class="enabled ? 'translate-x-4' : 'translate-x-1'"
                  class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform"
                />
              </Switch>
              <SwitchLabel class="!mb-0">Save beneficiary</SwitchLabel>
            </div>
          </SwitchGroup>
        </div>
        <div class="relative">
          <Textinput
            placeholder=""
            label="Amount"
            name="Business name"
            v-bind="accountNumberAtt"
            v-model="accountNumber"
            :error="errors.accountNumber"
          />
          <span
            class="absolute top-0 right-0 text-[11px] border-[#ABEFC6] border text-[#067647] rounded-[6px] px-[6px] py-[1px] bg-[#ECFDF3]"
            >Balance: <span class="font-medium">NGN1,200,000</span></span
          >
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Narration"
            name="Business name"
            v-bind="accountNumberAtt"
            v-model="accountNumber"
            :error="errors.accountNumber"
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
</template>
<script setup>
import { useForm } from "vee-validate";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import * as yup from "yup";

const active = inject("active");
const isOpen = inject("isOpen");
const enabled = ref(false);
const isLoading = ref(false);
const links = [
  {
    title: "Transfers",
    url: "/transfers",
  },
  {
    title: "New Transfer",
    url: "#",
  },
];

const formValues = reactive({
  accountNumber: "",
});

const schema = yup.object().shape({
  accountNumber: yup.string().required(),
});

const { handleSubmit, defineField, errors, setValues, setFieldValue } = useForm(
  {
    validationSchema: schema,
    initialValues: formValues,
  }
);
const [accountNumber, accountNumberAtt] = defineField("accountNumber");


</script>
