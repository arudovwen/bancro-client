<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="onClose" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed top-0 bottom-0 right-0 left-0 inset-0 bg-[#000000] opacity-25"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <div v-if="$slots.default">
                  <slot />
                </div>
              </div>

              <div class="mt-4 flex gap-x-2 items-center w-full">
                <button
                  v-if="PrimaryActionProps.label.length > 0"
                  type="button"
                  class="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  :class="[PrimaryActionProps.classes.root].join(' ')"
                  @click="PrimaryActionProps.onClick"
                >
                  {{ PrimaryActionProps.label }}
                </button>
                <button
                  v-if="SecondaryActionProps.label.length > 0"
                  type="button"
                  class="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  :class="[SecondaryActionProps.classes.root].join(' ')"
                  @click="SecondaryActionProps.onClick"
                >
                  {{ SecondaryActionProps.label }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  PrimaryActionProps: {
    type: Object,
    default: {
      label: "",
      onClick: () => {},
      classes: {
        root: {
          type: String,
          default: "",
        },
      },
    },
  },
  SecondaryActionProps: {
    type: Object,
    default: {
      label: "",
      onClick: () => {},
      classes: {
        root: {
          type: String,
          default: "",
        },
      },
    },
  },
  onClose: {
    type: Function,
    default: () => {},
  },
  classes: {
    type: Object,
    default: {
      root: {
        type: String,
        default: "",
      },
    },
  },
});
</script>
