<template>
  <section class="w-[420px]">
    <h2 class="text-xl font-semibold mb-6 block text-[#344054]">
      Beneficiaries
    </h2>
    <div class="mb-7">
      <Textinput
        placeholder="Search beneficiary"
        label=""
        name=""
        type="search"
        v-model="search"
      />
    </div>
    <div class="grid grid-cols-1 gap-y-[10px] max-h-[300px] overflow-y-auto pb-6 pt-4">
      <div
        class="border-b border-[#21231D1A] last:border-none p-4 rounded-lg flex justify-between"
        v-for="n in filteredUsers"
        :key="n.id"
      >
        <span class="flex items-center gap-x-4">
          <SvgBeneficiary />
          <span class="block">
            <span
              class="text-sm text-[#344054] font-medium block leading-normal"
              >{{ n.name }}</span
            >
            <span class="text-sm text-[#98A2B3] block leading-normal"
              >{{ n.accountNumber }} - {{ n.bankName }}</span
            >
          </span>
        </span>
        <span
          @click="removeBeneficiary(n.id)"
          class="text-sm text-[#344054] font-semibold block leading-normal"
          ><SvgTrash
        /></span>
      </div>

      <div
        v-if="filteredUsers.length === 0"
        class="flex flex-col justify-center items-center gap-y-2"
      >
        <SvgBeneficiary />
        <p class="text-xs text-center text-gray-500">No beneficiary found!</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  getBeneficiaries,
  deleteBeneficiary,
} from "~/services/beneficiaryservice";

const authStore = useAuthStore();
const query = {
  userId: authStore.userId,
  pageNumber: 1,
  pageSize: 10000,
};
const rows = ref([]);
const search = ref("");
async function getData() {
  const response = await getBeneficiaries(query);
  if (response.status === 200) {
    rows.value = response.data.data;
  }
}

const filteredUsers = computed(() =>
  rows.value.filter((i) =>
    i.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

async function removeBeneficiary(id) {
  const response = await deleteBeneficiary({ id });
  if (response.status === 200) {
    getData();
  }
}
onMounted(() => {
  getData();
});
</script>
