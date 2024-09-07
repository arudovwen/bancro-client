<template>
<SavingsCard />
</template>
<script setup>

defineProps(["detail", "canRepay"])
const isLoading = ref(false)
const emits = defineEmits(["repayClick"])
function getPercentage(part, total) {
  return (part / total) * 100;
}
</script>
