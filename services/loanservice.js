import urls from "../helpers/url_helpers";
import { del, get, post } from "../helpers/api_helpers";

const config = {
  // headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getLoanProducts = (payload) => {
  return get(`${urls.LOAN_PRODUCTS}?${new URLSearchParams(payload)}`, config);
};
export const postBeneficiary = (data) => {
  return post(`${urls.BENEFICIARY}`, data, config);
};

export const deleteBeneficiary = (data) => {
  return del(`${urls.BENEFICIARY}?${new URLSearchParams(data)}`, config);
};