<template>
    <h2 class="text-xl font-medium text-[#182230] mb-3">Other Information</h2>

    <div class="border-b mt-2 mb-7 border-[#D0D5DD]" />
    <form @submit.prevent="handleSubmit" class="bg-white rounded-xl">
        <div>
            <div class="grid grid-cols-1 gap-y-4">
                <div class="text-sm grid grid-cols-2 gap-4 border border-[#ED323717] rounded-lg p-6 bg-[#ED32370D]">
                    <span class="block" v-for="n in formObject1" :key="n.label">
                        <span class="block text-[#667085] mb-[2px]">{{ n.label }}</span>
                        <span class="block font-medium">-</span>
                    </span>
                    <div class="col-span-2 border-b border-[#3440541A]" />
                    <span class="block" v-for="n in formObject2" :key="n.label">
                        <span class="block text-[#667085] mb-[2px]">{{ n.label }}</span>
                        <span class="block font-medium">-</span>
                    </span>
                    <div class="col-span-2 border-b border-[#3440541A]" />
                    <span class="block" v-for="n in formObject3" :key="n.label">
                        <span class="block text-[#667085] mb-[2px]">{{ n.label }}</span>
                        <span class="block font-medium">-</span>
                    </span>
                </div>

                <div class="mb-3 mt-4 flex justify-end gap-x-4">
                    <AppButton type="button" :isLoading="isLoading" text="Back"
                        btnClass="text-primary bg-white border !py-[10px] px-20 min-w-[156px] !rounded-lg font-semibold"
                        :isDisabled="isLoading" />
                    <AppButton type="submit" :isLoading="isLoading" text="submit"
                        btnClass="text-white bg-danger-500  !py-[10px] !px-10 !rounded-lg min-w-[156px] font-semibold"
                        :isDisabled="isLoading" />
                </div>
            </div>
        </div>
    </form>
    <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
        <template #default>
            <div class="p-6 rounded-xl">
                <TransactionsStatus title="Application Sent"
                    text="Your loan application has been submitted for processing." :canClose="false" />
            </div>
        </template>
    </ModalCenter>
</template>
<script setup>
const isOpen = ref(false);
const isLoading = ref(false);
const formObject1 = [
    {
        label: "Loan type",
        key: "",
    },
    {
        label: "Amount",
        key: "",
    },

];
const formObject2 = [

    {
        label: "Interest rate",
        key: "",
    },
    {
        label: "Tenor",
        key: "",
    },

];
const formObject3 = [

    {
        label: "Loan purpose",
        key: "",
    },
    {
        label: "Identification",
        key: "",
    },
];

function handleSubmit() {
    isOpen.value = true
}
provide("isOpen", isOpen);
</script>
