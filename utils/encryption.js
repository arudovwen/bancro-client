import CryptoJS from "crypto-js";

// MUST be exact length
const SECRET_KEY = "your-32-length-secret-key!!!!!!!!!"; 
const IV = "your-16-char-iv!";

const keyUtf = CryptoJS.enc.Utf8.parse(SECRET_KEY);
const ivUtf = CryptoJS.enc.Utf8.parse(IV);

export function encryptAny(data) {
  if (data === null || data === undefined) return null;
  if (typeof data === "boolean") data = data.toString();
  if (typeof data !== "string") data = JSON.stringify(data);

  return CryptoJS.AES.encrypt(data, keyUtf, {
    iv: ivUtf,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

export function decryptAny(encryptedValue) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, keyUtf, {
      iv: ivUtf,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (e) {
    console.warn("Failed to decrypt (might be plain text):", encryptedValue);
    return encryptedValue;
  }
}
