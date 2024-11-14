<template>
  <div>
    <div class="flex flex-col">
      <div v-for="(step, index) of steps">
        <div class="flex gap-x-2 items-center">
          <button
            class="rounded-full h-[30px] w-[30px] text-white flex items-center justify-center"
            :class="
              [
                `${currentStepIndex === index && 'bg-gray-400'}`,
                `${currentStepIndex > index && 'bg-green-400'}`,
                `${currentStepIndex < index && 'bg-gray-200'}`,
              ].join(' ')
            "
          >
            <AppIcon icon="heroicons:check" />
          </button>
          <span
            :class="`${
              currentStepIndex < index ? 'text-gray-200' : 'text-[#ED3237]'
            }`"
            >{{ step.label }}</span
          >
        </div>
        <div
          v-if="index !== steps.length - 1"
          class="w-[30px] flex justify-center opacity-0"
        >
          <span>|</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  steps: {
    type: Array,
    default: [
      { value: "one", label: "one" },
      { value: "two", label: "two" },
    ],
  },
  currentStep: {
    type: String,
    default: "one",
  },
});

const active = inject("active");

let currentStepIndex = ref(0);

onMounted(() => {
  const index = [...props.steps].findIndex(
    (step) => step.value === props.currentStep
  );
  if (index === -1) {
    currentStepIndex.value = props.steps.length;
    return;
  }
  currentStepIndex.value = index;
});

watch(
  () => props.currentStep,
  () => {
    const index = [...props.steps].findIndex(
      (step) => step.value === props.currentStep
    );
    if (index === -1) {
      currentStepIndex.value = props.steps.length;
      return;
    }
    currentStepIndex.value = index;
  }
);
</script>
