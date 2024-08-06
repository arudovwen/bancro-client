<template>
  <div
    class="border-[#EAECF0] border rounded-lg w-full pt-11 pb-6 px-10 bg-white"
  >
    <div>
      <span class="block text-lg mb-4 text-[#101828] font-medium"
        >Customer growth</span
      >
    </div>
    <div class="flex flex-col lg:flex-row gap-x-8 w-full">
      <div class="flex-1">
        <div class="">
          <client-only>
            <apexchart
              type="area"
              height="300"
              :options="chartOptions"
              :series="series"
            ></apexchart
          ></client-only>
        </div>
      </div>
      <div
        class="mt-4 xl:w-[200px] flex flex-row lg:flex-col gap-6 justify-between xl:justify-start"
      >
        <div
          class="leading-tight text-center md:text-left"
          v-for="n in Statistics"
          :key="n.title"
        >
          <span
            class="block text-[#475467] font-medium text-xs lg:text-sm capitalize mb-1"
            >{{ n.title }}</span
          >
          <div class="flex gap-x-1 items-start">
            <span class="block text-base lg:text-xl xl:text-[30px] font-bold">{{
              stats?.[n.key] || 0
            }}</span>
            <span class="text-xs flex gap-x-1 items-center text-[#17B26A]">
              <AppIcon icon="uil:arrow-growth" iconClass="!text-[#17B26A]" />
              <span>{{ stats?.[n.percent] || 0 }}%</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

const Statistics = [
  {
    title: "overview loans",
    key: "productViews",
    percent: "productViewPercentage",
  },
  {
    title: "confirmed orders",
    key: "confirmedOrders",
    percent: "confirmOrdersPecentage",
  },
  {
    title: "pending orders",
    key: "pendingOrder",
    percent: "pendingorderPercentage",
  },
];
const stats = ref(null);
const chartOptions = computed(() => {
  return {
    plotOptions: {
      bar: {
        borderRadius: 10,
        // borderRadiusApplication: 'end',
        // borderRadiusWhenStacked: 'last',
      },
    },
    colors: ["#7F56D9"],
    yaxis: {
      show: true,
      title: {
        text: "Amount",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontFamily: "Onest, Arial, sans-serif",
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
    stroke: {
      curve: "smooth",
      width: 2,
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
    name: "Active users",
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
