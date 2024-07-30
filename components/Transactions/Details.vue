<template>
  <section>
    <div class="flex justify-between mb-6">
      <div>
        <span class="text-lg font-semibold block mb-2">
          {{ currencyFormat(4599999) }}</span
        >
        <span class="text-xs text-[#999999]">Amont paid</span>
      </div>
      <div>
        <AppButton text="Refund" />
      </div>
    </div>
    <div class="border-[#EAECF0] border rounded-lg w-full bg-white flex">
      <div class="w-[60%] border-[#EAECF0] border-r p-6">
        <h2 class="text-sm font-semibold mb-4">Payment information</h2>

        <table>
          <tbody>
            <tr class="py-4" v-for="item in paymentOptions" :key="item.key">
              <td class="text-sm text-[#7E8B9E] capitalize py-3 pr-6">
                {{ item.label }}
              </td>
              <td class="text-sm font-medium text-[#444444] py-3 px-6">-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1 flex flex-col">
        <div class="border-[#EAECF0] border-b px-6 pt-6 pb-10">
          <h2 class="text-sm font-semibold mb-4">Customer information</h2>
          <table>
            <tbody>
              <tr class="py-4" v-for="item in customerOptions" :key="item.key">
                <td class="text-sm text-[#7E8B9E] capitalize py-3 pr-6">
                  {{ item.label }}
                </td>
                <td class="text-sm font-medium text-[#444444] py-3 px-6">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-6 flex-1">
          <h2 class="text-sm font-semibold mb-4">Notification information</h2>
          <table>
            <tbody>
              <tr
                class="py-4"
                v-for="item in notificationOptions"
                :key="item.key"
              >
                <td class="text-sm text-[#7E8B9E] capitalize py-3 pr-6">
                  {{ item.label }}
                </td>
                <td class="text-sm font-medium text-[#444444] py-3 px-6">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const paymentOptions = [
  {
    label: "Initialized amount",
    key: "initialixedAmount",
  },
  {
    label: "Expected amount",
    key: "expectedAmount",
  },
  {
    label: "Fees",
    key: "fees",
  },
  {
    label: "Date initialized",
    key: "dateInitialized",
  },

  {
    label: "payment date",
    key: "paymentDate",
  },
  {
    label: "Payment description",
    key: "paymentDesc",
  },
  {
    label: "transaction reference",
    key: "transactionReference",
  },
  {
    label: "payment reference",
    key: "paymentReference",
  },
  {
    label: "payment method",
    key: "paymentMethod",
  },
  {
    label: "Source account details",
    key: "sourceAccount",
  },
  {
    label: "destination account details",
    key: "destinationAccount",
  },
];

const customerOptions = [
  {
    label: "Customer name",
    key: "customerName",
  },
  {
    label: "Email",
    key: "email",
  },
];
const notificationOptions = [
  {
    label: "Url ",
    key: "url",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "No of attempts",
    key: "noOfAttempts",
  },
];
</script>
