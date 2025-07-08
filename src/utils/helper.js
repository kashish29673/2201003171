// src/utils/helpers.js
export function generateShortcode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function validateUrl(url) {
  const pattern = /^(http|https):\/\/[^ "]+$/;
  return pattern.test(url);
}

export function validateMinutes(min) {
  const val = parseInt(min);
  return !isNaN(val) && val > 0;
}
