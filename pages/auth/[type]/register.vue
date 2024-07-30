<template>
 <AuthRegister />
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: "auth"
});
</script>
