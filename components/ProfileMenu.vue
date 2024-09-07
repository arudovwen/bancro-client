<template>
  <Menu as="div" class="relative" :class="parentClass">
    <MenuButton class="block w-full">
      <div class="flex gap-x-2 items-center">
        <span
          class="h-10 w-10 rounded-full bg-[#EDEFEB] flex items-center justify-center"
        >
          <AppIcon icon="mingcute:user-2-fill" />
        </span>
        <span class="text-sm font-medium">{{
          authStore?.userInfo?.fullName
        }}</span>
        <AppIcon icon="fluent:chevron-down-20-filled" />
      </div>
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
        :class="classMenuItems"
        class="absolute right-0 origin-top-right rounded bg-white w-[240px] shadow-dropdown z-[9999]"
      >
        <div v-if="!$slots.menus">
          <MenuItem v-slot="{ active }" v-for="(item, i) in options" :key="i">
            <span
              :class="`px-[10px] py-2 text-[#344054] ${
                item.hasDivider === true ? 'border-t border-[#E4E7EC]' : ''
              }  block`"
              @click="emits('handleClick', item)"
            >
              <div class="flex items-center" v-if="item.icon">
                <span class="block text-xl mr-3">
                  <AppIcon :icon="item.icon"
                /></span>
                <span class="block text-sm">{{ item.label }}</span>
              </div>
              <span v-else class="block text-sm cursor-pointer">{{
                item.label
              }}</span>
            </span>
          </MenuItem>
        </div>
        <template v-else>
          <slot name="menus"></slot>
        </template>
      </MenuItems>
    </Transition>
  </Menu>
</template>
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const authStore = useAuthStore();
const isSigniningOut = inject("isSigniningOut");
const options = [
  {
    label: "View profile",
    link: "",
    isUrl: false,
    icon: "",
  },
  {
    label: "Settings",
    link: "",
    isUrl: false,
    icon: "",
  },
  {
    label: "Logout",
    link: "",
    isUrl: false,
    icon: "",
  },
];
function handleClick(value) {
  if (value.label === "Logout") {
    isSigniningOut.value = true;
  }
}
</script>
