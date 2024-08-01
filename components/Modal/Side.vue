<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-[99999]" @close="togglePopup()">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-[#0C111D]/80 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-16 md:pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
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
                  <div class="absolute top-0 left-0 -ml-11 flex pt-4">
                    <button
                      type="button"
                      class=" outline-none"
                      @click="togglePopup()"
                    >
                    
                    <SvgCancel />
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
import { defineProps, defineEmits } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogPanel,
} from "@headlessui/vue";

defineProps({
  canClose: {
    default: true,
  },
  isOpen: {
    default: false,
  },
});
const emit = defineEmits(["togglePopup"]);
function togglePopup() {
  emit("togglePopup");
}
</script>
