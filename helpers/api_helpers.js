import Axios from "axios";
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";

const API_URL = "https://bancroapi.streams.com.ng";

const axiosApi = Axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

// Set up request interceptor
axiosApi.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore?.access_token) {
      config.headers.Authorization = `Bearer ${authStore.access_token}`;
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define a function to handle token refresh
const handleTokenRefresh = async () => {
  try {
    const authStore = useAuthStore();
    const refreshResponse = await axiosApi.post("/v1/Account/refreshtoken", {
      token: authStore.refresh_token,
      ipAddress: "",
    });
    const { jwToken: newAccessToken, refreshToken: newRefreshToken } =
      refreshResponse.data;
    authStore.setAccessToken(newAccessToken);
    authStore.setRefreshToken(newRefreshToken);
    axiosApi.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// Set up response interceptor to handle token refresh and retry requests
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      try {
        const newAccessToken = await handleTokenRefresh();
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosApi.request(error.config);
      } catch (refreshError) {
        const authStore = useAuthStore();
        authStore.logOut();
        const redirectedUrl = `/auth/login?info=session_expired&redirected_from=${window.location.href}`;
        window.location.href = redirectedUrl;
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

// Define API functions
export async function get(url, config = {}) {
  return await axiosApi.get(url, config);
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, data, config);
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, data, config);
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, config);
}
