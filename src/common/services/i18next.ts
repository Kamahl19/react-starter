import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';

import { isDev } from 'config';

// Maps to public/locales/:language_code
export const LANGUAGE_CODES = {
  EN: 'en',
};

// see: https://www.i18next.com/overview/configuration-options
i18next
  .use(XHR)
  .use(initReactI18next)
  .init({
    debug: isDev,
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

export default i18next;
