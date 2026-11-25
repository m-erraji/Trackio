import { createContext, useContext, useMemo } from "react";
import en from "./en";
import fr from "./fr";
import ar from "./ar";
import { PRODUCTS } from "../products";

/* ---------- Supported languages (order = order in the switcher) ---------- */
export const LANGS = {
  fr: { dict: fr, label: "FR", name: "Français", dir: "ltr", locale: "fr-FR" },
  ar: { dict: ar, label: "ع", name: "العربية", dir: "rtl", locale: "en-US" }, // Western digits, as used in Morocco
  en: { dict: en, label: "EN", name: "English", dir: "ltr", locale: "en-US" },
};
export const DEFAULT_LANG = "fr";
const STORAGE_KEY = "trackio-lang";

/** Saved choice → browser language → French. */
export function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS[saved]) return saved;
  } catch {
    /* ignore */
  }
  for (const l of navigator.languages || [navigator.language]) {
    const code = (l || "").slice(0, 2).toLowerCase();
    if (LANGS[code]) return code;
  }
  return DEFAULT_LANG;
}

export function rememberLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

function build(lang) {
  const L = LANGS[lang];
  const t = L.dict;

  const price = (n) => {
    const num = Number(n).toLocaleString(L.locale);
    return t.currencyAfter ? `${num} ${t.currency}` : `${t.currency}${num}`;
  };

  // Product texts: English in products.js, overridden by the language file.
  const products = PRODUCTS.map((p) => ({
    ...p,
    ...(t.products_data?.[p.id] || {}),
    docs: p.docs.map(([label, url], i) => [t.pdp.docLabels?.[i] ?? label, url]),
  }));

  return {
    lang,
    dir: L.dir,
    t,
    price,
    products,
    findProduct: (id) => products.find((p) => p.id === id),
    /** Localized link: to("#faq") → "/fr#faq", to("/products/x") → "/fr/products/x". */
    to: (path = "") => `/${lang}${path}`,
  };
}

const I18nContext = createContext(null);

export function I18nProvider({ lang, children }) {
  const value = useMemo(() => build(lang), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
