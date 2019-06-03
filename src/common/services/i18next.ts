import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translations from 'resources/translations';

import { isDev } from 'config';

// Maps to /src/resources/translations/:language_code
export enum LANGUAGE_CODES {
  EN = 'en',
}

// see: https://www.i18next.com/overview/configuration-options
i18next.use(initReactI18next).init({
  debug: isDev,
  resources: translations,
  lng: LANGUAGE_CODES.EN,
  fallbackLng: LANGUAGE_CODES.EN,
  whitelist: [LANGUAGE_CODES.EN],
  nonExplicitWhitelist: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    defaultTransParent: 'span', // fixes Google Translate issue https://github.com/facebook/react/issues/11538
  },
});

export const t = i18next.t;

export default i18next;
