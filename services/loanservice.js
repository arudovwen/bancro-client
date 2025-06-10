import urls from "../helpers/url_helpers";
import { del, get, post, put } from "../helpers/api_helpers";

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
export const getLoanOffers = (payload) => {
  return get(`${urls.LOAN_OFFERS}?${new URLSearchParams(payload)}`, config);
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

export const getCoreLoanProductById = (payload) => {
  return get(
    `${urls.GET_CORE_LOAN_PRODUCT_BY_ID}?loanId=${payload}`,
    config
  );
};
export const postBeneficiary = (data) => {
  return post(`${urls.BENEFICIARY}`, data, config);
};
export const approveLoanOffer = (data) => {
  return put(`${urls.APPROVE_LOAN_OFFER}?${new URLSearchParams(data)}`, data, config);
};
export const deleteBeneficiary = (data) => {
  return del(`${urls.BENEFICIARY}?${new URLSearchParams(data)}`, config);
};
