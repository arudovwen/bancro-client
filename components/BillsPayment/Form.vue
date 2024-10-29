<template>
  <form @submit.prevent="active = 2" class="bg-white rounded-xl p-6">
    <div>
      <div class="grid grid-cols-1 gap-y-4">
        <FormGroup label="Bill Type" :error="errors.billType" name="billType">
          <SelectVueSelect
            v-model="billType"
            :options="BillerOptions"
            :reduce="(bill) => bill.value"
            placeholder="Select bill type"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
              errors.billType ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
          />
        </FormGroup>
        <FormGroup label="Select Biller" :error="errors.biller" name="biller">
          <SelectVueSelect
            v-model="biller"
            :options="BillOptions"
            :reduce="(biller) => biller.value"
            placeholder="Select biller"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
              errors.biller ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
          />
        </FormGroup>
        <div>
          <Textinput
            placeholder=""
            label="Biller ID"
            name="billerId"
            v-bind="billerIdAtt"
            v-model="billerId"
            :error="errors.billerId"
          />
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
              setFieldValue('biller', val);
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
  billerId: "",
  amount: null,
  biller: "",
  billType: "",
});

const schema = yup.object().shape({
  billerId: yup.string().required(),
  amount: yup.string().required(),
  biller: yup.string().required(),
  billType: yup.string().required(),
});

const { handleSubmit, defineField, errors, setValues, setFieldValue } = useForm(
  {
    validationSchema: schema,
    initialValues: formValues,
  }
);
const [billerId, billerIdAtt] = defineField("billerId");
const [amount, amountAtt] = defineField("amount");
const [biller] = defineField("biller");
const [billType] = defineField("billType");

provide("isOpen", isOpen);
</script>
