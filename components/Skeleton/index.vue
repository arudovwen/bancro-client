<!-- SkeletonLoader.vue -->
<template>
  <div :class="containerClasses">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['animate-pulse', 'bg-gray-200', 'rounded', itemClasses]"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Define props with default values
const props = defineProps({
  // Number of skeleton items to render
  count: {
    type: Number,
    default: 1,
  },
  // Type of skeleton loader
  type: {
    type: String,
    default: "text",
    validator: (value) => ["text", "avatar", "card", "image"].includes(value),
  },
  // Custom classes for additional styling
  containerClass: {
    type: String,
    default: "",
  },
});

// Compute the number of items based on type
const items = Array.from({ length: props.count }, (_, i) => i);

// Compute container classes based on type
const containerClasses = ["flex", "space-x-4", props.containerClass];

// Compute item classes based on type
const itemClasses = computed(() => {
  switch (props.type) {
    case "text":
      return "h-3 w-full";
    case "avatar":
      return "h-12 w-12 rounded-full";
    case "card":
      return "h-48 w-full";
    case "image":
      return "h-64 w-full";
    default:
      return "h-4 w-full";
  }
});
</script>
