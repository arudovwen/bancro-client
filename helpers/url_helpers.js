const urls = {
  //Auth urls
  LOGIN_USER: "/account/sign-in",
  CREATE_TENANT: "/tenant/create-tenant",
  SIGN_UP_TENANT: "/tenant/sign-up-tenant",
  INVITE_TENANT: "/tenant/invite-tenant-user",
  CONFIRM_TENANT: "/confirm-tenant-user",
  REGISTER_INVITED_USER: "/tenant/confirm-tenant-user",
  RESET_PASSWORD: "/account/reset-password",
  FORGOT_PASSWORD: "/account/get-change-password-token",
  GET_INVITE: "/tenant/get-invite-details",
  GET_ROLES: "account/get-user-roles",

  UPDATE_USER_PROFILE: "account/update-user-profile",
  GET_PROFILE: "account/get-user-profile",
  CHANGE_PASSWORD: "account/change-password",
  //Tenants
  GET_TENANTS: "tenant/get-tenants",
  GET_TENANT_USER_BY_ID: "tenant/get-tenant-by-id",
  GET_TENANT_USERS_BY_ID: "tenant/get-tenant-users-by-id",
  GET_TENANT_USERS: "/account/get-users",

  GENERATE_WEBHOOK_URL: "/tenant/generate-webhookurl",
  GENERATE_KEY: "/tenant/generate-keypair",
  GET_WEBHOOK_URL: "/tenant/get-tenant-webhookurl",
  GET_KEY: "/tenant/get-tenant-keys",
};
export default urls;
