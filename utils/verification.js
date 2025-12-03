/* eslint-disable no-unused-vars */
// import { nanoid } from "nanoid"; //if using nanoid
import axios from "axios";

export function initiateVerify(data, onFunction) {
  axios
    .post(`https://api.prembly.com/checker/sdk/widget/initialize`, data, {
      headers: {
        "x-api-key": "live_pk_UfZM6Eg4ep0hbzg6ykE80wha09Ta8ELKygsB3pf",
      },
    })
    .then((response) => {
      onFunction(response?.data?.data?.widget_id);
    });
}

// var verificationEngine;
// window.IdentityKYC.verify({
//   ...data,
//   callback: function (response) {
//     console.log("callback Response", response);
//     if (response.status == "success") {
//       onSuccess(response);
//     } else {
//       onModalClose(response);
//     }
//   },
// });
// }
