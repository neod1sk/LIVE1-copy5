import { TRANSLATIONS, SUPPORTED_LANGUAGES } from "./translations.js";

const STORAGE_KEY = "oshiLang";

const translateTemplate = (template, params = {}) =>
  template.replace(/\{(\w+)\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(params, key) ? params[key] : `{${key}}`
  );

export const createI18n = () => {
  let currentLang = loadLanguage();

  function loadLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
        return stored;
      }
    } catch (error) {
      console.warn("Language preference read failed:", error);
    }
    return "ja";
  }

  function saveLanguage(nextLang) {
    try {
      localStorage.setItem(STORAGE_KEY, nextLang);
    } catch (error) {
      console.warn("Language preference write failed:", error);
    }
  }

  const translate = (key, params = {}) => {
    const activePack = TRANSLATIONS[currentLang] || TRANSLATIONS.ja;
    const fallback = TRANSLATIONS.ja || {};
    let template = activePack[key];
    if (template === undefined || template === null) {
      template = fallback[key];
    }
    if (template === undefined || template === null) {
      template = key;
    }
    return translateTemplate(template, params);
  };

  const setLanguage = (lang) => {
    const nextLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : "ja";
    currentLang = nextLang;
    saveLanguage(nextLang);
    document.documentElement.setAttribute("lang", nextLang);
    return currentLang;
  };

  const getLanguage = () => currentLang;

  return {
    t: translate,
    setLanguage,
    getLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};



