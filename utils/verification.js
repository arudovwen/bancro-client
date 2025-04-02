/* eslint-disable no-unused-vars */
// import { nanoid } from "nanoid"; //if using nanoid

export function initiateVerify(data, onModalClose, onSuccess) {
  const config = useRuntimeConfig();

  var verificationEngine 
  window.IdentityKYC.verify({  
    merchant_key: "live_pk_PgbSjJl15Wt95osJXhfgQt2KqRJHaWv0ZhSTN2t",  
    first_name:"James",  
    last_name:"John",  
    email:"janeforster@yopmail.com",
    config_id:"c6f1c16a-d293-4c2a-8c78-784eed886138",
    user_ref:"236243634",  
    callback: function (response) {  
        console.log("callback Response", response);  
        if(response.status =='success'){  
            alert('Information Verified')  
            onSuccess(response)
        }  
        else{  
            alert(response.message)  
            onModalClose(response)
        }  
},  
})
}
