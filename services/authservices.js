import urls from "../helpers/url_helpers";
import { post, get, put } from "../helpers/api_helpers";

//Authentication
export async function loginUser(user, config = {}) {
  return await post(urls.LOGIN_USER, user);
}
export async function loginVerifyOtp(data, config = {}) {
  return await post(urls.OTP_SIGN_IN, data, config);
}
export async function logOut() {
  const authStore = useAuthStore();
  // googleLogout();
  authStore.logOut();
}
export async function createUser(user, config = {}) {
  return await post(urls.CREATE_TENANT, user, config);
}
export async function signupUser(user, config = {}) {
  return await post(urls.SIGN_UP_USER, user, config);
}

export async function signupVerify(data, config = {}) {
  return await put(urls.VERIFY_USER, data, config);
}

export async function inviteUser(user, config = {}) {
  return await post(urls.INVITE_TENANT, user, config);
}

export async function registerInvitedUser(user, config = {}) {
  return await post(urls.REGISTER_INVITED_USER, user, config);
}
export async function changePassword(data, config = {}) {
  return await post(`${urls.CHANGE_PASSWORD}`, data, config);
}

export async function forgotPassword(data, config = {}) {
  return await post(
    `${urls.SEND_RESET_PASSWORD_OTP}?${new URLSearchParams(data)}`,
    data,
    config
  );
}
export async function validateResetPassword(data, config = {}) {
  return await post(`${urls.VALIDATE_RESET_PASSWORD_OTP}`, data, config);
}
export async function resetPassword(data, config = {}) {
  return await post(`${urls.RESET_PASSWORD_CUSTOMER}`, data, config);
}

export async function getUserProfile(userId, config = {}) {
  return await get(`${urls.GET_PROFILE}?userId=${userId}`, config);
}

export async function getRoles() {
  return await get(urls.GET_ROLES);
}
export async function getInvite(code) {
  return await get(`${urls.GET_INVITE}?InviteCode=${code}`);
}
export async function sendMessage(data) {
  return await post(urls.CONTACT_USER, data);
}

export async function resend2FA(data) {
  return await post(
    `${urls.RESEND_OTP_TO_EMAIL}?${new URLSearchParams(data)}`,
    data
  );
}
