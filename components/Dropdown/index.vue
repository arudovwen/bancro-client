<template>
  <Menu as="div" class="relative" :class="parentClass">
    <MenuButton v-if="$slots.default" class="block w-full">
      <slot></slot>
    </MenuButton>
    <MenuButton v-else :class="labelClass" class="block w-full">{{
      label
    }}</MenuButton>
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
        class="absolute right-0 origin-top-right rounded bg-white darks:bg-slate-800 darks:border darks:border-slate-700 shadow-dropdown z-[9999]"
      >
        <div v-if="!$slots.menus">
          <MenuItem v-slot="{ active }" v-for="(item, i) in items" :key="i">
            <NuxtLink
              :class="`${
                active
                  ? 'bg-slate-100 text-slate-900 darks:bg-slate-600 darks:text-slate-300 darks:bg-opacity-50'
                  : 'text-slate-600 darks:text-slate-300'
              } block   ${classItem}  ${
                item.hasDivider
                  ? 'border-t border-slate-100 darks:border-slate-700'
                  : ''
              }`"
              :to="item.link"
              v-if="item.link"
            >
              <div class="flex items-center" v-if="item.icon">
                <span class="block text-xl mr-3">
                  <AppIcon :icon="item.icon"
                /></span>
                <span class="block text-sm">{{ item.label }}</span>
              </div>
              <span v-else class="block text-sm">{{ item.label }}</span>
            </NuxtLink>
            <span
              :class="`${active ? 'bg-slate-100 text-slate-800' : ''}  ${
                item.hasDivider === true
                  ? 'border-t border-gray-500 darks:border-slate-700'
                  : ''
              }  block ${classItem}`"
              @click="emits('handleClick', item)"
              v-else
            >
              <div class="flex items-center" v-if="item.icon">
                <span class="block text-xl mr-3">
                  <AppIcon :icon="item.icon"
                /></span>
                <span class="block text-sm">{{ item.label }}</span>
              </div>
              <span v-else class="block text-sm cursor-pointer">{{ item.label }}</span>
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

const props = defineProps({
  label: {
    type: String,
    default: "DropDown",
  },
  labelClass: {
    type: String,
  },
  classMenuItems: {
    type: String,
    default: "mt-2 w-[220px]",
  },
  classItem: {
    type: String,
    default: "px-4 py-2",
  },
  parentClass: {
    type: String,
    default: "inline-block",
  },
  items: {
    type: Array,

    default: () => [
      {
        label: "Action",
        link: "#",
      },
    ],
  },
});
const emits = defineEmits(["handleClick"]);
</script>
