<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <div class="mb-6">
    <button
      class="bg-none flex gap-x-2 items-center text-black"
      @click="() => router.push('/requests')"
    >
      <AppIcon icon="heroicons:arrow-small-left-20-solid" />
      <span>Back to Loan Requests</span>
    </button>
  </div>
  <div>
    <p class="text-[18px] font-bold">Favour Nwabueze</p>
  </div>
  <div class="mb-6">
    <p class="text-[12px]">USER ID: 123456</p>
  </div>
  <AppTab :tabs="tabs" />
  <div class="flex justify-between items-center mb-6">
    <div class="flex items-center gap-x-2">
      <AppButtonV2
        :classes="{ root: 'bg-[#F04438] text-white' }"
        :size="'small'"
        :onClick="declineDialog.open"
      >
        <span>Decline</span>
      </AppButtonV2>
      <AppButtonV2
        :classes="{ root: 'bg-[#9FE870] text-black' }"
        :size="'small'"
        :onClick="approveDialog.open"
      >
        <span>Approve Request</span>
      </AppButtonV2>
    </div>
    <div>
      <Menu as="div" class="relative inline-block text-left z-[9999999999]">
        <div>
          <MenuButton
            class="flex w-full justify-center gap-x-2 items-center rounded-md bg-[#9FE870] py-[8px] px-[12px] text-[14px] font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            Options
            <AppIcon icon="heroicons:chevron-down-solid" />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  Download Offer Letter
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  Assign team member
                </button>
              </MenuItem>
            </div>
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-red-600',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  Delete Account
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>

  <div class="flex gap-x-4">
    <div class="p-6 border rounded-lg bg-white border-[#EAECF0] w-full">
      <div class="flex flex-wrap gap-y-6">
        <div
          v-for="item of [
            { label: 'Amount Requested', value: 'N120,000' },
            { label: 'Requested Tenor', value: '2 Months' },
            { label: 'Product Name', value: 'Rent Home Loan' },
            { label: 'Loan Purpose', value: 'Rent' },
            { label: 'Debit Mandate', value: 'Yes' },
            { label: 'Wallet for debit', value: 'Lagos' },
          ]"
          class="min-w-[50%]"
        >
          <div>
            <p class="text-[12px] text-gray-700">
              {{ item.label }}
            </p>
          </div>
          <div>
            <p class="text-[14px] font-semibold">
              {{ item.value }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="border rounded-lg bg-white border-[#EAECF0] w-full">
      <div class="px-6 border-[#EAECF0] border-b py-2 bg-[#F9FAFB]">
        <p class="text-[14px]">Uploaded Documents</p>
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
            <span class="text-[#9FE870] font-medium">View</span>
          </AppButtonV2>
        </div>
      </div>
    </div>
  </div>
  <AppDialog
    :title="'Review Loan Terms'"
    :isOpen="approveDialog.isOpen"
    :onClose="approveDialog.close"
    :PrimaryActionProps="{
      label: 'Approve',
      onClick: () => {
        approveDialog.close();
      },
      classes: {
        root: 'bg-[#9FE870] text-black flex-grow-1 !w-full',
      },
    }"
  >
    <div class="my-6 w-full grid grid-cols-2 gap-x-6 gap-y-2">
      <div class="col-span-1">
        <Textinput
          placeholder=""
          label="Approved Amount"
          type="text"
          name="firstName"
        />
      </div>
      <div class="col-span-1">
        <Textinput
          placeholder=""
          label="Interest Rate"
          type="text"
          name="firstName"
        />
      </div>
      <div class="col-span-1">
        <Textinput placeholder="" label="Tenure" type="text" name="firstName" />
      </div>
      <div class="col-span-1">
        <Textinput
          placeholder=""
          label="Frequency"
          type="text"
          name="firstName"
        />
      </div>

      <div class="col-span-2">
        <Textinput placeholder="" label="Upload" type="file" name="firstName" />
      </div>
    </div>
    <span
      @click="loanScheduleDialog.open"
      class="cursor-pointer text-[14px] text-[#9FE870]"
      >Review loan schedule</span
    >
  </AppDialog>
  <AppDialog
    :title="'Decline'"
    :isOpen="declineDialog.isOpen"
    :onClose="declineDialog.close"
    :PrimaryActionProps="{
      label: 'Decline',
      onClick: () => {
        declineDialog.close();
      },
      classes: {
        root: 'bg-red-600 text-white flex-grow-1 !w-full',
      },
    }"
  >
    <div class="my-6 w-full grid grid-cols-2 gap-x-6 gap-y-2">
      <div class="col-span-2">
        <Textinput
            placeholder=""
            label="Reason"
            type="text"
            name="firstName"
        />
      </div>
      <div class="col-span-2">
        <Textinput
            placeholder=""
            label="Notes"
            type="text"
            name="firstName"
        />
      </div>


    </div>
  </AppDialog>
  <AppDialog
    :title="'Review Loan Schedule'"
    :isOpen="loanScheduleDialog.isOpen"
    :onClose="
      () => {
        loanScheduleDialog.close();
        approveDialog.open();
      }
    "
    :PrimaryActionProps="{
      label: 'Ok, Got it',
      onClick: () => {
        loanScheduleDialog.close();
        approveDialog.open();
      },
      classes: {
        root: 'bg-[#9FE870] text-black flex-grow-1 !w-full',
      },
    }"
  >
    <div class="border border-gray-400 rounded-md overflow-hidden my-6">
      <table class="w-full">
        <tr class="bg-gray-100 border-b border-gray-300">
          <td class="px-3 text-[14px] py-2">Amount</td>
          <td class="px-3 text-[14px] py-2">Scheduled Date</td>
          <td class="px-3 text-[14px] py-2">Repayment Date</td>
        </tr>
        <tr class="border-b border-gray-300">
          <td class="px-3 text-[14px] py-5">N2,000</td>
          <td class="px-3 text-[14px] py-5">10/4/2003</td>
          <td class="px-3 text-[14px] py-5">10/4/2003</td>
        </tr>
        <tr class="border-b border-gray-300">
          <td class="px-3 text-[14px] py-5">N2,000,000,000</td>
          <td class="px-3 text-[14px] py-5">10/4/2003</td>
          <td class="px-3 text-[14px] py-5">10/4/2003</td>
        </tr>
        <tr class="border-b border-gray-300">
          <td class="px-3 text-[14px] py-5">N2,000</td>
          <td class="px-3 text-[14px] py-5">10/4/2003</td>
          <td class="px-3 text-[14px] py-5">10/4/2003</td>
        </tr>
      </table>
    </div>
  </AppDialog>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moment from "moment";

