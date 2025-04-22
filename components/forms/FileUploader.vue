<template>
  <div>
    <label
      class="border border-[#919EAB33] rounded-lg bg-[#919EAB14] px-4 py-4 text-center flex flex-col justify-center items-center gap-y-2"
    >
      <input type="file" id="uploadId" class="hidden" @change="handleFile" />
      <SvgUpload v-if="!file && !fileUrl" />
      <span v-if="!file && !fileUrl" class="text-sm text-[#667085]"
        ><span class="text-[#919EAB] text-[10px] block">{{ title }}</span>
        <span class="text-xs text-[#919EAB]">{{ text }}</span></span
      >
      <div
        v-if="file || fileUrl"
        class="flex justify-between items-center w-full"
      >
        <div class="flex gap-x-2 items-center flex-1">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6668 9.33317V9.0665C26.6668 6.82629 26.6668 5.70619 26.2309 4.85054C25.8474 4.09789 25.2354 3.48597 24.4828 3.10248C23.6271 2.6665 22.507 2.6665 20.2668 2.6665H11.7335C9.49329 2.6665 8.37318 2.6665 7.51753 3.10248C6.76489 3.48597 6.15296 4.09789 5.76947 4.85054C5.3335 5.70619 5.3335 6.82629 5.3335 9.0665V22.9332C5.3335 25.1734 5.3335 26.2935 5.76947 27.1491C6.15296 27.9018 6.76489 28.5137 7.51753 28.8972C8.37318 29.3332 9.49329 29.3332 11.7335 29.3332H16.6668M16.6668 14.6665H10.6668M15.3335 19.9998H10.6668M21.3335 9.33317H10.6668M24.0002 23.9998V16.6665C24.0002 15.5619 24.8956 14.6665 26.0002 14.6665C27.1047 14.6665 28.0002 15.5619 28.0002 16.6665V23.9998C28.0002 26.209 26.2093 27.9998 24.0002 27.9998C21.791 27.9998 20.0002 26.209 20.0002 23.9998V18.6665"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span class="block text-left">
            <span class="block font-semibold text-[#212B36]">{{
            name ||  uploadTitle
            }}</span>
            <span class="block">{{ size }}</span>
          </span>
        </div>

        <button type="button" class="text-2xl" @click="removeFile">
          <AppIcon icon="lets-icons:trash-duotone" />
        </button>
      </div>
    </label>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { toast } from "vue3-toastify";
import FileIcon from "./FileIcon.vue";

const props = defineProps({
  title: { default: "Click to upload" },
  text: { default: "" },
  uploadTitle: { default: "" },
  fileUrl: { default: "" },
  modelValue: { default: "" },
});

const emits = defineEmits(["update:modelValue"]);

const loading = ref(false);
const file = ref(null);
const size = ref(null);
const name = ref("");
function handleFile(e) {
  const fileInput = e.target.files[0];
  if (!fileInput) return;
  file.value = fileInput;
  name.value = fileInput.name;
  size.value = `${parseInt(fileInput.size / 1000)}kb`;
  const fileExtension = getFileExtension(fileInput);
  if (!isValidFileType(fileExtension)) {
    toast.error("Invalid file type. Please upload a document.");
    return;
  }

  processFile(fileInput, fileExtension);
}

function getFileExtension(file) {
  return file.name.split(".").pop().toLowerCase();
}

function isValidFileType(extension) {
  const allowedExtensions = ["jpeg", "png", "jpg", "pdf"];
  return allowedExtensions.includes(extension);
}

function processFile(file, extension) {
  const reader = new FileReader();

  reader.onload = (event) => {
    const base64String = event.target.result;
    loading.value = true;

    const data = { base64: base64String, ext: `.${extension}` };
    emits("update:modelValue", base64String);
  };

  reader.onerror = (error) => {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
}

function removeFile() {
  file.value = null;
  emits("update:modelValue", "");
}
</script>
