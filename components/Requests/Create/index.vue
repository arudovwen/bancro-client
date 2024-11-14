<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <div class="p-6 mb-10 border rounded-lg bg-white border-[#EAECF0] w-full">
    <div class="w-[50%]">
      <div class="mb-6 w-full grid grid-cols-2 gap-x-6 gap-y-4">
        <div class="col-span-1">
          <Textinput placeholder="" label="Name" type="text" name="firstName" />
        </div>
        <div class="col-span-1">
          <Textinput placeholder="" label="Type" type="text" name="firstName" />
        </div>
        <div class="col-span-1">
          <Textinput
            placeholder=""
            label="Amount"
            type="text"
            name="firstName"
          />
        </div>
        <div class="col-span-1">
          <Textinput
            placeholder=""
            label="Minimum Amount"
            type="text"
            name="firstName"
          />
        </div>
        <div class="col-span-1">
          <Textinput
            placeholder=""
            label="Maximum Amount"
            type="text"
            name="firstName"
          />
        </div>
        <div class="col-span-1">
          <Textinput
            placeholder=""
            label="Percentage"
            type="text"
            name="firstName"
          />
        </div>
        <div class="col-span-1">
          <Textinput
            placeholder=""
            label="Applicable To"
            type="text"
            name="firstName"
          />
        </div>
        <div class="col-span-1">
          <Textinput
            placeholder=""
            label="Grace Period"
            type="text"
            name="firstName"
          />
        </div>
      </div>
      <AppButtonV2
        :size="'default'"
        :classes="{
          root: 'mb-6 border !border-gray-700 flex gap-x-2 items-center',
        }"
        :onClick="
          () => {
            uploadDocumentDialog.open();
          }
        "
      >
        <AppIcon :icon="'heroicons:plus'" />
        <span class="">Upload a Document</span>
      </AppButtonV2>
      <div class="mb-6 border rounded-lg bg-white border-[#EAECF0] w-full">
        <div class="px-6 border-[#EAECF0] border-b py-2 bg-[#F9FAFB]">
          <p class="text-[14px]">Documents</p>
        </div>
        <div
          v-for="(item, index) of [
            { label: 'Passport ID', value: 'ID No: 3245678998' },
            { label: 'NIN', value: '324567890675434' },
            { label: 'Bank Statement' },
            { label: 'Utility Bills' },
          ]"
          class="px-6 min-h-[72px] flex justify-between items-center border-b border-[#EAECF0]"
        >
          <div>
            <p class="text-[14px]">
              {{ item.label }}
            </p>
            <p v-if="item.value" class="text-[14px] text-gray-500">
              {{ item.value }}
            </p>
          </div>
          <div class="flex gap-x-2">
            <AppButtonV2>
              <span>Download</span>
            </AppButtonV2>
            <AppButtonV2>
              <span class="text-danger-500 font-medium">View</span>
            </AppButtonV2>
          </div>
        </div>
      </div>
      <AppButtonV2
        :size="'large'"
        :classes="{ root: 'bg-danger-500 text-white flex gap-x-2 items-center' }"
      >
        <AppIcon :icon="'heroicons:plus'" />
        <span class="">New Request</span>
      </AppButtonV2>
    </div>
  </div>
  <AppDialog
    :title="'Add A Document'"
    :isOpen="uploadDocumentDialog.isOpen"
    :onClose="uploadDocumentDialog.close"
    :PrimaryActionProps="{
      label: 'Cancel',
      onClick: () => {
        uploadDocumentDialog.close();
      },
      classes: {
        root: 'border border-gray-800 text-[#ED3237] flex-grow-1 !w-full',
      },
    }"
    :SecondaryActionProps="{
      label: 'Add Document',
      onClick: () => {
        uploadDocumentDialog.close();
      },
      classes: {
        root: 'bg-daner-500 text-white  flex-grow-1 !w-full',
      },
    }"
  >
    <div class="my-6 w-full grid grid-cols-2 gap-x-6 gap-y-2">
      <div class="col-span-2">
        <Textinput
          placeholder=""
          label="Docuent Name"
          type="text"
          name="firstName"
        />
      </div>
      <div class="col-span-2">
        <Textinput
          placeholder=""
          label="Document Number"
          type="text"
          name="firstName"
        />
      </div>

      <div class="col-span-2">
        <Textinput
          placeholder=""
          label="Upload"
          type="file"
          name="firstName"
        />
      </div>
    </div>
  </AppDialog>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moment from "moment";

const uploadDocumentDialog = ref({
  isOpen: false,
  open: () => {
    uploadDocumentDialog.value.isOpen = true;
  },
  close: () => {
    uploadDocumentDialog.value.isOpen = false;
  },
});

const links = [
  {
    title: "Loan Requests",
    url: "/requests",
  },
  {
    title: "Create",
    url: "#",
  },
];
const columns = [
  {
    header: "ID",
    key: "customerName",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Product Name",
    key: "email",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Product Type",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Date",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Status",
    key: "status",
    isHtml: false,
    isStatus: true,
  },
  {
    header: "Actions",
    isHtml: true,
    isStatus: false,
  },
];

const rows = ref([
  {
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("lll"),
    status: 0,
    customerName: "Jon Doe",
    email: "sufuf@gjg.com",
  },
  {
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("l"),
    status: 1,
    customerName: "Jon Doe2",
    email: "sufuf@gjg.com",
  },
  {
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("lll"),
    status: 2,
    customerName: "Jon Doe3",
    email: "sufuf@gjg.com",
  },
  {
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("lll"),
    status: 0,
    customerName: "Jon Doe4",
    email: "sufuf@gjg.com",
  },
]);

const formValues = reactive({
  amount: "",
  loanProduct: "",
});

const schema = yup.object().shape({
  amount: yup.string().required("Amount is required"),
  loanProduct: yup.string().required("Loan Product is required"),
});
const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const [amount, amountAtt] = defineField("amount");
const [loanProduct, loanProductAtt] = defineField("loanProduct");
</script>
