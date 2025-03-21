<template>
  <div>
    <label class="block text-sm mb-[10px] text-[#454745]">{{ label }}</label>
    <div
      class="flex-1 rounded-lg py-1 pr-[14px] pl-2 h-11 text-sm w-full border border-[##EAECF0] placeholder:text-[#B6B7B9] bg-[#F9FAFB] focus:outline-matta-black/20 flex items-center"
    >
      <input
        ref="fileInputRef"
        type="file"
        class="hidden"
        @change="handleEvent"
        accept="pdf, doc,docx"
      />

      <button
        type="button"
        @click="triggerFileInput"
        class="text-xs text-white border border-[#98A2B3] bg-[#98A2B3] rounded px-5 py-[6px] active:scale-[.95] leading-normal flex justify-center"
      >
        <div
          v-if="loading"
          class="loader border-t-2 border-white border-solid rounded-full h-3 w-3 animate-spin whitespace-nowrap"
        ></div>
        <span v-else>{{ btnText || "Select file" }}</span>
      </button>

      <span class="flex-1 px-4 truncate text-[#999999] inline-block">{{
        title
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { uploaddocument } from "~/services/onboardingservices";
import { defineProps, ref, inject } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps(["label", "id", "btnText", "modelValue"]);

const handleChange = inject("handleChange");
const fileInputRef = ref(null);
const title = ref("");
const loading = ref(false);
function handleEvent(e) {
  const file = e.target.files[0];

  if (!file) return;

  const allowedExtensions = ["jpeg", "png", "jpg", "pdf"]; // Add more allowed extensions if needed
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    // Show an error message or handle accordingly
    toast.error("Invalid file type. Please upload a document.");
    return;
  }
  title.value = file.name;
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result.split(",")[1];
    loading.value = true;
    const data = { base64: base64String, ext: `.${fileExtension}` };
    // Assuming canvas and uploaddocument are available
    console.log("🚀 ~ handleEvent ~ data:", data);
    uploaddocument(data)
      .then((res) => {
        loading.value = false;
        handleChange(props.id, res.data.message);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        loading.value = false;
      });
  };

  reader.onerror = function (error) {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
}
function triggerFileInput() {
  fileInputRef.value.click();
}
onMounted(() => {
  title.value = props.modelValue;
});
watch(
  () => [props.modelValue],
  () => {
    title.value = props.modelValue;
  }
);
</script>
