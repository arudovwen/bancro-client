<template>
  <div class="border-[#EAECF0] border rounded-lg w-ful bg-white">
    <div
      class="pb-6 pt-6 border-[#EAECF0] border-b px-6"
      v-if="
        hasSearch ||
        hasFilter ||
        hasDate ||
        hasExport ||
        hasFilterButton ||
        title
      "
    >
      <div
        class="flex gap-x-4 flex-col lg:flex-row gap-y-4 justify-between items-center"
      >
        <div class="relative flex items-center" v-if="hasSearch">
          <span class="absolute left-4 pointer-events-none text-[#667085]"
            ><i class="uil uil-search"></i
          ></span>
          <input
            class="border border-[#DFE5EC] text-sm focus:pr-3 pl-10 rounded-lg w-full lg:w-[280px] h-11 focus:outline-none py-[10px] transition ease-in-out duration-300"
            type="search"
            :placeholder="placeholder"
            @change="emits('onSearch', e.target.value)"
          />
        </div>
        <h2 v-if="title" class="text-lg text-[#0E0F0C] font-semibold">
          {{ title }}
        </h2>

        <div class="flex gap-x-4 items-center">
          <ClientOnly v-if="hasDate">
            <VueDatePicker
              v-model="date"
              range
              multi-calendars
              placeholder="Select date"
              :time-picker="false"
              input-class-name="!text-sm  placeholder:!text-[#344054] !h-11 !font-medium"
            />
          </ClientOnly>
          <button
            v-if="hasExport"
            id="create-product-button"
            class="flex items-center gap-x-2 bg-[#9FE870] text-[14px] text-[#163300] rounded-lg py-[10px] px-[15px] font-medium"
          >
            <AppIcon icon="hugeicons:cloud-download" />
            <span>Export</span>
          </button>
          <FilterButton
            v-if="hasFilter"
            v-model="filter"
            :options="filterOptions"
            :title="filterTitle"
          />
          <button
            @click="emits('filter-click')"
            v-if="hasFilterButton"
            id="create-product-button"
            class="flex items-center gap-x-2 bg-[#9FE870] text-[14px] text-[#163300] rounded-lg py-[10px] px-[15px] font-medium"
          >
            <AppIcon icon="fluent:filter-28-filled" />
            <span>Filter</span>
          </button>
        </div>
      </div>
    </div>
    <div class="rounded-lg" v-if="!isLoading">
      <table class="table-auto w-full">
        <thead>
          <tr class="border-b border-[#EAECF0]">
            <th
              class="bg-[#F9FAFB] py-3 px-6 text-xs font-medium text-[#475467] capitalize text-left"
              v-for="column in columns"
              :key="column.key"
            >
              {{ column.header }}
            </th>
          </tr>
        </thead>
        <tbody v-if="rows.length">
          <tr
            class="border-b last:border-none border-[#EAECF0] even:bg-[#F9FAFB]"
            v-for="(row, index) in rows"
            :key="index"
          >
            <td
              class="text-sm text-[#454745] p-6"
              v-for="column in columns"
              :key="column.key"
            >
              <slot name="table-row" :row="row" :column="column">
                <span v-if="!column.isHtml">
                  {{ row[column.key] || "-" }}
                </span>
                <span v-else v-html="row[column.key]"> </span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EmptyData
      v-if="!rows.length && !isLoading"
      :title="emptyTitle"
      :subtext="emptySubtext"
      :url="emptyUrl"
      :btnText="emptyBtnText"
      :type="emptyType"
    />
    <TableLoader v-if="isLoading" />
    <Pagination
      v-if="!isLoading"
      :total="queryParams.totalCount"
      :current="queryParams.PageNumber"
      :per-page="queryParams.PageSize"
      :pageRange="5"
      @page-changed="queryParams.PageNumber = $event"
    />
  </div>
</template>
<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const date = ref(null);
const filter = ref("");
const props = defineProps({
  title: {
    default: "",
  },
  isLoading: {
    default: false,
  },
  hasFilterButton: {
    default: false,
  },
  emptyTitle: {
    default: "No data available",
  },
  emptySubtext: {
    default: "",
  },
  emptyUrl: {
    default: "",
  },
  emptyBtnText: {
    default: "",
  },
  emptyType: {
    default: "",
  },
  hasExport: {
    default: true,
  },
  columns: {
    default: [
      {
        header: "id",
        key: "id",
        isHtml: false,
        isStatus: false,
      },
      {
        header: "name",
        key: "name",
        isHtml: false,
        isStatus: false,
      },
    ],
  },
  rows: {
    default: [
      {
        id: 1,
        name: "Success",
      },
      {
        id: 2,
        name: "Jane",
      },
      {
        id: 3,
        name: "Jak",
      },
    ],
  },
  hasDate: {
    default: false,
  },
  hasAction: {
    default: true,
  },
  hasSearch: {
    default: false,
  },
  hasFilter: {
    default: false,
  },
  filterTitle: {
    default: "Filters",
  },
  filterOptions: {
    default: [
      {
        label: "All",
        key: "all",
        value: "all",
      },
    ],
  },
  placeholder: {
    default: "Search by name",
  },
  queryParams: {
    default: { PageSize: 20, PageNumber: 1, pagecount: 10, totalCount: 100 },
  },
});
const emits = defineEmits([
  "onSearch",
  "onFilter",
  "onDateChange",
  "filter-click",
]);

watch(filter, () => {
  emits("onFilter", filter.value);
});

watch(date, () => {
  emits("onDateChange", date.value);
});
</script>
