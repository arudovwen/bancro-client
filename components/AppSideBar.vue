<template>
  <h1 class="text-[#919EAB] text-[11px] mb-2 lg:px-4 font-semibold uppercase">
    <span class="lg:px-[16px]">Overview</span>
  </h1>

  <ul class="grid grid-cols-1 gap-y-1 lg:px-4">
    <li v-for="item in mappedNavigation" :key="item.name">
      <span v-if="!item.hasChildren">
        <NuxtLink
          v-if="!item.disabled"
          :disabled="item.disabled"
          :to="item.disabled ? '#' : item.url"
          class="text-sm flex items-center px-[10px] font-medium rounded-lg text-[#637381]"
          :activeClass="`${
            item.hasChildren ? '' : 'bg-[#9FE870]'
          }  !text-primary-500 block font-semibold`"
          :class="
            item.disabled
              ? 'opacity-40'
              : ' hover:bg-[#9FE870]/20 hover:text-primary-500'
          "
        >
          <span
            class="flex items-center justify-between gap-x-[10px] flex-1 py-[10px]"
          >
            <span class="flex gap-x-[10px]">
              <SvgHome :active="route.path === item.url" :keyvalue="item.key" />
              <SvgAccount
                :active="route.path === item.url"
                :keyvalue="item.key"
              />
              <SvgPayment
                :active="route.path === item.url"
                :keyvalue="item.key"
              />
              <SvgLoan :active="route.path === item.url" :keyvalue="item.key" />
              <SvgSavings
                :active="route.path === item.url"
                :keyvalue="item.key"
              />
              <SvgCard :active="route.path === item.url" :keyvalue="item.key" />
              <SvgInvestment
                :active="route.path === item.url"
                :keyvalue="item.key"
              />
              <span class="flex items-center"> {{ item.name }}</span>
            </span>
            <span
              v-if="item.disabled"
              class="font-semibold bg-[#919EAB29] text-xs text-[#637381] rounded py-[2px] px-1"
              >Coming soon</span
            >
          </span>
        </NuxtLink>
        <span
          v-else
          class="text-sm flex items-center px-[10px] font-medium cursor-not-allowed rounded-lg text-[#637381]"
          :class="
            item.disabled ? 'opacity-70' : 'opacity-90 hover:text-primary-500'
          "
        >
          <span
            class="flex items-center justify-between gap-x-[10px] flex-1 py-[10px]"
          >
            <span class="flex gap-x-[10px]">
              <SvgHome :active="route.path === item.url" :keyvalue="item.key" />
              <SvgAccount
                :active="route.path === item.url"
                :keyvalue="item.key"
              />
              <SvgPayment
                :active="route.path === item.url"
                :keyvalue="item.key"
              />
              <SvgLoan :active="route.path === item.url" :keyvalue="item.key" />
              <SvgSavings
                :active="route.path === item.url"
                :keyvalue="item.key"
              />
              <SvgCard :active="route.path === item.url" :keyvalue="item.key" />
              <SvgInvestment
                :active="route.path === item.url"
                :keyvalue="item.key"
              />
              <span class="flex items-center"> {{ item.name }}</span>
            </span>
            <span
              v-if="item.disabled"
              class="font-semibold bg-[#919EAB29] text-[10px] text-[#637381] rounded py-[2px] px-1"
              >Coming soon</span
            >
          </span>
        </span>
      </span>

      <span
        v-else
        @click="handlOpen(item.name)"
        class="text-sm flex items-center px-[10px] cursor-pointer font-medium hover:bg-[#9FE870]/20 hover:text-primary-500 rounded-lg text-[#637381]"
        :activeClass="`${
          item.hasChildren ? '' : 'bg-[#9FE870]'
        }  !text-primary-500 block font-semibold`"
        :class="
          openedlinks.includes(item.name)
            ? 'bg-[#9FE870]/20 text-primary-500'
            : ''
        "
      >
        <span
          class="flex items-center justify-between gap-x-[10px] flex-1 py-[10px]"
        >
          <span class="flex items-center gap-x-[10px]">
            <SvgPayment
              :active="route.path === item.url"
              :keyvalue="item.key"
            />
            <SvgAccount
              :active="route.path === item.url"
              :keyvalue="item.key"
            />
            <span> {{ item.name }}</span>
          </span>
          <AppIcon
            v-if="item.hasChildren"
            :icon="
              openedlinks.includes(item.name)
                ? 'heroicons:chevron-down-20-solid'
                : 'heroicons:chevron-right-20-solid'
            "
            iconClass="text-xl text-[#637381]"
          />
        </span>
      </span>
      <TransitionRoot
        :show="openedlinks.includes(item.name)"
        enter="transition-opacity duration-75"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div v-if="item.hasChildren" class="my-[5px] rounded-lg">
          <ul class="grid gap-y-[1px]">
            <li v-for="child in item.children" :key="item.name">
              <NuxtLink
                :to="child.disabled ? '#' : child.url"
                class="text-sm flex items-center px-[10px] font-medium rounded-lg text-[#637381]"
                activeClass="!text-primary-500 block font-semibold"
                :class="
                  child.disabled ? 'opacity-50 !text-[#637381] cursor-not-allowed' : 'hover:text-primary-500'
                "
              >
                <span class="flex items-center gap-x-2 flex-1 py-[6px]">
                  <span class="flex items-center justify-center w-6 h-6">
                    <span
                      :class="
                        route.path === child.url && !child.disabled
                          ? 'w-2 h-2 rounded-full bg-[#9FE870]'
                          : 'w-1 h-1 rounded-full bg-[#637381]'
                      "
                    ></span>
                  </span>
                  <span class="text-sm"> {{ child.name }}</span>
                </span>
                <span
                  v-if="child.disabled"
                  class="font-semibold bg-[#919EAB29] text-[10px] text-[#637381] rounded py-[2px] px-1"
                  >Coming soon</span
                >
              </NuxtLink>
            </li>
          </ul>
        </div>
      </TransitionRoot>
    </li>
  </ul>
</template>
<script setup>
import { TransitionRoot } from "@headlessui/vue";

const route = useRoute();
const isShowing = ref(null);
const openedlinks = ref([]);
const setIsShowing = (value) => {
  isShowing.value = value;
};
const authStore = useAuthStore();

const mappedNavigation = computed(
  () => navigation
  // .filter((i) => i.roles.includes(authStore?.userRole?.toLowerCase()))
);

function handlOpen(val) {
  if (openedlinks.value.includes(val)) {
    const [val, ...sublinks] = openedlinks.value;
    openedlinks.value = sublinks;
  } else {
    openedlinks.value = [...openedlinks.value, val];
  }
}
</script>
