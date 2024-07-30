<template>
  <Dropdown :items="options" @handleClick="handleClick">
    <div class="flex gap-x-2 items-center">
      <span
        class="h-10 w-10 rounded-full bg-[#EDEFEB] flex items-center justify-center"
      >
        <AppIcon icon="mingcute:user-2-fill" />
      </span>
      <span class="text-sm font-medium">{{authStore?.userInfo?.fullName}}</span>
      <AppIcon icon="fluent:chevron-down-20-filled" />
    </div>
  </Dropdown>
</template>
<script setup>
const authStore = useAuthStore()
const isSigniningOut = inject("isSigniningOut")
const options = [
  {
    label: "Logout",
    link: "",
    isUrl:  false
  },
];
function handleClick(value){
if(value.label === "Logout"){
  isSigniningOut.value = true
}
}
</script>
