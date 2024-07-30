<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->

    <div class="mb-10">
      <div>
        <div class="mb-4">
          <AppButton
            @click="isOpen = true"
            text="Add director"
            icon="solar:user-plus-broken"
            btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold "
          />
        </div>
        <div class="rounded-[10px] border border-[#F4F7FE] bg-white mb-8">
          <Table
            emptyType="user"
            :columns="columns"
            :rows="rows"
            :hasAction="true"
          >
            <template #table-row="{ row, column }">
              <span
                class="flex gap-x-2 items-center justify-end"
                v-if="column.key === 'actions'"
              >
                <button
                  type="button"
                  class="px-1 py-2 hover:bg-gray-50 text-red-500"
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
        <div class="md:col-span-2 flex justify-between gap-x-4 mt-6">
          <AppButton
            type="button"
            text="Cancel"
            btnClass=" w-full bg-transparent border border-gray-200 px-6 !py-[10px] !rounded-lg font-semibold "
          />
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Next"
            btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold w-full"
          />
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
        <CustomersBusinessDirectorForm
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
import { Float } from "@headlessui-float/vue";
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
const isLoading = ref(false);

const columns = [
  {
    header: "Directors",
    key: "name",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "",
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
