<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->

    <div class="mb-10">
      <div>
        <div class="mb-8">
          <AppButton
            @click="isOpen = true"
            text="Create tenant"
            btnClass="text-primary-500 bg-[#9FE870] px-6 !py-[10px] !rounded-lg font-semibold "
          />
        </div>
        <div class="rounded-[10px] border border-[#F4F7FE] bg-white">
          <Table
            :columns="columns"
            :rows="rows"
            :hasAction="true"
            :isLoading="isLoading"
          >
            <template #table-row="{ row, column }">
              <span
                v-if="column.header === 'name'"
                class="flex gap-x-2 items-center"
              >
                <span
                  class="w-10 text-xs h-10 bg-gray-50 rounded-full flex items-center justify-center"
                  >AJ</span
                >
                <span>
                  <span class="block text-sm font-medium text-[#101828]">{{
                    row.name
                  }}</span>
                  <span class="text-sm text-[#475467] block">{{
                    row.email
                  }}</span>
                </span>
              </span>
              <span class="capitalize" v-if="column.header === 'role'">
                {{ row.role }}</span
              >
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
        <TenantsForm
          @close="
            () => {
              isOpen = false;
              detail = null;
            }
          "
          :id="id"
          :detail="detail"
          @refresh="getData"
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
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import debounce from "lodash/debounce";
import { getTenants } from "~/services/tenantservice";

const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const errorText = ref("Tenant creation failed");
const id = ref(null);
const open = ref(false);
const isOpen = ref(false);
const detail = ref(null);
const isLoading = ref(false);
const columns = [
  {
    header: "Company",
    key: "companyName",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Tenant ID",
    key: "tenantId",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Email",
    key: "companyEmail",
    isHtml: false,
    isStatus: true,
  },
  {
    header: "Type",
    key: "tenantType",
    isHtml: false,
    isStatus: true,
  },
  // {
  //   header: "status",
  //   key: "status",
  //   isHtml: false,
  //   isStatus: true,
  // },
  // {
  //   header: "actions",
  //   key: "actions",
  //   isHtml: false,
  //   isStatus: true,
  // },
];

const rows = ref([]);
onMounted(() => {
  getData();
});

const queryParams = reactive({
  Search: "",
  PageNumber: 1,
  PageSize: 15,
});

function getData() {
  isLoading.value = true
  getTenants(queryParams).then((res) => {
    if (res.status === 200) {
      rows.value = res.data.data
      isLoading.value = false
    }
  });
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
  getData();
  isOpen.value = false;
}
const debounceSearch = debounce(() => {
  getData();
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
