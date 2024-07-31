<template>
  <h1 class="text-[#919EAB] text-[11px] mb-2  lg:px-4 font-semibold uppercase">
    <span class="lg:px-[16px]">Overview</span>
  </h1>

  <ul class="grid grid-cols-1 gap-y-1 lg:px-4">
    <li v-for="item in mappedNavigation" :key="item.name">
      <span v-if="!item.hasChildren">
        <NuxtLink
          v-if="!item.disabled"
          :to="item.url"
          class="text-sm flex items-center px-[10px] font-medium hover:bg-[#9FE870]/20 hover:text-primary-500 rounded-lg text-[#637381]"
          :activeClass="`${
            item.hasChildren ? '' : 'bg-[#9FE870]'
          }  !text-primary-500 block font-semibold`"
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
          class="text-sm flex items-center px-[10px] font-medium cursor-not-allowed opacity-90 hover:text-primary-500 rounded-lg text-[#637381]"
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
        </span>
      </span>

      <span
        v-else
        @click="isShowing ? setIsShowing(null) : setIsShowing(item.name)"
        class="text-sm flex items-center px-[10px] cursor-pointer font-medium hover:bg-[#9FE870]/20 hover:text-primary-500 rounded-lg text-[#637381]"
        :activeClass="`${
          item.hasChildren ? '' : 'bg-[#9FE870]'
        }  !text-primary-500 block font-semibold`"
      >
        <span
          class="flex items-center justify-between gap-x-[10px] flex-1 py-[10px]"
        >
          <span class="flex items-center gap-x-[10px]">
            <SvgPayment
              :active="route.path === item.url"
              :keyvalue="item.key"
            />
            <span> {{ item.name }}</span>
          </span>
          <AppIcon
            v-if="item.hasChildren"
            :icon="
              isShowing
                ? 'heroicons:chevron-down-20-solid'
                : 'heroicons:chevron-right-20-solid'
            "
            iconClass="text-xl text-[#637381]"
          />
        </span>
      </span>
      <TransitionRoot
        :show="isShowing === item.name"
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
                :to="child.url"
                class="text-sm flex items-center px-[10px] font-medium hover:text-primary-500 rounded-lg text-[#637381]"
                activeClass="!text-primary-500 block font-semibold"
              >
                <span class="flex items-center gap-x-3 flex-1 py-[6px]">
                  <span class="w-6 h-6 flex items-center justify-center">
                    <span
                      :class="
                        route.path === child.url
                          ? 'w-2 h-2 rounded-full bg-[#9FE870]'
                          : 'w-1 h-1 rounded-full bg-[#637381]'
                      "
                    ></span>
                  </span>
                  <span class="text-sm"> {{ child.name }}</span>
                </span>
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
const setIsShowing = (value) => {
  isShowing.value = value;
};
const authStore = useAuthStore();

const mappedNavigation = computed(
  () => navigation
  // .filter((i) => i.roles.includes(authStore?.userRole?.toLowerCase()))
);
</script>
