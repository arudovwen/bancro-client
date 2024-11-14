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
              ><span class="font-semibold">{{ currencyFormat(n.balance) }}</span
              ><span v-if="n.canHide"
                ><AppIcon icon="solar:eye-bold-duotone" /></span
            ></span>
          </div>

          <span>
            <SvgWalletcard v-if="n.icon === 'wallet'" />
            <SvgInvestmentcard v-if="n.icon === 'investment'" />
          </span>
        </div>
        <div class="flex justify-between items-center gap-x-2 text-[10.5px]">
          <span class="flex gap-x-2 items-center"
            >{{ n.rightBottom }}
            <span v-if="n.canCopy"
              ><AppIcon icon="solar:copy-bold-duotone"
            /></span>
            <span class="uppercase"> </span
          ></span>
          <span class="uppercase"> {{ n.leftBottom }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getSavingsAccountByUserid } from "~/services/savingsservice";

const authStore = useAuthStore()
const data = ref([
  {
    label: "Account balance",
    icon: "wallet",
    balance: 0,
    rightBottom: "WEMA BANK - 0123454009",
    leftBottom: "James Godwin",
    canCopy: true,
    canHide: true,
    color: "#182132",
  },
  {
    label: "Loan balance",
    icon: "investment",
    balance: 0,
    rightBottom: "Next due payment",
    leftBottom: "June 24, 2024",
    canCopy: false,
    canHide: false,
    color: "#57BE83",
  },
  {
    label: "Investment balance",
    icon: "investment",
    balance: 0,
    rightBottom: "Next due payment",
    leftBottom: "June 24, 2024",
    canCopy: false,
    canHide: false,
    color: "#FFC091",
  },
]);

async function getData() {
  const response = await getSavingsAccountByUserid(authStore.userId);
}

onMounted(()=>{
  getData()
})
</script>
