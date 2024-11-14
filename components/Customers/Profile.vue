<template>
  <div
    class="rounded-lg bg-white border border-[#EAECF0] py-[40px] px-6 md:px-[35px]"
  >
    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-[30px] mb-6">
      <div v-for="i in data" :key="i.key">
        <span class="block text-xs text-[#6A6C6A] mb-1">{{ i.label }}</span>
        <span class="block text-sm font-medium text-[#0E0F0C]">Test</span>
      </div>
    </div>
    <div>
      <AppButton
        iconPosition="left"
        text="Edit"
        icon="iconamoon:edit-light"
        btnClass="text-white bg-danger-500 px-6 !py-[10px] !rounded-lg font-semibold "
      />
    </div>
  </div>
</template>
<script setup>
const data = [
  {
    label: "First name",
    key: "firstName",
  },
  {
    label: "Middle name",
    key: "middleName",
  },
  {
    label: "Last name",
    key: "lastName",
  },
  {
    label: "Phone number",
    key: "phoneNumber",
  },
  {
    label: "Email address",
    key: "emailAddress",
  },
  {
    label: "Gender",
    key: "gender",
  },
  {
    label: "BVN",
    key: "bvn",
  },
  {
    label: "NIN",
    key: "nin",
  },
  {
    label: "Address",
    key: "address",
  },
  {
    label: "State",
    key: "state",
  },
  {
    label: "City ",
    key: "city",
  },
  {
    label: "Zipcode",
    key: "zipCode",
  },
];
</script>
