<template>
  <div
    class="border-[#EAECF0] border rounded-lg w-full pt-11 pb-6 px-10 bg-white"
  >
    <div class="flex items-start justify-between mb-4">
      <div>
        <h2 class="text-sm font-medium text-[#475467] mb-1">Total revenue</h2>
        <span class="text-[#101828] text-2xl font-semibold block">{{
          currencyFormat(20000000)
        }}</span>
      </div>
      <div
        class="border border-[#D0D5DD] rounded-lg text-xs lg:text-sm text-[#344054] max-w-max flex items-center"
      >
        <button
          class="px-4 py-[10px] text-sm border-r border-[#D0D5DD] first:rounded-l-lg last:border-none font-medium whitespace-nowrap text-[#344054]"
          :class="active === n.value ? 'bg-[#F9FAFB]' : ''"
          v-for="n in filters"
          @click="active = n.value"
        >
          {{ n.title }}
        </button>
        <ClientOnly>
          <VueDatePicker
            v-model="date"
            range
            multi-calendars
            placeholder="Custom"
            :time-picker="false"
            input-class-name="!text-sm !border-none !w-[120px] placeholder:!text-[#344054] !font-medium"
          />
        </ClientOnly>
      </div>
    </div>
    <div>
      <client-only>
        <apexchart
          type="bar"
          height="300"
          :options="chartOptions"
          :series="series"
        ></apexchart
      ></client-only>
    </div>
  </div>
</template>
<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

const chartOptions = computed(() => {
  return {
    plotOptions: {
      bar: {
        borderRadius: 10,
        // borderRadiusApplication: 'end',
        // borderRadiusWhenStacked: 'last',
      },
    },
    colors: ["#EAECF0"],
    yaxis: {
      show: true,
      title: {
        text: "Amount",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontFamily: "Inter, Arial, sans-serif",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-title",
        },
      },
    },
    legend: {
      show: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
    },

    dataLabels: {
      enabled: false,
    },
    labels: ["Apples", "Oranges"],
    // stroke: {
    //   curve: "smooth",
    //   width: 1,
    // },
    xaxis: {
      enabled: true,
      type: "category",
      categories: getMonthsInYear(),
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
          colors: [],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
      title: {
        text: "Month",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontFamily: "Inter, Arial, sans-serif",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-title",
        },
      },
    },

    tooltip: {
      y: {
        format: "MM dd",
        formatter: (value) => currencyFormat(value),
      },
    },
  };
});

const series = [
  {
    name: "Amount",
    data: [23, 34, 12, 54, 32, 43, 43, 23, 97, 107, 53, 85],
  },
];
const date = ref(null);
const filters = [
  {
    title: "All time",
    value: "all",
    duration: "months",
  },
  {
    title: "30 days",
    value: 30,
    duration: "days",
  },
  {
    title: "7 days",
    value: 7,
    duration: "days",
  },
];
const active = ref(null);

function getMonthsInYear() {
  const months = [];
  for (let month = 0; month < 12; month++) {
    const monthName = moment().month(month).format("MMMM");
    months.push(monthName);
  }
  return months;
}
</script>
