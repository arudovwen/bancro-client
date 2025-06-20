const urls = {
  // Auth urls
  LOGIN_USER: "/customerprofile/sign-in-user",
  OTP_SIGN_IN: "/customerprofile/otp-sign-in",
  SETUP_PASSCODE: "/customerprofile/setup-passcode",
  VERIFY_PASSCODE: "/customerprofile/verify-passcode",
  RESEND_VALIDATE_OTP: "/CustomerProfile/kyc/resend-otp?bvn=",
  SEND_RESET_PASSWORD_OTP: "/customerprofile/send-reset-password-otp",
  VALIDATE_RESET_PASSWORD_OTP: "/customerprofile/validate-reset-password-otp",
  RESET_PASSWORD_CUSTOMER: "/customerprofile/reset-password-customer",
  SEND_CHANGE_PASSWORD_OTP: "/customerprofile/send-change-password-otp",
  VALIDATE_CHANGE_PASSWORD_OTP: "/customerprofile/validate-change-password-otp",
  CHANGE_PASSWORD_CUSTOMER: "/customerprofile/change-password-customer",
  SEND_UPDATE_PROFILE_SETTINGS_OTP:
    "/customerprofile/send-update-profile-settings-otp",
  VERIFY_UPDATE_PROFILE_SETTINGS_OTP:
    "/customerprofile/verify-update-profile-settings-otp",
  EDIT_PROFILE_SETTINGS_OTP: "/customerprofile/edit-profile-settings-otp",
  UPDATE_PROFILE: "/customerprofile/update-profile",
  USER_PROFILE: (userId) => `/customerprofile/user-profile/${userId}`,
  PIN_SETUP: "/customerprofile/pin-setup",
  CHANGE_PIN: "/customerprofile/pin/change",

  KYC_VERIFY: "/customerprofile/kyc/verify",
  VALIDATE_OTP: "/customerprofile/kyc/validate-otp",

  TIER_2_VERIFICATION: "/customerprofile/tier-two-upgrade",
  GET_LIMITS: "/customerprofile/tiers",
  GET_TIER_VERIFICATION: "/customerprofile/get-user-tier-status",
  KYC_DOCUMENT_UPLOAD: "/customerprofile/kyc/document-upload",

  UPLOAD_PROFILE_IMAGE: "/customerprofile/upload-profile-image",
  GET_PROFILE_IMAGE: "/customerprofile/get-user-pic",

  // Loan urls
  LOAN_PRODUCTS: "/loan/loan-products",
  LOAN_REQUESTS: "/loan/loan-requests",
  LOAN_OFFERS: "/loan/offers",
  LOAN_REQUIREMENTS: "/loan/loan-requirements",
  LOAN_OTHER_INFORMATION: "/loan/loan-other-information",
  APPROVE_LOAN_OFFER: "/loan/approve-offers",
  GET_CORE_LOAN_PRODUCT_BY_ID: "Loan/get-product-details",

  // Onboarding urls
  SIGN_UP_USER: "/onboarding/sign-up-user",
  RESEND_OTP_TO_EMAIL: "/onboarding/resend-otp-to-email",
  VERIFY_USER: "/onboarding/verify-user",

  // Savings Account urls
  CREATE_ACCOUNT: "/savingsaccount/create-account",
  DEPOSIT: "/savingsaccount/deposit",
  WITHDRAWAL: "/savingsaccount/withdrawal",
  SAVINGS_ACCOUNT: "/savingsaccount",
  GET_ACCOUNT_TIER: "/savingsaccount/tier",

  // Transactions urls
  GET_TRANSACTION_BY_ID: (id) => `/transactions/${id}`,
  GET_ALL_TRANSACTIONS: "/transactions/transactions",
  GET_ALL_TRANSACTIONS_SAVING: "/transactions/savings",
  GET_TRANSACTIONSS: "/transactions",
  GET_BANKS: "/transactions/banks",
  VALIDATE_ACCOUNT: "/transactions/account/validate",
  TRANSFER: "/transactions/transfer",

  CREATE_TENANT: "/tenant/create-tenant",
  SIGN_UP_TENANT: "/onboarding/sign-up-user",
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

  // Beneficiary
  BENEFICIARY: "/Beneficiary",

  GET_LOAN_PRODUCTS: "",
  REPAY_LOAN: "Loan/client-loan-repayment",
  REPAYMENT_HISTORY: "Loan/loan-transactions",

  SIGNUP_VALIDATE_OTP: "CustomerProfile/kyc/validate-otp",
};
export default urls;
