/* eslint-disable no-unused-vars */
// import { nanoid } from "nanoid"; //if using nanoid

export function initiateVerify(data, onSuccess, onModalClose) {
  const config = useRuntimeConfig();

  var verificationEngine;
  window.IdentityKYC.verify({
    ...data,
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
