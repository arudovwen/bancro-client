<template>
  <div>
    <label
      class="border border-[#919EAB33] rounded-lg bg-[#919EAB14] px-4 py-4 text-center flex flex-col justify-center items-center gap-y-2">
      <input type="file" id="uploadId" class="hidden" @change="handleFile" />
      <SvgUpload v-if="!file && !fileUrl" />
      <span v-if="!file && !fileUrl" class="text-sm text-[#667085]"><span class="text-[#919EAB] text-[10px] block">{{
        title
      }}</span> <span class="text-xs text-[#919EAB]">{{ text }}</span></span>
      <div v-if="file || fileUrl" class="flex justify-between items-center w-full">
        <div class="flex gap-x-2 items-center flex-1"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M26.6668 9.33317V9.0665C26.6668 6.82629 26.6668 5.70619 26.2309 4.85054C25.8474 4.09789 25.2354 3.48597 24.4828 3.10248C23.6271 2.6665 22.507 2.6665 20.2668 2.6665H11.7335C9.49329 2.6665 8.37318 2.6665 7.51753 3.10248C6.76489 3.48597 6.15296 4.09789 5.76947 4.85054C5.3335 5.70619 5.3335 6.82629 5.3335 9.0665V22.9332C5.3335 25.1734 5.3335 26.2935 5.76947 27.1491C6.15296 27.9018 6.76489 28.5137 7.51753 28.8972C8.37318 29.3332 9.49329 29.3332 11.7335 29.3332H16.6668M16.6668 14.6665H10.6668M15.3335 19.9998H10.6668M21.3335 9.33317H10.6668M24.0002 23.9998V16.6665C24.0002 15.5619 24.8956 14.6665 26.0002 14.6665C27.1047 14.6665 28.0002 15.5619 28.0002 16.6665V23.9998C28.0002 26.209 26.2093 27.9998 24.0002 27.9998C21.791 27.9998 20.0002 26.209 20.0002 23.9998V18.6665"
              stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <span class="block text-left">
            <span class="block font-semibold text-[#212B36]">{{ uploadTitle }}</span>
            <span class="block">2mb</span>
          </span>
        </div>

        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M2 12C2 6.47715 6.47715 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.73 15.61L16.3 9.61V9.58C16.5179 9.29419 16.5668 8.91382 16.4283 8.58218C16.2897 8.25054 15.9848 8.01801 15.6283 7.97218C15.2718 7.92635 14.9179 8.07419 14.7 8.36L10.92 13.36L9.29 11.28C9.07028 10.9978 8.71668 10.8542 8.36239 10.9033C8.00811 10.9525 7.70696 11.1869 7.57239 11.5183C7.43783 11.8497 7.49028 12.2278 7.71 12.51L10.15 15.62C10.3408 15.8615 10.6322 16.0017 10.94 16C11.2495 15.9993 11.5412 15.8552 11.73 15.61Z"
              fill="#079455" />
          </svg>

        </span>
      </div>
    </label>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { toast } from "vue3-toastify";

defineProps({
  title: {
    default: "Click to upload",
  },
  text: {
    default: ""
  },
  uploadTitle: {
    default: ""
  },
  fileUrl: {
    default: ""
  }
});

const file = ref(null);
function handleFile(e) {

  const file = e.target.files[0];

  if (!file) return;

  const allowedExtensions = ["jpeg", "png", "jpg", "pdf"]; // Add more allowed extensions if needed
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    // Show an error message or handle accordingly
    toast.error("Invalid file type. Please upload a document.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result.split(",")[1];
    loading.value = true;
    const data = { base64: base64String, ext: `.${fileExtension}` };
    // Assuming canvas and uploaddocument are available
    console.log("🚀 ~ handleEvent ~ data:", base64String);
    // uploaddocument(data)
    //   .then((res) => {
    //     loading.value = false;
    //     handleChange(props.id, res.data.message);
    //   })
    //   .catch((error) => {
    //     console.error("Error uploading file:", error);
    //     loading.value = false;
    //   });
  };

  reader.onerror = function (error) {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);

}
</script>
