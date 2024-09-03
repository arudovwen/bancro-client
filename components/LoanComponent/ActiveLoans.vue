<template>
    <div class="grid grid-cols-3 gap-y-9 gap-x-[30px]" v-if="!financeData.length">
        <div @click="navigateTo('/loans/detail/1')" v-for="(n, id) in 4" :key="id">
            <ActiveLoan :detail="n" />
        </div>
    </div>

    <div v-else>
        <EmptyData type="active" title="No active loans" />
    </div>
 
</template>
<script setup>

import ActiveLoan from "./ActiveLoan"

const detail = ref(null);

const queryParams = reactive({
    SupplierId: null,
    RequestStatus: null,
    LoadRequestType: null,
    Search: "",
    SortOrder: null,
    PageNumber: 1,
    PageSize: 10,
    financeRequestStatus_In: [0, 1, 2, 3, 4, 5],
    loanStatus_In: [1],
});
const docLoading = ref(true);

const financeData = ref([]);
function getFinanceData() {
    docLoading.value = true;

    // getAllFinance(queryParams).then((res) => {
    //   financeData.value = res.data.data;
    //   queryParams.totalCount = res.data.data.totalCount;
    //   docLoading.value = false;
    // });
}

onMounted(() => {
    getFinanceData();
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