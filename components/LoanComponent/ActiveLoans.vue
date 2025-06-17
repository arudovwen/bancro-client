<template>
  <div
    class="grid grid-cols-3 gap-y-9 gap-x-[30px]"
    v-if="rows.length && !loading"
  >
    <div
      @click="navigateTo(`/loans/detail/${n.id}`)"
      v-for="(n, id) in rows"
      :key="id"
    >
      <ActiveLoan :detail="n" />
    </div>
  </div>
  <div v-if="loading">
    <TableLoader />
  </div>
  <div v-if="!rows.length && !loading" class="bg-white rounded-lg border border-[#DFE5EC]">
    <EmptyData type="active" title="No active loans" />
  </div>
</template>
<script setup>
import { getLoanRequests } from "~/services/loanservice";
import ActiveLoan from "./ActiveLoan";
import moment from "moment";
import TableLoader from "../TableLoader.vue";

const detail = ref(null);
const loading = ref(false);
const queryParams = reactive({
  PageNumber: 1,
  PageSize: 10,
  Status: 10,
});
const docLoading = ref(true);

const rows = ref([]);
async function getData() {
  try {
    loading.value = true;
    const response = await getLoanRequests(queryParams);
    if (response.status === 200) {
      rows.value = response.data.data.map((i) => ({
        ...i,
        amount: currencyFormat(i.approvedAmount),
        tenor: i.tenure ? `${i.tenure} days` : "-",
        createdAt: i.createdAt ? moment(i.createdAt).format("lll") : "-",
      }));
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
