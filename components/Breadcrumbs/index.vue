<template>
  <div class="flex items-center justify-between">
    <ul class="flex gap-x-2">
      <li
        v-for="(link, idx) in links"
        :key="idx"
        :class="` ${className} ${
          link.title && `after:content-['>'] after:text-sm after:text-[#919EAB]`
        }  font-normal text-[10px] sm:text-xs lg:text-sm capitalize  last:after:content-[''] flex gap-x-2 items-center`"
      >
        <NuxtLink :to="link.url" class="">
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
defineProps({
  className: {
    type: String,
    default: "text-matta-black last:text-[#919EAB]",
  },
  links: {
    type: Array,
    default: [
      {
        title: "home",
        url: "/",
      },
    ],
  },
});
</script>
