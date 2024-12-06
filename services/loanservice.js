import urls from "../helpers/url_helpers";
import { del, get, post } from "../helpers/api_helpers";

const config = {
  // headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getLoanProductById = (payload) => {
  return get(`${urls.LOAN_PRODUCTS}/${payload}`, config);
};

export const getLoanProducts = (payload) => {
  return get(`${urls.LOAN_PRODUCTS}?${new URLSearchParams(payload)}`, config);
};

export const getLoanRequests = (payload) => {
  return get(`${urls.LOAN_REQUESTS}?${new URLSearchParams(payload)}`, config);
};
export const postLoanRequest = (payload) => {
  return post(`${urls.LOAN_REQUESTS}`, payload, config);
};
export const getLoanRequirements = (payload) => {
  return get(
    `${urls.LOAN_REQUIREMENTS}/${payload}`,
    config
  );
};

export const getLoanOthers = (payload) => {
  return get(
    `${urls.LOAN_OTHER_INFORMATION}?productId=${payload}`,
    config
  );
};

export const postBeneficiary = (data) => {
  return post(`${urls.BENEFICIARY}`, data, config);
};

export const deleteBeneficiary = (data) => {
  return del(`${urls.BENEFICIARY}?${new URLSearchParams(data)}`, config);
};
