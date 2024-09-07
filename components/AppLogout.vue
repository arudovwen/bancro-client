<template>
  <ModalCenter v-if="isLogOut" :canClose="false">
    <template #default>
      <div class="bg-white p-6 rounded-lg min-w-[350px]" v-if="isLogOut">
        <div class="flex justify-between mb-5 items-center">
          <h4 class="font-medium text-matta-black text-xl">Confirm Logout</h4>
          <i
            class="uil uil-times cursor-pointer text-lg"
            @click="isLogOut = false"
          ></i>
        </div>

        <p class="text-sm text-matta-black mb-2">
          Are you sure you want to sign out?
        </p>

        <div class="flex justify-between gap-x-2 items-center mt-8">
          <button
            type="button"
            @click="logOut"
            class="appearance-none border leading-none px-8 py-3 rounded-lg w-full text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            Yes
          </button>

          <button
            type="button"
            @click="isLogOut = false"
            class="appearance-none border border-[#9FE870] leading-none w-full px-8 py-3 rounded-lg bg-[#9FE870] text-primary-500 hover:opacity-70 text-[13px] uppercase"
          >
            No
          </button>
        </div>
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import { logOut } from "~/services/authservices";
const isLogOut = inject("isLogOut");

provide("isOpen", isLogOut);
</script>
