<template>
  <Menu as="div" class="relative">
    <MenuButton class="w-full flex items-center gap-x-2">
      <div
        class="h-10 w-10 rounded-full bg-[#EDEFEB] flex items-center justify-center"
      >
        <AppIcon icon="mingcute:user-2-fill" />
      </div>
      <span class="text-sm font-medium">{{
        authStore?.userInfo?.fullName
      }}</span>
      <AppIcon icon="fluent:chevron-down-20-filled" />
    </MenuButton>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 origin-top-right rounded-lg bg-white w-[240px] shadow-dropdown z-[9999] py-2"
      >
        <div class="grid">
          <div class="mb-2 flex items-center px-[14px] gap-x-2">
            <div
              class="h-10 w-10 rounded-full bg-[#EDEFEB] flex items-center justify-center"
            >
              <AppIcon icon="mingcute:user-2-fill" />
            </div>
            <div>
              <span class="text-sm font-medium block">{{ authStore.fullName || authStore.companyName }}</span>
              <span class="text-sm block max-w-[160px] truncate">{{authStore.email}}</span>
            </div>
          </div>
          <hr class="my-1 border-[#E4E7EC]" />
          <template v-for="(item, index) in options" :key="index">
            <MenuItem @click="handleMenuItemClick(item)">
              <span
                :class="[
                  'px-[14px] py-[10px] text-[#344054] cursor-pointer block',
                  { 'border-t border-[#E4E7EC]': item.hasDivider },
                ]"
              >
                <div v-if="item.icon" class="flex items-center">
                  <span class="text-xl mr-3">
                    <AppIcon :icon="item.icon" />
                  </span>
                  <span class="text-sm">{{ item.label }}</span>
                </div>
                <span v-else class="text-sm">{{ item.label }}</span>
              </span>
            </MenuItem>
          </template>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
  <AppLogout v-if="isLogOut" />
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { computed, inject } from "vue";

const authStore = useAuthStore();
const isLogOut = ref(false);

const options = computed(() => [
  { label: "View profile", link: "/settings/profile", icon: "ri:user-3-line" },
  { label: "Settings", link: "/settings/security", icon: "uil:cog" },
  {
    label: "Logout",
    link: "logout",
    icon: "material-symbols:logout-rounded",
    hasDivider: true,
  },
]);

const handleMenuItemClick = (item) => {
  if (item.link === "logout") {
    isLogOut.value = true;
  } else {
    navigateTo(item.link);
  }
};
provide("isLogOut", isLogOut);
</script>
