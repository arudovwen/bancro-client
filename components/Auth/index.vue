<template>
  <ModalCenter :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #default>
      <AuthLogin v-if="showing === 'login'" />
      <AuthRegister v-if="showing === 'register'" />
      <AuthForgotPassword v-if="showing === 'forgot'" />
      <AuthResetPassword v-if="showing === 'reset'" />
    </template>
  </ModalCenter>
</template>
<script setup>
const showing = ref("login");
const isOpen = inject("isOpen");

provide("showing", showing);
</script>
