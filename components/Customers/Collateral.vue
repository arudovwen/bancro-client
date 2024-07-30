<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->

    <div class="mb-10">
      <div>
        <div class="rounded-[10px] border border-[#F4F7FE] bg-white mb-8">
          <Table
         
            :columns="columns"
            :rows="rows"
            :hasAction="true"
          >
            <template #table-row="{ row, column }">
              <span
                v-if="column.header === 'collateral type'"
                class="flex gap-x-2 items-center"
              >
                <span>
                  <span
                    class="block text-sm font-medium text-[#101828] capitalize"
                    >{{ row.type }}</span
                  >
                  <span class="text-sm text-[#475467] block capitalize">{{
                    row.name
                  }}</span>
                </span>
              </span>

              <span
                class="flex gap-x-2 items-center"
                v-if="column.header === 'actions'"
              >
                <Menu class="" as="div">
                  <Float placement="bottom-end" :offset="4">
                    <MenuButton class="outline-none">
                      <AppIcon icon="heroicons:ellipsis-vertical-solid" />
                    </MenuButton>
                    <MenuItems
                      class="bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] min-w-[140px] rounded-xl overflow-hidden text-left text-[#454745] flex flex-col gap-y-1"
                    >
                      <span
                        class="block py-2 px-4 cursor-pointer"
                        @click="deleteRequest(row)"
                        >Edit details</span
                      >
                      <span
                        class="block py-2 px-4 cursor-pointer text-red-600"
                        @click="deleteRequest(row)"
                        >Delete account</span
                      >
                    </MenuItems>
                  </Float>
                </Menu>
              </span>
            </template>
          </Table>
      
        </div>
        <div class="">
          <AppButton
            @click="isOpen = true"
            text="Add another collateral"
            icon="solar:user-plus-broken"
            btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold "
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
        <CustomersCollateralForm
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
import moment from "moment";
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
    header: "collateral type",
    key: "name",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "value",
    key: "value",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "status",
    key: "status",
    isHtml: false,
    isStatus: false,
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
