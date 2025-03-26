<template>
  <div class="grid gap-y-3">
    <div
      v-for="n in data"
      :key="n.label"
      class="px-6 py-4 rounded-xl bg-white shadow-[10px_40px_64px_12px_#1136810F] text-white bg-left bg-no-repeat relative overflow-hidden"
      :style="{ backgroundColor: n.color }"
    >
      <span
        :class="`bg-[url('/Noise.png')] absolute w-full top-0 left-0 h-full z-[1]`"
      />
      <span
        :class="`bg-[url('/pattern.png')] absolute w-full top-0 left-0 h-full z-[2]`"
      />
      <div class="relative z-[3]">
        <div class="flex justify-between items-start gap-x-4 mb-[14px]">
          <div>
            <span class="block text-xs mb-1">{{ n.label }}</span>
            <span class="flex gap-x-3 items-center text-xl"
              ><span class="font-semibold" v-if="!loading">{{
                n.balance
              }}</span>
              <Skeleton :count="1" v-else containerClass="w-[100px] h-5" />
              <span v-if="n.canHide"
                ><AppIcon icon="solar:eye-bold-duotone" /></span
            ></span>
          </div>

          <span>
            <SvgWalletcard v-if="n.icon === 'wallet'" />
            <SvgInvestmentcard v-if="n.icon === 'investment'" />
          </span>
        </div>
        <div class="flex justify-between items-center gap-x-2 text-[10.5px]">
          <span v-if="!loading" class="flex gap-x-2 items-center"
            >{{ n.rightBottom }}
            <span v-if="n.canCopy" @click="handleCopy">
              <AppIcon icon="solar:copy-bold-duotone"
            /></span>
            <span class="uppercase"> </span
          ></span>
          <Skeleton :count="1" v-else containerClass="w-[150px]" />
          <span class="uppercase" v-if="!loading"> {{ n.leftBottom }}</span>
          <Skeleton :count="1" v-else containerClass="w-[100px]" />
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toast } from "vue3-toastify";
import {
  getSavingsAccountByUserid,
  getSavingsAccountClientByUserid,
} from "~/services/savingsservice";

const accountNo = ref(null);
const authStore = useAuthStore();
const data = ref([
  {
    label: "Account balance",
    icon: "wallet",
    balance: 0,
    rightBottom: "xxxxxxx - xxxxxxxxxxx",
    leftBottom: "xxxx xxxxxx",
    canCopy: true,
    canHide: true,
    color: "#182132",
  },
  {
    label: "Loan balance",
    icon: "investment",
    balance: 0,
    rightBottom: "Next due payment",
    leftBottom: "xxxxxxx",
    canCopy: false,
    canHide: false,
    color: "#57BE83",
  },
  {
    label: "Investment balance",
    icon: "investment",
    balance: 0,
    rightBottom: "Next due payment",
    leftBottom: "xxxxxxx",
    canCopy: false,
    canHide: false,
    color: "#FFC091",
  },
]);
function handleCopy() {
  navigator.clipboard.writeText(accountNo.value);
  toast.info("Copied to clipboard!");
}
const loading = ref(true);
async function getData() {
  try {
    loading.value = true;

    // Use Promise.all for concurrent API calls
    const [accountResponse, clientResponse] = await Promise.all([
      getSavingsAccountByUserid(authStore.userId),
      getSavingsAccountClientByUserid(authStore.userId),
    ]);

    if (accountResponse.status === 200) {
      const { issuer, savingsAccountNo, firstName, lastName } =
        accountResponse.data.data;

      accountNo.value = savingsAccountNo;
      data.value = data.value.map((item, index) =>
        index === 0
          ? {
              ...item,
              rightBottom: `${issuer || "Wema Bank"} - ${savingsAccountNo}`,
              leftBottom: `${ucFirst(firstName)} ${ucFirst(lastName)}`,
            }
          : item
      );
    }
    if (clientResponse.status === 200) {
      const clientAccount = clientResponse.data.data.savingsAccounts[0];

      data.value = data.value.map((item, index) =>
        index === 0
          ? { ...item, balance: currencyFormat(clientAccount.accountBalance) }
          : item
      );
    }
  } catch (error) {
    console.error("Error fetching savings account data:", error);
    toast.error("Failed to fetch account information");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getData();
});
</script>
