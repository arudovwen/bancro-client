import Axios from "axios";
import { useAuthStore } from "~/stores/auth";

const API_URL = "https://clientapi.streams.com.ng";
const runtimeConfig = useRuntimeConfig();

const axiosApi = Axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

/* ============================================================
   🔐 PROPERLY ASYNC: ENCRYPT HEADERS
   ============================================================ */
async function encryptHeaders(headers) {
  const encrypted = {};

  for (const key of Object.keys(headers)) {
    encrypted[key] = await encryptAny(headers[key]);
  }

  return encrypted;
}

/* ============================================================
   🔐 PROPERLY ASYNC: ENCRYPT QUERY PARAMS
   ============================================================ */
async function encryptQueryParams(params) {
  if (!params) return params;

  const encrypted = {};

  for (const key of Object.keys(params)) {
    encrypted[key] = await encryptAny(params[key]);
  }

  return encrypted;
}

/* ============================================================
   🔐 ASYNC REQUEST INTERCEPTOR (REQUIRED)
   ============================================================ */
axiosApi.interceptors.request.use(
  async (config) => {
    const authStore = useAuthStore();

    // Add bearer token
    if (authStore?.access_token) {
      config.headers.Authorization = `Bearer ${authStore.access_token}`;
    }

    config.headers.Accept = "application/json";

    // Encrypt selected headers
    const encryptedHeaderValues = await encryptHeaders({
      apiKey: runtimeConfig.public.PUBLIC_KEY,
      tenantId: runtimeConfig.public.TENANT_ID,
    });

    config.headers = {
      ...config.headers,
      ...encryptedHeaderValues,
        "X-Eppeck-Y": "cYINMgopQIg==",
    };

    // Encrypt query params
    if (config.params) {
      config.params = await encryptQueryParams(config.params);
    }

    // Encrypt body
    if (config.data) {
      const encryptedPayload = await encryptAny(JSON.stringify(config.data));
      config.data = { Data: encryptedPayload };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================================================
   🔄 TOKEN REFRESH
   ============================================================ */
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

/* ============================================================
   🔐 RESPONSE INTERCEPTOR WITH DECRYPTION
   ============================================================ */
axiosApi.interceptors.response.use(
  async (response) => {
    if (response.data?.Data) {
      const decrypted = await decryptAny(response.data.Data);
      response.data = JSON.parse(decrypted);
    }
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
    if (error.response?.data?.Data) {
      console.log({ error: error.response?.data });

      const decrypted = await decryptAny(error.response.data.Data);
      error.response.data = JSON.parse(decrypted);
    }

    return Promise.reject(error);
  }
);

/* ============================================================
   EXPORT API
   ============================================================ */
export const get = (url, config = {}) => axiosApi.get(url, config);
export const post = (url, data, config = {}) =>
  axiosApi.post(url, data, config);
export const put = (url, data, config = {}) => axiosApi.put(url, data, config);
export const del = (url, config = {}) => axiosApi.delete(url, config);
