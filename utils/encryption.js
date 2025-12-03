// Helpers
function base64ToBytes(base64) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

// --- VALIDATION ---
(function validateKeyAndIV() {
  const config = useRuntimeConfig();
  const keyBytes = base64ToBytes(config.public.SECRET_KEY);
  const ivBytes = base64ToBytes(config.public.IV_KEY);

  if (![16, 24, 32].includes(keyBytes.length)) {
    console.error("❌ AES KEY LENGTH INVALID:", keyBytes.length, "bytes");
  } else {
    console.log("✔ AES key length OK:", keyBytes.length, "bytes");
  }

  if (ivBytes.length !== 16) {
    console.error("❌ AES IV LENGTH INVALID:", ivBytes.length, "bytes");
  } else {
    console.log("✔ AES IV length OK:", ivBytes.length, "bytes");
  }
})();
export async function encryptAny(plainText) {
  const config = useRuntimeConfig();
  const keyBytes = base64ToBytes(config.public.SECRET_KEY);
  const ivBytes = base64ToBytes(config.public.IV_KEY);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivBytes },
    cryptoKey,
    new TextEncoder().encode(plainText)
  );

  return bytesToBase64(new Uint8Array(encryptedBuffer));
}
export async function decryptAny(encryptedText) {
  const encryptedBytes = base64ToBytes(encryptedText);
  const config = useRuntimeConfig();
  const keyBytes = base64ToBytes(config.public.SECRET_KEY);
  const ivBytes = base64ToBytes(config.public.IV_KEY);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBytes },
    cryptoKey,
    encryptedBytes
  );

  return new TextDecoder().decode(decryptedBuffer);
}
