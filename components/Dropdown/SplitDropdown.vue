<template>
  <Menu as="div" class="relative" :class="parentClass">
    <div class="split-btngroup flex">
      <button class="btn flex-1" :class="labelClass">{{ label }}</button>
      <MenuButton class="flex-0 px-3" :class="labelClass">
        <AppIcon :icon="splitIcon"
      /></MenuButton>
    </div>
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
              v-else
            >
              <div class="flex items-center" v-if="item.icon">
                <span class="block text-xl mr-3">
                  <AppIcon :icon="item.icon"
                /></span>
                <span class="block text-sm">{{ item.label }}</span>
              </div>
              <span v-else class="block text-sm">{{ item.label }}</span>
            </span>
          </MenuItem>
        </div>
        <div v-else class="paglawrapper">
          <slot name="menus"></slot>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  props: {
    label: {
      type: String,
      default: "DropDown",
    },
    labelClass: {
      type: String,
      default: "btn-primary",
    },
    classMenuItems: {
      type: String,
      default: " mt-2 w-[220px]",
    },
    classItem: {
      type: String,
      default: "px-4 py-2",
    },
    splitIcon: {
      type: String,
      default: "heroicons-outline:chevron-down",
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
        {
          label: "Another action",
          link: "#",
        },
        {
          label: "Something else here",
          link: "#",
        },
        {
          label: "Separated link",
          link: "#",
          hasDivider: true,
        },
      ],
    },
  },
};
</script>

<style lang="scss" scoped>
.split-btngroup {
  .btn {
    @apply rounded-r-none hover:ring-0;
  }
  button {
    @apply last:rounded-r-md last:border-l last:border-white last:border-opacity-[0.10];
    &:hover {
      box-shadow: none !important;
    }
  }
  [class*="btn-outline-"] {
    @apply last:border-l-0  focus:bg-transparent focus:text-inherit;
  }
  .btn-outline-primary {
    @apply focus:text-primary-500 last:border-primary-500;
  }
  .btn-outline-secondary {
    @apply focus:text-secondary-500 last:border-secondary-500;
  }
  .btn-outline-success {
    @apply focus:text-success-500 last:border-success-500;
  }
  .btn-outline-danger {
    @apply focus:text-danger-500 last:border-danger-500;
  }
  .btn-outline-warning {
    @apply focus:text-warning-500 last:border-warning-500;
  }
  .btn-outline-info {
    @apply focus:text-info-500 last:border-info-500;
  }
  .btn-outline-light {
    @apply focus:text-slate-600 last:border-[#E0EAFF];
  }
}
</style>
