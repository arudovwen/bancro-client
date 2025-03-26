<template>
  <div class="grid grid-cols-3 gap-y-9 gap-x-[30px]" v-if="rows.length">
    <div
      @click="navigateTo(`/loans/detail/${n.id}`)"
      v-for="(n, id) in rows"
      :key="id"
    >
      <ActiveLoan :detail="n" />
    </div>
  </div>

  <div v-else class="bg-white rounded-lg border border-[#DFE5EC]">
    <EmptyData type="active" title="No active loans" />
  </div>
</template>
<script setup>
import { getLoanRequests } from "~/services/loanservice";
import ActiveLoan from "./ActiveLoan";
import moment from "moment";

const detail = ref(null);

const queryParams = reactive({
  PageNumber: 1,
  PageSize: 10,
  Status: 10,
});
const docLoading = ref(true);

const rows = ref([]);
async function getData() {
  const response = await getLoanRequests(queryParams);
  if (response.status === 200) {
    rows.value = response.data.data.map((i) => ({
      ...i,
      amount: currencyFormat(i.amount),
      tenor: i.tenor ? `${i.tenor} days` : "-",
      createdAt: i.createdAt ? moment(i.createdAt).format("lll") : "-",
    }));
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
