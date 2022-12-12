import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import auth from 'locales/en/auth.json';
import common from 'locales/en/common.json';
import dashboard from 'locales/en/dashboard.json';
import global from 'locales/en/global.json';
import profile from 'locales/en/profile.json';

// Maps to src/locales/:language_code
export const LANGUAGE_CODES = {
  EN: 'en',
} as const;

export const resources = {
  [LANGUAGE_CODES.EN]: {
    auth,
    common,
    dashboard,
    global,
    profile,
  },
} as const;

i18next.use(initReactI18next).init({
  debug: import.meta.env.DEV,
  resources,
  lng: LANGUAGE_CODES.EN,
  fallbackLng: LANGUAGE_CODES.EN,
  supportedLngs: [LANGUAGE_CODES.EN],
  ns: Object.keys(resources[LANGUAGE_CODES.EN]),
  returnNull: false,
  interpolation: {
    escapeValue: false, // React escapes by default
  },
  react: {
    transWrapTextNodes: 'span',
  },
});
