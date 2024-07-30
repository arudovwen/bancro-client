import urls from "../helpers/url_helpers";
import { post, get } from "../helpers/api_helpers";

//Authentication
export async function loginUser(user, config = {}) {
  return await post(urls.LOGIN_USER, user);
}
export async function logOut() {
  const authStore = useAuthStore();
  // googleLogout();
  authStore.logOut();
}
export async function createTenant(user, config = {}) {
  return await post(urls.CREATE_TENANT, user, config);
}
export async function signupTenant(user, config = {}) {
  return await post(urls.SIGN_UP_TENANT, user, config);
}

export async function inviteTenant(user, config = {}) {
  return await post(urls.INVITE_TENANT, user, config);
}

export async function registerInvitedUser(user, config = {}) {
  return await post(urls.REGISTER_INVITED_USER, user, config);
}
export async function changePassword(data, config = {}) {
  return await post(`${urls.CHANGE_PASSWORD}`, data, config);
}

export async function resetPassword(data, config = {}) {
  return await post(`${urls.RESET_PASSWORD}`, data, config);
}

export async function forgotPassword(email, config = {}) {
  return await get(`${urls.FORGOT_PASSWORD}?email=${email}`, config);
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
