<template>
  <div>
    <label
      class="border bprder-[#919EAB33] rounded-lg bg-[#919EAB14] px-4 py-4 text-center flex flex-col justify-center items-center gap-y-2"
    >
    <input type="file" id="uploadId" class="hidden" @change="handleFile" />
      <SvgUpload />
      <span class="text-sm text-[#667085]"
        ><span class="text-[#667085] text-sm block">{{ title }}</span>    <span class="text-xs text-[#919EAB]">{{ text }}</span></span
      >
  
    </label>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    default: "Click to upload",
  },
  text:{
    default:""
  }
});
const file = ref(null);
function handleFile(e) {
  file.value = e.target.files[0];
}
</script>
