<template>
    <div
        class="p-6 bg-white rounded-lg shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12)_0px_0px_2px_0px_rgba(145,158,171,0.2)]">
        <div class="mb-6">
            <img src="/images/loanimg.svg" class="w-10 h-10" alt="loan" />
        </div>

        <h5 class="block font-medium text-[#212B36] text-base mb-2">{{ title }}</h5>
        <p class="text-sm text-[#637381] mb-6">
            {{ body }}
        </p>

        <button @click="navigateTo(url)"
            class="text-[#163300] text-[13px] font-semibold flex gap-x-4 items-center">Learn more
            <AppIcon icon="flowbite:angle-right-outline" />
        </button>
    </div>
</template>
<script setup>
defineProps(["url", "title", "body"])
</script>