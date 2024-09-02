<template>
  <section class="w-[420px]">
    <h2 class="text-xl font-semibold mb-6 block text-[#344054]">Data Plans</h2>
    <div class="mb-7">
      <Textinput iconClass="left-[14px]" classInput="!pl-10"  placeholder="Search plans" label="" name="" type="search" icon="lucide:search" />
    </div>
    <div class="grid grid-cols-1 gap-y-[10px] max-h-[300px] overflow-y-auto">
      <button
        type="button"
        @click="emits('handleClick', n)"
        v-for="n in plans"
        :key="n.label"
        class="border-b border-[#21231D1A] last:border-none p-4 rounded-lg flex justify-between"
      >
        <span class="flex items-center gap-x-4">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="36"
              height="36"
              rx="6"
              fill="#A0E1E1"
              fill-opacity="0.3"
            />
            <path
              opacity="0.4"
              d="M22.24 8H13.76C11 8 10 9 10 11.81V24.19C10 27 11 28 13.76 28H22.23C25 28 26 27 26 24.19V11.81C26 9 25 8 22.24 8Z"
              fill="#292D32"
            />
            <path
              d="M20 12.25H16C15.59 12.25 15.25 11.91 15.25 11.5C15.25 11.09 15.59 10.75 16 10.75H20C20.41 10.75 20.75 11.09 20.75 11.5C20.75 11.91 20.41 12.25 20 12.25Z"
              fill="#292D32"
            />
            <path
              d="M18 25.2998C18.9665 25.2998 19.75 24.5163 19.75 23.5498C19.75 22.5833 18.9665 21.7998 18 21.7998C17.0335 21.7998 16.25 22.5833 16.25 23.5498C16.25 24.5163 17.0335 25.2998 18 25.2998Z"
              fill="#292D32"
            />
          </svg>

          <span class="block">
            <span
              class="text-sm text-[#344054] font-medium block leading-normal"
              >{{ n.label }}</span
            >
          </span>
        </span>
      
      </button>
    </div>
  </section>
</template>
<script setup>
const emits = defineEmits(["handleClick"]);
const plans = [
  {
    label: "100mb daily @100",
    value: "",
  },
  {
    label: "500mb daily @500",
    value: "",
  },

];
</script>
