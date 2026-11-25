/* =========================================================
   Trackio — shop settings
   - Products & their photos/prices:  products.js
   - All texts (FR / AR / EN), currency label:  i18n/fr.js, i18n/ar.js, i18n/en.js
   ========================================================= */

// Your WhatsApp number in international format, digits only (e.g. "212600000000").
// Leave empty to disable WhatsApp links and order hand-off.
export const WHATSAPP_NUMBER = "";

export const PHONE_DISPLAY = "0650-257163";
export const PHONE_TEL = "0650-257163";
export const EMAIL = "contact@trackio.com";

export { PRODUCTS, findProduct } from "./products";

export const waLink = (text = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
