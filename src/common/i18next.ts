import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// Maps to public/locales/:language_code
export const LANGUAGE_CODES = {
  EN: 'en',
};

// see: https://www.i18next.com/overview/configuration-options
i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    // debug: import.meta.env.DEV,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    lng: LANGUAGE_CODES.EN,
    fallbackLng: LANGUAGE_CODES.EN,
    supportedLngs: [LANGUAGE_CODES.EN],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      transWrapTextNodes: 'span',
    },
  });

export const t = i18next.t.bind(i18next);
