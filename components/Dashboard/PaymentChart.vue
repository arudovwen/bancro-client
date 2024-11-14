<template>
  <div class="border-[#EAECF0] border rounded-xl w-full p-6 bg-white h-full max-h-[356px]">
    <div
      class="flex flex-col lg:flex-row gap-y-5 items-start justify-between mb-4"
    >
      <div>
        <h2 class="text-[#101828] text-lg font-semibold block">
          Balance Trend
        </h2>
      </div>
      <DatePicker @handleSubmit="" />
    </div>
    <div>
      <client-only>
        <apexchart
          type="area"
            
          height="260"
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

const isDateOpen = ref(false);
const chartOptions = computed(() => {
  return {
    colors: ["#F04648"],
    yaxis: {
      show: true,
      title: {
        text: "Balance",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontFamily: "Onest, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-title",
          color: "#475467",
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
      borderColor: "#edefeb",
    },

    dataLabels: {
      enabled: false,
    },
    labels: ["Apples", "Oranges"],
    stroke: {
      curve: "smooth",
      width: 1,
    },
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
          fontFamily: "Onest, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-title",
          color: "#475467",
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
provide("isDateOpen", isDateOpen);
</script>
