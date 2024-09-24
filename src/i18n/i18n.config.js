import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, hi } from "./translations";

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
};

i18next.use(initReactI18next).init({
  debug: false,
  lng: 'en', // Default language
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  resources,
});

export default i18next;
