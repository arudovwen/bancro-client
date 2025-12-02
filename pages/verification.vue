<template>
  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-50">
    <div class="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div class="w-10 h-10 mx-auto border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
        <p class="text-sm text-gray-600">Verifying your account...</p>
      </div>

      <!-- Success State -->
      <div v-else-if="status === 'success'" class="space-y-4">
        <div class="text-green-600">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5 13l4 4L19 7"/>
         </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800">Verification Successful</h2>
        <p class="text-sm text-gray-600">Redirecting you to the dashboard...</p>
      </div>

      <!-- Error State -->
      <div v-else class="space-y-4">
        <div class="text-red-600">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"/>
         </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800">Verification Failed</h2>
        <p class="text-sm text-gray-600">The link may be invalid or expired.</p>

        <router-link
          to="/login"
          class="inline-block px-4 py-2 mt-3 text-sm text-white rounded-lg bg-primary-500"
        >
          Back to dashboard
        </router-link>
      </div>

    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const status = ref(""); // 'success' or 'error'

onMounted(async () => {
  const token = route.query.token || route.query.code;

  if (!token) {
    status.value = "error";
    loading.value = false;
    return;
  }

  try {
    // ⬇️ Replace with your backend verification API
    await axios.post("/api/auth/verify-callback", { token });

    status.value = "success";
    loading.value = false;

    setTimeout(() => router.push("/dashboard"), 1500);
  } catch (err) {
    status.value = "error";
    loading.value = false;
  }
});
</script>
