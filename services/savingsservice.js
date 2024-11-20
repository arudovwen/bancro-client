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

export const getSavingsAccountByUserid = (id) => {
  return get(`${urls.SAVINGS_ACCOUNT}/accounts/${id}`, config);
};

export const getSavingsAccountClientByUserid = (id) => {
  return get(`${urls.SAVINGS_ACCOUNT}/clients/${id}`, config);
};

export const getBanks = () => {
  return get(`${urls.GET_BANKS}`, config);
};

export const validateAccount = (data) => {
  return post(
    `${urls.VALIDATE_ACCOUNT}?${new URLSearchParams(data)}`,
    {},
    config
  );
};

export const completeTransfer = (data) => {
  return post(`${urls.TRANSFER}`, data, config);
};

export const getTransactions = (data) => {
  return get(
    `${urls.GET_ALL_TRANSACTIONS_SAVING}/${
      data.savingsId
    }?${new URLSearchParams(data)}`,
    config
  );
};
