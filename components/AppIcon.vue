<template>
  <span>
    <Icon v-if="icon" :icon="icon" :class="iconClass" />
  </span>
</template>
<script>
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      default: "",
    },
    iconClass: {
      type: String,
      default: "",
    },
  },
};
</script>
