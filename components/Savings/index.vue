<template>
  <section>
    <div class="flex justify-between items-center mb-[30px]">
      <PageHeader title="Savings" />
      <button
        id="create-product-button"
        class="flex items-center gap-x-2 bg-[#9FE870] text-[14px] text-[#163300] rounded-lg py-[10px] px-[15px] font-medium"
        @click="() => navigateTo('/savings/create/1')"
      >
        <AppIcon icon="lets-icons:add-square-duotone" />
        <span>Create savings</span>
      </button>
    </div>
    <!-- <AppTab :tabs="tabs" /> -->
    <div class="max-w-[345px] mb-10">
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
                ><span class="font-semibold">{{
                  currencyFormat(n.balance)
                }}</span
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
            <span class="flex gap-x-2 items-center uppercase"
              >{{ n.rightBottom }}
              <span v-if="n.canCopy"
                ><AppIcon icon="solar:copy-bold-duotone"
              /></span>
              <span class="uppercase"> </span
            ></span>

          </div>
        </div>
      </div>
    </div>

    <div>
      <AppTab :tabs="tabs" buttonClass="" />
      <div>
        <SavingsActive />
        <SavingsTypes />
      </div>
    </div>
  </section>
</template>

<script setup>
const active = ref("active")
const data = ref([
  {
    label: "Total Savings",
    icon: "investment",
    balance: 38474747,
    rightBottom: "No active loan",
    leftBottom: "June 24, 2024",
    canCopy: false,
    canHide: false,
    color: "#57BE83",
  },
]);

const tabs = [
  {
    title: "active savings",
    key: "active",
  },
  {
    title: "completed savings",
    key: "completed",
  },
];
provide("active", active);
</script>