const router = useRouter();
const route = useRoute();
const links = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: route.params.id,
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
    id: 2323423434,
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("lll"),
    status: 0,
    customerName: "Jon Doe",
    email: "sufuf@gjg.com",
  },
  {
    id: 2323423434,
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("l"),
    status: 1,
    customerName: "Jon Doe2",
    email: "sufuf@gjg.com",
  },
  {
    id: 2323423434,
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("lll"),
    status: 2,
    customerName: "Jon Doe3",
    email: "sufuf@gjg.com",
  },
  {
    id: 2323423434,
    transactionRef: "2334v3v",
    amount: currencyFormat(4999),
    paymentMethod: "Card",
    date: moment().format("lll"),
    status: 0,
    customerName: "Jon Doe4",
    email: "sufuf@gjg.com",
  },
]);

const tabs = [
  {
    title: "Loan Request",
    key: "loan_request",
  },
  {
    title: "Disbursement",
    key: "disbursement",
  },
  {
    title: "Loan",
    key: "repayment",
  },
  {
    title: "Repayment",
    key: "repayment",
  },
];

const approveDialog = ref({
  isOpen: false,
  open: () => {
    approveDialog.value.isOpen = true;
  },
  close: () => {
    approveDialog.value.isOpen = false;
  },
});

const declineDialog = ref({
  isOpen: false,
  open: () => {
    declineDialog.value.isOpen = true;
  },
  close: () => {
    declineDialog.value.isOpen = false;
  },
});

const loanScheduleDialog = ref({
  isOpen: false,
  open: () => {
    loanScheduleDialog.value.isOpen = true;
  },
  close: () => {
    loanScheduleDialog.value.isOpen = false;
  },
});
</script>
