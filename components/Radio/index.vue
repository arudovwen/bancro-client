<template>
  <div>
    <label
      class="flex items-center"
      :class="disabled ? ' cursor-not-allowed opacity-50' : 'cursor-pointer'"
    >
      <input
        type="radio"
        class="hidden"
        :disabled="disabled"
        :name="name"
        @change="onChange"
        :value="value"
        v-model="localValue"
        v-bind="$attrs"
      />

      <span
        :class="
          localValue === value
            ? activeClass +
              ' ring-[6px]  ring-inset ring-offset-2 darks:ring-offset-slate-600  darks:ring-offset-4 border-slate-700'
            : 'border-slate-400 darks:border-slate-600 darks:ring-slate-700'
        "
        class="h-[18px] w-[18px] rounded-full border inline-flex bg-white darks:bg-slate-500 mr-3 relative transition-all duration-150"
      >
      </span>
      <span
        class="text-slate-500 darks:text-slate-400 text-sm leading-6"
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
  name: "Radio",
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

    return { localValue, ck, onChange };
  },
});
</script>
<style lang=""></style>
