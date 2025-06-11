<template>
  <div class="bg-white border border-[#DFE5EC] rounded-lg">
    <h2 class="text-base font-semibold text-[#182230] my-6 px-6">
      Repayment History
    </h2>
    <Table
      :columns="columns"
      :rows="rows"
      :hasExport="false"
      :queryParams="query"
    />
  </div>
</template>

<script setup>
import moment from "moment";
import { getRepaymentHistory } from "~/services/loanservice";

const isLoading = ref(false);
const { id } = useRoute().params;
const refresh = inject("refresh");
const columns = [
  {
    header: "Date",
    key: "createdAt",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Amount",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Channel",
    key: "channel",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Status",
    key: "status",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([]);
const query = reactive({
  PageNumber: 1,
});
async function getData() {
  try {
    isLoading.value = true;
    const response = await getRepaymentHistory(id);
    if (response.status === 200) {
      rows.value = response.data.data.map((i) => ({
        ...i,
        amount: currencyFormat(i.totalRepaidAmount),
        channel: "Web",
        createdAt: moment(i.createdAt).format("lll"),
      }));
      query.totalCount = response.data.data.total;
    }
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getData();
});
watch(refresh, () => {
  getData();
});
</script>
