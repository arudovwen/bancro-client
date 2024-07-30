<template>
  <button
    :disabled="isDisabled"
    :class="
      [
        size === 'large' ? '!px-[20px] !py-[16px]' : '',
        size === 'default' ? '!px-[15px] !py-[11px]' : '',
        size === 'small' ? '!px-[12px] !py-[8px]' : '',
        isLoading ? 'pointer-events-none' : '',
        isDisabled ? 'opacity-40 cursor-not-allowed' : '',
        classes.root,
      ].join(' ')
    "
    class="rounded-md text-[14px] inline-flex justify-center"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  components: {},
  name: "Button",
  props: {
    text: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: Object,
      default: () => ({
        root: {
          type: String,
          default: "",
        },
      }),
    },
    size: {
      type: String,
      default: "default",
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
<style lang="scss"></style>
