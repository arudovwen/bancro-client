<template>
  <div class="mb-6">
    <Breadcrumbs :links="links" />
  </div>
  <div class="p-8 border rounded-lg bg-white border-[#EAECF0] w-full">
    <div class="flex">
      <div class="min-w-[40%]">
        <AppStepper :steps="steps" :currentStep="currentStepValue" />
      </div>
      <div class="w-full">
        <div class="w-[70%]">
          <TransitionRoot
            :show="currentStepValue === 'loan_details'"
            enter="transition-opacity duration-500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="hidden"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="w-full grid grid-cols-2 gap-x-6 gap-y-6">
              <div class="col-span-1">
                <Textinput
                  placeholder=""
                  label="Product Name"
                  type="text"
                  name="firstName"
                />
              </div>
              <div class="col-span-1">
                <Textinput
                  placeholder=""
                  label="Product Description"
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
                  label="Minimum Amount"
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
                  label="Minimum Amount"
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
              <div class="col-span-2">
                <Textinput
                  placeholder=""
                  label="Maximum Active Loan"
                  type="text"
                  name="firstName"
                />
              </div>
              <div class="col-span-1">
                <AppButtonV2 :classes="{ root: 'border border-black w-full' }">
                  <span> Back </span>
                </AppButtonV2>
              </div>
              <div class="col-span-1">
                <AppButtonV2
                  :isDisabled="currentStepValue !== 'loan_details'"
                  :onClick="
                    () => {
                      setCurrentStepValue('kyc_and_documents');
                    }
                  "
                  :classes="{ root: 'bg-[#9FE870] w-full' }"
                >
                  <span> Next </span>
                </AppButtonV2>
              </div>
            </div>
          </TransitionRoot>
        </div>
        <div class="w-[70%]">
          <TransitionRoot
            :show="currentStepValue === 'kyc_and_documents'"
            enter="transition-opacity duration-500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="hidden"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="min-w-[100%] grid grid-cols-2 gap-x-6 gap-y-6">
              <div class="col-span-2">
                <Textinput
                  placeholder=""
                  label="Maximum Active Loan"
                  type="text"
                  name="firstName"
                />
              </div>
              <div class="col-span-1">
                <AppButtonV2
                  :onClick="
                    () => {
                      setCurrentStepValue('loan_details');
                    }
                  "
                  :classes="{ root: 'border border-black w-full' }"
                >
                  <span> Back </span>
                </AppButtonV2>
              </div>
              <div class="col-span-1">
                <AppButtonV2
                  :isDisabled="currentStepValue !== 'kyc_and_documents'"
                  :onClick="
                    () => {
                      setCurrentStepValue('fees');
                    }
                  "
                  :classes="{ root: 'bg-[#9FE870] w-full' }"
                >
                  <span> Next </span>
                </AppButtonV2>
              </div>
            </div>
          </TransitionRoot>
        </div>
        <div class="w-[100%]">
          <TransitionRoot
            :show="currentStepValue === 'fees'"
            enter="transition-opacity duration-500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="hidden"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="mb-6">
              <Table :columns="columns" :rows="rows" :hasSearch="false">
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
                                  active
                                    ? 'bg-[#9FE870] text-black'
                                    : 'text-gray-900',
                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                                @click="() => router.push(`/accounts/12345`)"
                              >
                                View
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
            <div class="mb-6 w-[70%] grid grid-cols-2 gap-x-6 gap-y-6">
              <div class="col-span-1">
                <AppButtonV2
                  :onClick="
                    () => {
                      createFeeDialog.open();
                    }
                  "
                  :classes="{ root: 'bg-gray-200 w-full' }"
                >
                  <span> Create Fee </span>
                </AppButtonV2>
              </div>
            </div>
            <div class="w-[70%] grid grid-cols-2 gap-x-6 gap-y-6">
              <div class="col-span-1">
                <AppButtonV2
                  :onClick="
                    () => {
                      setCurrentStepValue('kyc_and_documents');
                    }
                  "
                  :classes="{ root: 'border border-black w-full' }"
                >
                  <span> Back </span>
                </AppButtonV2>
              </div>
              <div class="col-span-1">
                <AppButtonV2
                  :isDisabled="currentStepValue !== 'fees'"
                  :onClick="
                    () => {
                      router.push('products');
                    }
                  "
                  :classes="{ root: 'bg-[#9FE870] w-full' }"
                >
                  <span> Complete </span>
                </AppButtonV2>
              </div>
            </div>
          </TransitionRoot>
        </div>
      </div>
    </div>
  </div>

  <AppDialog
    :title="'Create Fee'"
    :isOpen="createFeeDialog.isOpen"
    :onClose="createFeeDialog.close"
    :PrimaryActionProps="{
      label: 'Cancel',
      onClick: () => {
        createFeeDialog.close();
      },
      classes: {
        root: 'border-2 border-black text-black flex-grow-1 !w-full',
      },
    }"
    :SecondaryActionProps="{
      label: 'Add Fee',
      onClick: () => {
        createFeeDialog.close();
      },
      classes: {
        root: 'bg-[#9FE870] text-black flex-grow-1 !w-full',
      },
    }"
  >
    <div class="my-6 w-full grid grid-cols-2 gap-x-6 gap-y-2">
      <div class="col-span-2">
        <Textinput
            placeholder=""
            label="Select Fee Category"
            type="text"
            name="firstName"
        />
      </div>
      <div class="col-span-1">
        <Textinput
          placeholder=""
          label="Name"
          type="text"
          name="firstName"
        />
      </div>
      <div class="col-span-1">
        <Textinput
          placeholder=""
          label="Type"
          type="text"
          name="firstName"
        />
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
  </AppDialog>
</template>

<script setup>
import moment from "moment";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionRoot,
} from "@headlessui/vue";

const router = useRouter();

const currentStepValue = ref("loan_details");
function setCurrentStepValue(value) {
  currentStepValue.value = value;
}

const createFeeDialog = ref({
  isOpen: false,
  open: () => {
    createFeeDialog.value.isOpen = true;
  },
  close: () => {
    createFeeDialog.value.isOpen = false;
  },
});

const steps = [
  { value: "loan_details", label: "Loan Details" },
  { value: "kyc_and_documents", label: "KYC & Documents" },
  { value: "fees", label: "Fees" },
];

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
</script>
