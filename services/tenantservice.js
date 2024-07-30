import urls from "../helpers/url_helpers";
import { get, post } from "../helpers/api_helpers";

const config = {
  // headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getTenants = (payload) => {
  return get(
    `${urls.GET_TENANTS}?${new URLSearchParams(payload)}`,config
  );
};
export const getTenantById = (data) => {
  return get(`${urls.GET_TENANTS_BY_ID}?tenantId=${data}`, config);
};

export const getTenantUsers = (payload) => {
  return get(
    `${urls.GET_TENANT_USERS}?${new URLSearchParams(payload)}`,config
  );
};
export const getTenantUserById = (data) => {
  return get(`${urls.GET_TENANT_USER_BY_ID}?TenantId=${data}`, config);
};
export const generateKey = (data) => {
  return post(`${urls.GENERATE_KEY}?${new URLSearchParams(data)}`,{}, config);
};
export const generateWebhook = (data) => {
  return post(`${urls.GENERATE_WEBHOOK_URL}?${new URLSearchParams(data)}`,{}, config);
};

export const getKeys = (data) => {
  return get(`${urls.GET_KEY}?TenantId=${data}`, config);
};
export const getWebhooks = (data) => {
  return get(`${urls.GET_WEBHOOK_URL}?TenantId=${data}`, config);
};
