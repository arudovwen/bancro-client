<script setup lang="ts">
import { useIdle, useTimestamp } from "@vueuse/core";
import { computed, ref } from "vue";

const IDLE_TIMEOUT = 1 * 60 * 1000;
const WARNING_THRESHOLD = 30;

const authStore = useAuthStore();
const { idle, lastActive } = useIdle(IDLE_TIMEOUT);
const showWarning = ref(false);
const now = useTimestamp({ interval: 1000 });

const idledFor = computed(() =>
  Math.floor((now.value - lastActive.value) / 1000)
);

const timeUntilIdle = computed(() =>
  Math.max(0, Math.floor(IDLE_TIMEOUT / 1000 - idledFor.value))
);

const warningMessage = computed(() =>
  idle.value
    ? "Are you there?"
    : `Session will timeout in ${timeUntilIdle.value}s`
);

// Add warning class based on time remaining
const warningClass = computed(() => {
  if (idle.value) return "bg-red-50 text-red-700";
  if (timeUntilIdle.value <= 10) return "bg-orange-50 text-orange-700";
  return "bg-gray-50 text-gray-700";
});

watchEffect(() => {
  showWarning.value = timeUntilIdle.value <= WARNING_THRESHOLD && !idle.value;
});

watchEffect(() => {
  if (idle.value) {
    authStore.logOut();
  }
});
const resetIdle = () => {
  lastActive.value = Date.now();
  showWarning.value = false;
};
</script>

<template>
  <!-- <Transition name="fade">
    <div
      v-if="showWarning || idle"
      :class="[
        'mb-2 flex justify-between items-center px-4 py-3 rounded-lg shadow-sm',
        'transition-all duration-300 ease-in-out',
        warningClass,
      ]"
    >
      <span class="font-medium flex items-center gap-2">
        <i class="fas fa-clock" />
        {{ warningMessage }}
      </span>
      <button
        type="button"
        class="px-3 py-1 rounded-md bg-white shadow-sm hover:shadow-md transition-all duration-200 font-medium"
        :class="idle ? 'text-red-500' : 'text-primary-500'"
        @click="resetIdle"
      >
        Yes, I'm here
      </button>
    </div>
  </Transition> -->
  <IndexModal :is-open="showWarning" @toggle-popup="resetIdle" :can-close="false">
    <template #content>
      <div class="h px-10 py-6 bg-white rounded-lg relative flex flex-col gap-y-2">
        <div class="mb-6 text-center">
          <h3 class="font-semibold text-xl mb-2">Are you still there?</h3>
         <p>  <span class="font-medium flex items-center gap-2 text-sm">
            <i class="fas fa-clock" />
            {{ warningMessage }}
          </span></p>
        </div>
        <div class="flex justify-center">
          <button
            type="button"
            class="px-4 py-[10px] rounded-md bg-primary-500 text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium border border-gray-200 text-sm"
           
            @click="resetIdle"
          >
            Yes, I'm here
          </button>
        </div>
      </div>
    </template>
  </IndexModal>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
