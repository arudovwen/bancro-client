import Axios from "axios";
import { useAuthStore } from "~/stores/auth";

const API_URL = "https://clientapi.streams.com.ng";
const runtimeConfig = useRuntimeConfig();

const axiosApi = Axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

/* =========================================================
   🔐 ENCRYPT SELECTED HEADERS
   (Feel free to choose ANY headers you want encrypted)
   ========================================================= */
function encryptHeaders(headers) {
  return headers
  const encryptedHeaders = { ...headers };

  const keysToEncrypt = ["apiKey", "tenantId"]; // 🔐 your choice

  keysToEncrypt.forEach((key) => {
    if (encryptedHeaders[key]) {
      encryptedHeaders[key] = encryptAny(encryptedHeaders[key]);
    }
  });

  return encryptedHeaders;
}

/* =========================================================
   🔐 ENCRYPT QUERY PARAMS
   ========================================================= */
function encryptQueryParams(params) {
  if (!params) return params;

  const encrypted = {};

  Object.keys(params).forEach((key) => {
    encrypted[key] = encryptAny(params[key]);
  });

  return encrypted;
}

/* =========================================================
   🔐 REQUEST INTERCEPTOR
   Encrypt:
     ✔ headers
     ✔ query params
     ✔ body
   ========================================================= */
axiosApi.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    // Add access token
    if (authStore?.access_token) {
      config.headers.Authorization = `Bearer ${authStore.access_token}`;
    }

    config.headers.Accept = "application/json";

    // Encrypt headers
    config.headers = encryptHeaders({
      ...config.headers,
      apiKey: runtimeConfig.public.PUBLIC_KEY,
      tenantId: runtimeConfig.public.TENANT_ID,
    });

    // // Encrypt query params
    // if (config.params) {
    //   config.params = encryptQueryParams(config.params);
    // }

    // // Encrypt request body
    // if (config.data) {
    //   config.data = {
    //     payload: encryptAny(config.data),
    //   };
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================================
   🔄 TOKEN REFRESH
   ========================================================= */
const handleTokenRefresh = async () => {
  const authStore = useAuthStore();
  const refreshResponse = await axiosApi.post("/v1/Account/refreshtoken", {
    token: authStore.refresh_token,
    ipAddress: "",
  });

  const { jwToken, refreshToken } = refreshResponse.data;

  authStore.setAccessToken(jwToken);
  authStore.setRefreshToken(refreshToken);

  axiosApi.defaults.headers.Authorization = `Bearer ${jwToken}`;

  return jwToken;
};

/* =========================================================
   🔐 RESPONSE INTERCEPTOR
   Automatically decrypts:
     ✔ success responses
     ✔ error responses
   ========================================================= */
axiosApi.interceptors.response.use(
  (response) => {
    // if (response.data?.payload) {
    //   response.data = decryptAny(response.data.payload);
    // }
    return response;
  },

  async (error) => {
    const original = error.config;

    // Token expired
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const newToken = await handleTokenRefresh();
        original.headers.Authorization = `Bearer ${newToken}`;
        return axiosApi(original);
      } catch (refreshError) {
        const authStore = useAuthStore();
        authStore.logOut();
        window.location.href = `/auth/login?info=session_expired&redirected_from=${window.location.href}`;
        return Promise.reject(refreshError);
      }
    }

    // Decrypt error response
    // if (error.response?.data?.payload) {
    //   error.response.data = decryptAny(error.response.data.payload);
    // }

    return Promise.reject(error);
  }
);

/* =========================================================
   Export API Methods
   ========================================================= */
export const get = (url, config = {}) => axiosApi.get(url, config);
export const post = (url, data, config = {}) => axiosApi.post(url, data, config);
export const put = (url, data, config = {}) => axiosApi.put(url, data, config);
export const del = (url, config = {}) => axiosApi.delete(url, config);
