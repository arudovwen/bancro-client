<template>
  <section>
    <button
      @click="isDateOpen = true"
      class="flex  border border-[#D0D5DD] rounded-lg text-xs px-3 py-2 max-w-max items-center font-medium gap-x-3"
    >
      <span class="inline-block"
        ><AppIcon icon="akar-icons:calendar" iconClass="text-base"
      /></span>
      <span class="inline-block">{{ moment(dates?.start).format("ll") }}</span>
      <span class="flex items-center">-</span>
      <span class="inline-block">{{ moment(dates?.end).format("ll") }}</span>
    </button>

    <ModalMiddle
      :isOpen="isDateOpen"
      @close="isDateOpen = false"
      :canClose="false"
    >
      <template #default>
        <div class="rounded-xl bg-white text-[#344054] flex max-w-[720px] flex-col lg:flex-row gap-x-2">
          <div
            class="py-4 flex flex-row lg:flex-col gap-x-1 gap-y-[1px] lg:w-[150px] border-r border-[#e4e7ec] overflow-x-auto max-w-[90vw]"
          >
            <button
              v-for="n in labels"
              :key="n.labels"
              class="text-xs px-3 lg:px-6 py-2 text-left whitespace-nowrap"
              :class="active === n.label ? 'bg-gray-100' : ''"
              @click="handleActive(n.label)"
            >
              {{ n.label }}
            </button>
          </div>
          <div class="w-full">
            <div class="border-b border-[#e4e7ec] w-full">
              <DatePicker
                v-model.range="dates"
                borderless
                color="deep-green"
                :columns="columns"
              />
            </div>
            <div class="flex flex-col lg:flex-row gap-y-5 justify-between items-center p-4">
              <div class="flex gap-x-3 w-full lg:w-auto justify-start">
                <span
                  class="border border-[#D0D5DD] rounded-lg text-xs px-3 py-2 inline-block w-full lg:w-auto"
                  >{{ moment(dates?.start).format("ll") }}</span
                >
                <span class="flex items-center">-</span>
                <span
                  class="border border-[#D0D5DD] rounded-lg text-xs px-3 py-2 inline-block w-full lg:w-auto"
                  >{{ moment(dates?.end).format("ll") }}</span
                >
              </div>
              <div class="flex gap-x-4 justify-end w-full lg:w-auto">
                <AppButton
                  type="button"
                  @click="isDateOpen = false"
                  text="Cancel"
                  btnClass=" w-full bg-transparent border border-gray-200 px-4 !py-2 !rounded-lg font-semibold !text-xs"
                />
                <AppButton
                  @click="onSubmit"
                  type="submit"
                  text="Apply"
                  :isDisabled="!dates"
                  btnClass="text-white bg-danger-500 px-4 !py-2 !rounded-lg font-semibold w-full lg:w-auto !text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </ModalMiddle>
  </section>
</template>
<script setup>
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import moment from "moment";
import { useScreens } from 'vue-screen-utils';

const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px' });
const columns = mapCurrent({ lg: 2 }, 1);
const dates = ref(null);
const active = ref("");
const isDateOpen = ref(false);
const emits = defineEmits("handleSubmit");
const labels = [
  {
    label: "Today",
    value: "",
  },
  {
    label: "Yesterday",
    value: "",
  },
  {
    label: "This week",
    value: "",
  },
  {
    label: "Last week",
    value: "",
  },
  {
    label: "This month",
    value: "",
  },
  {
    label: "Last month",
    value: "",
  },
  {
    label: "This year",
    value: "",
  },
  {
    label: "Last year",
    value: "",
  },
  {
    label: "All time",
    value: "",
  },
];

function handleActive(val) {
  active.value = val;
}
function onSubmit() {
  emits("handleSubmit", dates.value);
  isDateOpen.value = false;
}
</script>

<style>
.vc-sky-blue {
  --vc-accent-50: #f0f9ff;
  --vc-accent-100: #e0f2fe;
  --vc-accent-200: #bae6fd;
  --vc-accent-300: #7dd3fc;
  --vc-accent-400: #38bdf8;
  --vc-accent-500: #0ea5e9;
  --vc-accent-600: #0284c7;
  --vc-accent-700: #0369a1;
  --vc-accent-800: #075985;
  --vc-accent-900: #0c4a6e;
}
.vc-deep-green {
  --vc-accent-50: #e6f2d1; /* Very light green */
  --vc-accent-100: #cfe5a4; /* Light green */
  --vc-accent-200: #f9fafb; /* Soft green */
  --vc-accent-300: #91c74b; /* Bright green */
  --vc-accent-400: #6dbf2e; /* Vivid green */
  --vc-accent-500: #ED3237; /* Base color - Deep green */
  --vc-accent-600: #122b00; /* Darker green */
  --vc-accent-700: #0e2200; /* Even darker green */
  --vc-accent-800: #091a00; /* Very dark green */
  --vc-accent-900: #051300; /* Almost black green */
}
.vc-pane-container {
  border-radius: 12px;
}
.vc-container{
    width: 100%;
}
.vc-container .vc-weekday-1,
.vc-container .vc-weekday-7 {
  color: #ED3237;
}
.vc-header{
    margin-bottom: 10px;
}
.vc-pane-layout {
  /* border: 1px solid #e4e7ec;
  border-radius: 12px; */
  font-size: 14px;
  color: #344054;
}
.vc-pane-layout .vc-pane:last-child {
  border-left: 1px solid #e4e7ec;
}
.vc-weekday,
.vc-title-wrapper {
  font-size: 14px;
  color: #344054;
}
.vc-day-content {
  width: 40px;
  height: 40px;
  font-size: 14px;
}
</style>
