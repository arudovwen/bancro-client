<template>
    <AuthEmailVerification />
  </template>
  <script setup>
  definePageMeta({
    layout: "subauth",
    middleware: "auth",
  });
  </script>
  