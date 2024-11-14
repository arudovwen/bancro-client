<template>
  <div class="max-w-[492px]">
    <h2 class="text-xl font-semibold text-[#182230] mb-3">
      Create New Savings
    </h2>
    <p class="text-sm mb-6 text-[#475467]">
      Save daily, weekly or monthly towards a target amount, earn 10% interest,
      no withdrawal allowed.
    </p>

    <form @submit.prevent="summaryOpen = true" class="bg-white rounded-xl">
      <div>
        <div class="grid grid-cols-1 gap-y-4">
          <div>
            <Textinput
              placeholder=""
              label="Give your savings a name"
              name="Phone number"
              v-bind="loanAmountAtt"
              v-model="loanAmount"
              :error="errors.loanAmount"
            />
          </div>

          <div class="relative">
            <Textinput
              placeholder=""
              label="How much would you like to save?"
              name="loanpurpose"
              v-bind="loanpurposeAtt"
              v-model="loanpurpose"
              :error="errors.loanpurpose"
            />
          </div>
          <div class="relative">
            <Textinput
              placeholder=""
              label="Maturity Date"
              name="loanpurpose"
              v-bind="loanpurposeAtt"
              v-model="loanpurpose"
              :error="errors.loanpurpose"
              type="date"
            />
          </div>

          <div class="mb-1">
            <SwitchGroup>
              <div class="flex items-center gap-x-4">
                <Switch
                  v-model="enabled"
                  :class="enabled ? 'bg-primary-500' : 'bg-gray-200'"
                  class="relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none"
                >
                  <span
                    :class="
                      enabled ? 'translate-x-[1.1rem]' : 'translate-x-[0.15rem]'
                    "
                    class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform"
                  />
                </Switch>
                <SwitchLabel class="!mb-0">Lock this savings</SwitchLabel>
              </div>
            </SwitchGroup>
            <p class="text-[12px] mt-[4px]">
              You won’t be able to withdraw from a locked savings until maturity
            </p>
          </div>
          <div>
            <label class="font-semibold text-[#3C4A67] text-sm block mb-3"
              >Account to Debit</label
            >

            <div
              class="border border-[#BAD8FC] rounded-lg p-3 flex gap-x-2 items-center"
            >
              <span>
                <img src="/images/bank.svg" />
              </span>
              <div class="flex-1">
                <div class="flex gap-x-4 justify-between items-center">
                  <span>
                    <span class="block text-sm font-medium mb-1"
                      >Savings Account</span
                    >
                    <span class="block text-xs text-[#667085]"
                      >Acc No:
                      <span class="font-medium">01234567876</span></span
                    >
                  </span>
                  <span class="block text-right">
                    <span class="block text-sm font-medium mb-1">{{
                      currencyFormat(230000)
                    }}</span>
                    <span class="block text-xs text-[#667085]">Balance</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3 mt-4 flex justify-end gap-x-4">
            <AppButton
              type="button"
              :isLoading="isLoading"
              text="Cancel"
              btnClass="text-primary bg-white border !py-[10px] px-20 min-w-[156px] !rounded-lg font-semibold w-full"
              :isDisabled="isLoading"
            />
            <AppButton
              type="submit"
              :isLoading="isLoading"
              text="Create Savings"
              btnClass="text-white bg-danger-500  !py-[10px] w-full !px-10 !rounded-lg min-w-[156px] font-semibold"
              :isDisabled="isLoading"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
  <ModalCenter :isOpen="summaryOpen" @toggleModal="summaryOpen = false">
    <template #default>
      <div class="p-6 rounded-xl">
        <SavingsFormSummary />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import { useForm } from "vee-validate";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import * as yup from "yup";

const summaryOpen = ref(false);
const enabled = ref(false);
const activeForm = ref("activeForm");
const isLoading = ref(false);
const formValues = reactive({
  loanAmount: "",
  loanpurpose: "",
  tenor: "",
  statementUrl: "",
});

const schema = yup.object().shape({
  loanAmount: yup.string(),
  loanpurpose: yup.string(),
  tenor: yup.string(),
  statementUrl: yup.string(),
});

const { handleSubmit, defineField, errors, setValues, setFieldValue } = useForm(
  {
    validationSchema: schema,
    initialValues: formValues,
  }
);
const [loanAmount, loanAmountAtt] = defineField("loanAmount");
const [loanpurpose, loanpurposeAtt] = defineField("loanpurpose");
const [tenor, tenorAtt] = defineField("tenor");
const [statementUrl] = defineField("statementUrl");
provide("isOpen", summaryOpen);
</script>
