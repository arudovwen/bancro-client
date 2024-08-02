<template>
  <div class="border-[#EAECF0] border rounded-xl w-full py-6 bg-white h-full">
    <div class="flex justify-between mb-5 px-6">
      <span>
        <h2 class="text-lg font-semibold mb-[2px] capitalize">
          Recent transactions
        </h2>
        <p class="text-sm text-[#71717A]">
          Your most recent transactions from all accounts
        </p>
      </span>
      <button
      @click="navigateTo('/transactions')"
        class="text-xs text-primary-500 flex gap-x-2 items-center h-auto font-medium"
      >
        See all transactions <AppIcon icon="fa6-solid:chevron-right" />
      </button>
    </div>

    <div>
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(n, id) in rows"
            :key="id"
            class="border-b border-[#DFE5EC] last:border-none"
          >
            <td class="py-4 px-6">
              <span class="flex gap-x-3 items-center">
                <span class="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center">

                  <SvgDebit v-if="n.status==0" />
                </span>
                <span>
                  <span class="text-sm text-[#0E0F0C] font-medium block">{{
                    n.name
                  }}</span>
                  <span class="text-sm text-[#6A6C6A]">{{ n.action }}</span>
                </span>
              </span>
            </td>
            <td class="py-4 px-6">
              <span>
                <span
                  class="text-sm text-[#0E0F0C] font-medium block"
                  :class="n.status === 1 ? '' : 'text-red-500'"
                  >{{ currencyFormat(n.balance) }}</span
                >
                <span class="text-sm text-[#6A6C6A]">{{ n.date }}</span>
              </span>
            </td>
            <td class="py-4 px-6">
              <AppStatusButton :status="n.status" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import AppStatusButton from "../AppStatusButton.vue";

const columns = [
  {
    header: "transaction ref",
    key: "transactionRef",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "amount",
    key: "amount",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "payment method",
    key: "paymentMethod",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "date/time",
    key: "date",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "status",
    key: "status",
    isHtml: false,
    isStatus: true,
  },
];

const rows = ref([
  {
    name: "John snow",
    action: "Bank transfer",
    date: "05 Mar. 2024  3:37 AM",
    balance: 304948,
    status: 1,
  },
  {
    name: "Netflix",
    action: "Bill payment",
    date: "05 Mar. 2024  3:37 AM",
    balance: 4948,
    status: 0,
  },
  {
    name: "04875755776-MTN",
    action: "Airtime purchase",
    date: "05 Mar. 2024  3:37 AM",
    balance: 3049,
    status: 1,
  },
  {  name: "Netflix",
    action: "Bill payment",
    date: "05 Mar. 2024  3:37 AM",
    balance: 4948,
    status: 0,
  }
]);
</script>
