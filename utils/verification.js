/* eslint-disable no-unused-vars */
// import { nanoid } from "nanoid"; //if using nanoid

export function initiateVerify(
  { first_name, last_name, config_id, email, user_ref },
  onModalClose,
  onSuccess
) {
  const config = useRuntimeConfig();

  var verificationEngine;
  window.IdentityKYC.verify({
    merchant_key: "live_pk_PgbSjJl15Wt95osJXhfgQt2KqRJHaWv0ZhSTN2t",
    first_name,
    last_name,
    email,
    config_id,
    user_ref,
    callback: function (response) {
      console.log("callback Response", response);
      if (response.status == "success") {
        onSuccess(response);
      } else {
        onModalClose(response);
      }
    },
  });
}
