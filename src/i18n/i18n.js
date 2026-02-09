import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import bn from './locales/bn.json';

const resources = {
  en: { translation: en },
  bn: { translation: bn }
};

const STORAGE_KEY = 'lang';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) || 'bn',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
