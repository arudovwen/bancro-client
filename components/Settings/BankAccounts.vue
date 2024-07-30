<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->

    <div class="mb-10">
      <div>
        <div class="mb-8">
          <AppButton
            @click="isOpen = true"
            text="Add bank account"
            btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold "
          />
        </div>
        <div class="rounded-[10px] border border-[#F4F7FE] bg-white">
          <Table
          
            :columns="columns"
            :rows="rows"
            :hasAction="true"
            emptyType="settlements"
          >
            <template #table-row="{ row, column }">
              <span class="status" v-if="column.header === 'status'">
                <AppStatusButton stattype="teams" :status="row.status"
              /></span>
              <span
                class="flex gap-x-2 items-center"
                v-if="column.header === 'actions'"
              >
                <button
                  type="button"
                  class="px-1 py-2 hover:bg-gray-50"
                  @click="deleteRequest(row)"
                >
                  <AppIcon icon="mage:trash" />
                </button>
                <button
                  type="button"
                  class="px-1 py-2 hover:bg-gray-50"
                  @click="deleteRequest(row)"
                >
                  <AppIcon icon="lucide:pen" /></button
              ></span>
            </template>
          </Table>
         
        </div>
      </div>
    </div>
  </div>
  <DeleteModal
    @deleteItem="handleDelete"
    @close="open = false"
    title="Delete account"
    text="Are you sure you want to delete this account? This action cannot be undone."
    :open="open"
    btnText="Yes, Delete"
  />
  <IndexModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div class="h-full w-full bg-white rounded-lg p-6">
        <SettingsAccountForm
          @close="
            () => {
              isOpen = false;
              detail = null;
            }
          "
          :id="id"
          :detail="detail"
          @refresh="getSettlements"
        />
      </div>
    </template>
  </IndexModal>

  <ActionModal
    :open="isSuccessOpen"
    type="approve"
    title="Account deleted Succesfully"
    btnText="Okay"
    :isCancel="false"
    @actionItem="
      () => {
        isSuccessOpen = false;
      }
    "
  />
  <ActionModal
    :open="isErrorOpen"
    type="reject"
    title="Delete Failed"
    :text="errorText"
    btnText="Retry"
    @actionItem="() => (isErrorOpen = false)"
    @close="() => (isErrorOpen = false)"
  />
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
});
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import debounce from "lodash/debounce";
import {
  addSettlement,
  updateSettlement,
  getBanks,
} from "~/services/settlementservice";

const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const errorText = ref("Settlement creation failed");
const id = ref(null);
const banks = ref([]);
const open = ref(false);
const isOpen = ref(false);
const detail = ref(null);
const isAutoSettlement = ref(false);

const columns = [
  {
    header: "account name",
    key: "accountName",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "account details",
    key: "accountDetails",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "status",
    key: "status",
    isHtml: false,
    isStatus: true,
  },
  {
    header: "actions",
    key: "actions",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([]);
const financeData = ref([]);
const setLoader = ref(false);
onMounted(() => {
  getSettlements();
});

const queryParams = reactive({
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
  Type: "",
});
const docLoading = ref(true);

function getSettlements() {
  docLoading.value = true;
  isOpen.value = false;
  detail.value = null;
}

function deleteRequest(value) {
  id.value = value;
  open.value = true;
}

function openRequest(val) {
  detail.value = val;
  isOpen.value = true;
}
function handleSuccess() {
  getSettlements();
  isOpen.value = false;
}
const debounceSearch = debounce(() => {
  getSettlements();
}, 800);
const handleDelete = () => {};
watch(
  () => [queryParams.Search],
  () => {
    debounceSearch();
  }
);

provide("handleSuccess", handleSuccess);
provide("isOpen", isOpen);
</script>
