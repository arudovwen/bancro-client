<template>
  <div
    class="flex gap-x-4 mb-8 w-full overflow-x-auto border-b border-[#D0D5DD]"
    :class="className"
  >
    <button
      v-for="tab in tabs"
      :key="tab.title"
      @click="active = tab.key"
      :class="`${buttonClass} capitalize text-xs md:text-sm font-semibold pb-3 border-b-2 px-1 flex items-center gap-x-1 ${
        active === tab.key
          ? 'border-danger-500 text-danger-500'
          : 'border-transparent text-[#667085]'
      } `"
    >
      <span>{{ tab.title }}</span>
      <span
        class="text-xs h-6 min-w-[24px] rounded-full flex justify-center items-center border border-[#EAECF0] bg-[#F9FAFB] text-[#454745]"
        v-if="count && count[tab.key]"
        >{{ count[tab.key] }}</span
      >
    </button>
  </div>
</template>
<script setup>
defineProps(["tabs", "className", "count","buttonClass"]);
const active = inject("active");
</script>
