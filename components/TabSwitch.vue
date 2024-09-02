<template>
  <div class="flex border border-[#E4E7EC] rounded-[10px] p-1 bg-[#F9FAFB]">
    <button
      type="button"
      @click="activeTab = tab.value"
      :class="`flex-1 font-semibold text-sm px-3 py-2 rounded-[6px] capitalize ${
        activeTab === tab.value
          ? 'text-[#163300] bg-[#9FE870]'
          : 'text-[#667085]'
      }`"
      v-for="tab in tabs"
      :key="tab.label"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
<script setup>
defineProps(["tabs"]);
const activeTab = inject("activeTab");
</script>
