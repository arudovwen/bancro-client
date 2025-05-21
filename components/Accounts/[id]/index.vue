<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <div class="mb-6">
    <button
      class="bg-none flex gap-x-2 items-center text-[#163300]"
      @click="() => router.push('/accounts')"
    >
      <AppIcon icon="heroicons:arrow-small-left-20-solid" />
      <span>Back to Loans</span>
    </button>
  </div>
  <div class="flex justify-between items-center mb-6">
    <div class="">
      <div>
        <p class="text-[18px] font-bold">Favour Nwabueze</p>
      </div>
      <div class="mb-6">
        <p class="text-[12px]">USER ID: 123456</p>
      </div>
    </div>
    <div>
      <Menu as="div" class="relative inline-block text-left z-[9999999999]">
        <div>
          <MenuButton
            class="flex w-full justify-center gap-x-2 items-center rounded-md bg-[#9FE870] py-[8px] px-[12px] text-[14px] font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            Actions
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
                    active ? 'bg-[#9FE870] text-[#163300]' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                  @click="writeOffLoanDialog.open"
                >
                  Write Off Loan
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-[#9FE870] text-[#163300]' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                  @click="liquidateLoanDialog.open"
                >
                  Liquidate Loan
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
  <AppTab :tabs="tabs" />
  <div class="flex gap-x-4" v-if="view === 'loan_details'">
    <div class="p-6 border rounded-lg bg-white border-[#EAECF0] w-full">
      <div class="flex flex-wrap gap-y-6">
        <div
          v-for="item of [
            { label: 'Amount Requested', value: 'N120,000' },
            { label: 'Requested Tenure', value: '2 Months' },
            { label: 'Product Name', value: 'Rent Home Loan' },
            { label: 'Loan Purpose', value: 'Rent' },
            { label: 'Debit Mandate', value: 'Yes' },
            { label: 'Wallet for debit', value: 'Lagos' },
            { label: 'Loan Purpose', value: 'Rent' },
            { label: 'Debit Mandate', value: 'Yes' },
            { label: 'Wallet for debit', value: 'Lagos' },
            { label: 'Loan Purpose', value: 'Rent' },
            { label: 'Debit Mandate', value: 'Yes' },
            { label: 'Wallet for debit', value: 'Lagos' },
            { label: 'Wallet for debit', value: 'Lagos' },
          ]"
          class="min-w-[25%]"
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
  </div>
  <div v-if="view === 'loan_schedule'">
    <Table :columns="columns" :rows="rows">
      <template #table-row="{ row, column }">
        <span v-if="column.header === 'Actions'">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                <AppIcon icon="heroicons:ellipsis-vertical-solid" />
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
                        active ? 'bg-[#9FE870] text-[#163300]' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                      @click=""
                    >
                      View Details
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-[#9FE870] text-[#163300]' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                      @click="updateRepaymentDialog.open"
                    >
                      Update Repayment
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </span>
      </template>
    </Table>
  </div>
  <AppDialog
    :title="'Write Off Loan'"
    :isOpen="writeOffLoanDialog.isOpen"
    :onClose="writeOffLoanDialog.close"
    :PrimaryActionProps="{
      label: 'Write Off Loan',
      onClick: () => {
        writeOffLoanDialog.close();
      },
      classes: {
        root: 'bg-[#9FE870] text-[#163300] flex-grow-1 !w-full',
      },
    }"
  >
    <span class="text-gray-500 text-[14px]"
      >You are about to write off this Loan</span
    >
    <div class="my-6 w-full grid grid-cols-2 gap-x-6 gap-y-2">
      <div class="col-span-2">
        <Textinput placeholder="" label="Notes" type="text" name="firstName" />
      </div>
    </div>
  </AppDialog>
  <AppDialog
    :title="'Liquidate Loan'"
    :isOpen="liquidateLoanDialog.isOpen"
    :onClose="liquidateLoanDialog.close"
    :PrimaryActionProps="{
      label: 'Liquidate Loan',
      onClick: () => {
        liquidateLoanDialog.close();
      },
      classes: {
        root: 'bg-[#9FE870] text-[#163300] flex-grow-1 !w-full',
      },
    }"
  >
    <div class="my-6 w-full grid grid-cols-2 gap-x-6 gap-y-2">
      <div class="col-span-2">
        <Textinput placeholder="" label="Date" type="text" name="firstName" />
      </div>
      <div class="col-span-2">
        <Textinput
          placeholder=""
          label="Channel"
          type="text"
          name="firstName"
        />
      </div>

      <div class="col-span-2">
        <Textinput
          placeholder=""
          label="Evidence of Payment"
          type="file"
          name="firstName"
        />
      </div>
    </div>
  </AppDialog>
  <AppDialog
    :title="'Update Repayment'"
    :isOpen="updateRepaymentDialog.isOpen"
    :onClose="updateRepaymentDialog.close"
    :PrimaryActionProps="{
      label: 'Update Repayment',
      onClick: () => {
        updateRepaymentDialog.close();
      },
      classes: {
        root: 'bg-[#9FE870] text-[#163300] flex-grow-1 !w-full',
      },
    }"
  >
    <div class="my-6 w-full grid grid-cols-2 gap-x-6 gap-y-2">
      <div class="col-span-2">
        <Textinput
          placeholder=""
          label="Repayment Type"
          type="text"
          name="firstName"
        />
      </div>
      <div class="col-span-2">
        <Textinput placeholder="" label="Amount" type="text" name="firstName" />
      </div>
      <div class="col-span-2">
        <Textinput placeholder="" label="Notes" type="text" name="firstName" />
      </div>
      <div class="col-span-2">
        <Textinput placeholder="" label="Date" type="text" name="firstName" />
      </div>
      <div class="col-span-2">
        <Textinput
          placeholder=""
          label="Channel"
          type="text"
          name="firstName"
        />
      </div>
      <div class="col-span-2">
        <Textinput placeholder="" label="Upload" type="file" name="firstName" />
      </div>
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
    title: "Loans",
    url: "/loans",
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

const rows = ref([]);

const tabs = [
  {
    title: "Loan Details",
    key: "loan_details",
  },
  {
    title: "Loan Schedule",
    key: "loan_schedule",
  },
];

const writeOffLoanDialog = ref({
  isOpen: false,
  open: () => {
    writeOffLoanDialog.value.isOpen = true;
  },
  close: () => {
    writeOffLoanDialog.value.isOpen = false;
  },
});

const liquidateLoanDialog = ref({
  isOpen: false,
  open: () => {
    liquidateLoanDialog.value.isOpen = true;
  },
  close: () => {
    liquidateLoanDialog.value.isOpen = false;
  },
});

const updateRepaymentDialog = ref({
  isOpen: false,
  open: () => {
    updateRepaymentDialog.value.isOpen = true;
  },
  close: () => {
    updateRepaymentDialog.value.isOpen = false;
  },
});

const view = ref("loan_details");
provide("active", view);
</script>
