<template>
  <div>
    <label
      class="flex items-center"
      :class="disabled ? ' cursor-not-allowed opacity-50' : 'cursor-pointer'"
    >
      <input
        type="checkbox"
        class="hidden"
        :disabled="disabled"
        :name="name"
        @change="onChange"
        :value="value"
        v-model="localValue"
        v-bind="$attrs"
      />

      <span
        class="h-4 w-4 border flex-none border-slate-200 darks:border-slate-800 rounded inline-flex mr-3 relative transition-all duration-150"
        :class="
          localValue.includes(value)
            ? activeClass + ' border-none '
            : 'bg-white border border-[rgba(223,223,223,1)] darks:bg-slate-600 darks:border-slate-600'
        "
      >
        <img
          src="~/assets/images/icon/ck-white.svg"
          alt="image"
          class="h-[10px] w-[10px] block m-auto"
          v-if="localValue.includes(value)"
        />
      </span>
      <span
        :class="`text-[#333] darks:text-slate-400 text-sm leading-6 ${labelClass}`"
        v-if="label"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>
<script>
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "Checkbox",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "checkbox",
    },
    activeClass: {
      type: String,

      default: "ring-primary-400  bg-primary-500",
    },
    labelClass: {
      type: String,
    },
    value: {
      type: null,
    },
    modelValue: {
      type: null,
    },
  },
  emits: {
    "update:modelValue": (newValue) => ({
      modelValue: newValue,
    }),
    // use newValue
    // "update:checked": (newValue) => true,
  },

  setup(props, context) {
    const ck = ref(props.checked);

    // on change event
    const onChange = () => {
      ck.value = !ck.value;
    };

    const localValue = computed({
      get: () => props.modelValue,
      set: (newValue) => context.emit("update:modelValue", newValue),
    });
    // watch(localValue, () => {
    //   if (typeof localValue.value === "object" && !localValue.value.length) {
    //     ck.value = false;
    //   }
    // });
    return { localValue, ck, onChange };
  },
});
</script>
<style lang=""></style>
