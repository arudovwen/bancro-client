import urls from "../helpers/url_helpers";
import { get, post } from "../helpers/api_helpers";

const config = {
  // headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getWalletDetails = () => {
  return get(`${urls.GET_WALLET_DETAILS}`, config);
};

export const createSavingsAccount = (data) => {
  return post(`${urls.CREATE_ACCOUNT}`, data, config);
};
