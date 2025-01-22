<script setup lang="ts">
import { useIdle, useTimestamp } from "@vueuse/core";
import { computed, ref } from "vue";

const IDLE_TIMEOUT =30 * 60 * 1000;
const WARNING_THRESHOLD = 30;

const authStore = useAuthStore()
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
  if (idle.value) return 'bg-red-50 text-red-700';
  if (timeUntilIdle.value <= 10) return 'bg-orange-50 text-orange-700';
  return 'bg-gray-50 text-gray-700';
});

watchEffect(() => {
  showWarning.value = timeUntilIdle.value <= WARNING_THRESHOLD && !idle.value;
});

watchEffect(()=>{
    if(idle.value){
        authStore.logOut()
    }
})
const resetIdle = () => {
  lastActive.value = Date.now();
  showWarning.value = false;
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="showWarning || idle"
      :class="[
        'mb-2 flex justify-between items-center px-4 py-3 rounded-lg shadow-sm',
        'transition-all duration-300 ease-in-out',
        warningClass
      ]"
    >
      <span class="font-medium flex items-center gap-2">
        <i class="fas fa-clock" />
        {{ warningMessage }}
      </span>
      <button 
        type="button" 
        class="px-3 py-1 rounded-md bg-white shadow-sm hover:shadow-md
               transition-all duration-200 font-medium"
        :class="idle ? 'text-red-500' : 'text-primary-500'"
        @click="resetIdle"
      >
        Yes, I'm here
      </button>
    </div>
  </Transition>

  <!-- <div class="space-y-2 text-sm">
    <div class="flex items-center gap-2">
      <span class="font-medium">Status:</span>
      <span 
        :class="idle ? 'text-red-500' : 'text-green-500'"
        class="font-medium"
      >
        {{ idle ? 'Idle' : 'Active' }}
      </span>
    </div>
    
    <div class="flex items-center gap-2">
      <span class="font-medium">Inactive for:</span>
      <span class="text-primary-500 font-medium">{{ idledFor }}s</span>
    </div>

    <div class="flex items-center gap-2">
      <span class="font-medium">Time until idle:</span>
      <span 
        :class="timeUntilIdle <= WARNING_THRESHOLD ? 'text-orange-500' : 'text-primary-500'"
        class="font-medium"
      >
        {{ timeUntilIdle }}s
      </span>
    </div>
  </div> -->
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