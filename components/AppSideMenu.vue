<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-[999]" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-[#333] transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-16 md:pr-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="-translate-x-full"
              enter-to="-translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="-translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto relative w-screen max-w-md"
              >
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div class="absolute top-0 right-0 -mr-11 flex pt-4">
                    <button
                      type="button"
                      class="rounded-md text-gray-300 hover:text-white outline-none"
                      @click="open = false"
                    >
                      <span class="sr-only">Close</span>
                      <AppIcon icon="ph:x" class="text-xl" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl pb-8"
                >
                  <div class="relative flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <slot name="content"> </slot>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import {
  categories,
  navigations,
  mobileNavigation,
  financeMenu,
  mobileMenu,
} from "~/utils/data";
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  // DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { logOut } from "~/services/authservices";

const storeOpen = ref(false);
const route = useRoute();
const activeKey = ref(null);
const cartStore = useCartStore();
const authStore = useAuthStore();
const isSigniningOut = ref(false);
const mappedNav = computed(() => {
  return navigation.filter((i) =>
    (authStore?.userType?.toLowerCase() === "supplier"
      ? vendorRoutes
      : buyerRoutes
    ).includes(i.key)
  );
});
const open = inject("open");
watch(
  () => route.path,
  () => {
    storeOpen.value = false;
  },
  { deep: true, immediate: true }
);
provide("activeKey", activeKey);
</script>
