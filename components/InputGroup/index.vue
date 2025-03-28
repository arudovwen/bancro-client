<template>
  <div
    :class="`${horizontal ? 'flex' : ''}  ${
      merged ? 'merged' : 'w-full md:w-auto'
    }`"
  >
    <label
      v-if="label"
      :class="`${classLabel} ${
        horizontal ? 'flex-0 mr-6 md:w-[100px] w-[60px] break-words' : ''
      }  inline-block input-label `"
      :for="name"
    >
      {{ label }}</label
    >
    <div
      class="flex items-stretch inputGroup"
      :class="`
    
    ${append || appendIcon ? 'has-append' : ''}
    ${prepend || prependIcon ? 'has-prepend' : ''}

    ${error ? 'is-invalid' : ''}  ${validate ? 'is-valid' : ''}
    
    ${$slots.prepend ? 'has-prepend-slot' : ''}
    ${$slots.append ? 'has-append-slot' : ''}
    ${horizontal ? 'flex-1' : ''}
    `"
    >
      <span
        class="flex-none input-group-addon"
        v-if="prepend || prependIcon || $slots.prepend"
      >
        <span
          class="input-group-text inline-block h-full"
          v-if="prepend || prependIcon"
        >
          {{ prepend }} <AppIcon :icon="prependIcon" v-if="prependIcon" />
        </span>
        <span class="inline-block h-full prepend-slot" v-if="$slots.prepend">
          <slot name="prepend"></slot>
        </span>
      </span>
      <div class="flex-1">
        <div
          class="relative formGroup2"
          :class="`${error ? 'has-error' : ''}  ${validate ? 'is-valid' : ''}`"
        >
          <input
            :type="types"
            :name="name"
            :placeholder="placeholder"
            :class="`${classInput} input-group-control block w-full focus:outline-none h-[40px] `"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :error="error"
            :id="name"
            :readonly="isReadonly"
            :disabled="disabled"
            :validate="validate"
            v-if="!isMask"
          />
          <cleave
            :class="`${classInput} cleave input-group-control block w-full focus:outline-none h-[40px] `"
            :name="name"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :error="error"
            :id="name"
            :readonly="isReadonly"
            :disabled="disabled"
            :validate="validate"
            :options="options"
            v-if="isMask"
            modelValue="modelValue"
          />
          <div
            class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2"
            v-if="error || validate"
          >
            <span v-if="error" class="text-danger-500">
              <AppIcon icon="heroicons-outline:information-circle" />
            </span>

            <span v-if="validate" class="text-success-500">
              <AppIcon icon="bi:check-lg" />
            </span>
          </div>
        </div>
      </div>
      <span
        class="flex-none input-group-addon right"
        v-if="append || appendIcon || $slots.append"
      >
        <span
          class="input-group-text inline-block h-full"
          v-if="append || appendIcon"
          >{{ append }} <AppIcon :icon="appendIcon" v-if="appendIcon"
        /></span>

        <span class="inline-block h-full append-slot" v-if="$slots.append">
          <slot name="append"></slot>
        </span>
      </span>
    </div>
    <span
      v-if="error"
      class="mt-2"
      :class="
        msgTooltip
          ? ' inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded'
          : ' text-danger-500 block text-sm'
      "
      >{{ error }}</span
    >
    <span
      v-if="validate"
      class="mt-2"
      :class="
        msgTooltip
          ? ' inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded'
          : ' text-success-500 block text-sm'
      "
      >{{ validate }}</span
    >
    <span
      class="block text-slate-400 font-light leading-4 text-xs mt-2"
      v-if="description"
      >{{ description }}</span
    >
  </div>
</template>
<script>
import Cleave from "vue-cleave-component";
export default {
  components: { Cleave },
  props: {
    prepend: {
      type: String,
    },
    append: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "Search",
    },
    label: {
      type: String,
    },
    classLabel: {
      type: String,
      default: " ",
    },
    classInput: {
      type: String,
      default: "classinput",
    },
    type: {
      type: String,
      default: "text",
      //required: true,
    },
    name: {
      type: String,
    },
    modelValue: {
      type: String,
      default: "",
    },
    error: {
      type: String,
    },
    hasicon: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: String,
    },
    msgTooltip: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    prependIcon: {
      type: String,
    },
    appendIcon: {
      type: String,
    },
    merged: {
      type: Boolean,
      default: false,
    },
    isMask: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => ({
        creditCard: true,
        delimiter: "-",
      }),
    },
  },
  data() {
    return {
      types: this.type,
    };
  },
  methods: {
    toggleType() {
      // toggle the type of the input field
      this.types = this.types === "text" ? "password" : "text";
    },
  },
};
</script>
<style lang="scss">
.input-group-control {
  @apply bg-white darks:bg-slate-900 darks:placeholder:text-slate-400 transition duration-300 ease-in-out border border-slate-200 darks:border-slate-700 focus:ring-0  focus:outline-none  
  rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600  darks:focus:border-slate-900 darks:text-white;
}
.input-label {
  @apply mb-2 text-slate-500 text-sm leading-6 capitalize cursor-pointer;
}
.formGroup2 {
  &.has-error {
    .input-group-control {
      @apply border-danger-500 focus:ring-danger-500  focus:ring-opacity-90 focus:ring-1;
    }
  }
  &.is-valid {
    .input-group-control {
      @apply border-success-500 focus:ring-success-500 focus:ring-opacity-90 focus:ring-1;
    }
  }
}

.input-group-control[readonly] {
  @apply bg-slate-200 text-slate-400 darks:bg-slate-600;
}

.input-group-control[disabled] {
  @apply cursor-not-allowed bg-slate-50 text-slate-400 placeholder:text-opacity-60 darks:bg-slate-600;
}

.input-group-text {
  @apply bg-white darks:bg-slate-900 transition duration-300 ease-in-out  flex items-center justify-center px-3 border
   border-slate-200 darks:border-slate-700 rounded-tl rounded-bl text-slate-400 text-base font-light;
}
.inputGroup.has-prepend {
  .input-group-control {
    @apply border-l-0 rounded-tl-[0] rounded-bl-[0];
  }
}
.inputGroup {
  &.has-prepend-slot {
    .input-group-control {
      @apply border-l-0 rounded-tl-[0] rounded-bl-[0] focus:ring-0 focus:border-slate-600 darks:focus:border-slate-700;
    }
  }
  &.has-append-slot {
    .input-group-control {
      @apply border-r-0 rounded-tr-[0] rounded-br-[0] focus:ring-0 focus:border-slate-600 darks:focus:border-slate-700;
    }
  }
}
.inputGroup.has-append {
  .input-group-control {
    @apply border-r-0 rounded-tr-[0] rounded-br-[0];
  }
  .input-group-addon.right {
    .input-group-text {
      @apply rounded-tl-[0] rounded-bl-[0] rounded-tr rounded-br;
    }
  }
}

.inputGroup:focus-within .input-group-text {
  @apply border-black-500 darks:border-slate-900;
}
.merged .inputGroup:focus-within .input-group-text {
}
.inputGroup {
  &.is-invalid {
    .input-group-text {
      @apply border-danger-500;
    }
    &:focus-within .input-group-text {
      @apply ring-danger-500;
    }
  }
  &.is-valid {
    .input-group-text {
      @apply border-success-500;
    }
    &:focus-within .input-group-text {
      @apply ring-success-500;
    }
  }
}
.prepend-slot,
.append-slot {
  .btn {
    @apply pt-0 pb-0 h-full items-center hover:ring-0 rounded-tr-[0] rounded-br-[0];
  }
  > div,
  button {
    @apply h-full;
  }
}
.input-group-addon {
  &.right {
    .append-slot {
      .btn {
        @apply rounded-tl-[0] rounded-bl-[0] rounded-tr rounded-br;
      }
    }
  }
}
.merged {
  .input-group-addon {
    .input-group-text {
      @apply border-r-0 pr-0;
    }
    &.right {
      .input-group-text {
        @apply border-l-0 border-r pr-3 pl-0;
      }
    }
  }
}
</style>
