<template>
  <ModalCenter v-if="isSigniningOut" :canClose="false">
    <template #default>
      <div
        class="bg-white p-6 lg:p-10 sm:p-6 sm:pb-4 rounded-lg min-w-[300px]"
        v-if="isSigniningOut"
      >
        <div class="flex justify-between mb-5 items-center">
          <h4 class="font-medium text-matta-black text-xl">Sign Out</h4>
          <i
            class="uil uil-times cursor-pointer text-lg"
            @click="isSigniningOut = false"
          ></i>
        </div>

        <p class="text-sm text-matta-black mb-2">
          Are you sure you want to sign out?
        </p>

        <div class="flex justify-between gap-x-2 items-center mt-8">
          <button
            type="button"
            @click="isSigniningOut = false"
            class="appearance-none border w-1/2 leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            Cancel
          </button>

          <button
            type="button"
            @click="logOut"
            class="appearance-none border w-1/2 border-primary-500 leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
          >
            Yes
          </button>
        </div>
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import { logOut } from "~/services/authservices";
const isSigniningOut = inject("isSigniningOut");

provide("isOpen", isSigniningOut)
</script>
