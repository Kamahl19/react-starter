import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// Maps to public/locales/:language_code
export const LANGUAGE_CODES = {
  EN: 'en',
};

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    lng: LANGUAGE_CODES.EN,
    fallbackLng: LANGUAGE_CODES.EN,
    supportedLngs: [LANGUAGE_CODES.EN],
    interpolation: {
      escapeValue: false, // React escapes by default
    },
  });

// eslint-disable-next-line unicorn/prefer-export-from
export default i18next;
