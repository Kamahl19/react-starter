import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import auth from './en/auth.json';
import common from './en/common.json';
import dashboard from './en/dashboard.json';
import global from './en/global.json';
import profile from './en/profile.json';

// Maps to src/i18n/{code}
export enum LANGUAGE_CODES {
  EN = 'en',
}

export const resources = {
  [LANGUAGE_CODES.EN]: {
    auth,
    common,
    dashboard,
    global,
    profile,
  },
} as const satisfies Record<LANGUAGE_CODES, object>;

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    resources,
    lng: import.meta.env.CI || import.meta.env.VITEST ? 'cimode' : undefined,
    fallbackLng: LANGUAGE_CODES.EN,
    supportedLngs: Object.values(LANGUAGE_CODES),
    ns: Object.keys(resources[LANGUAGE_CODES.EN]),
    defaultNS: false,
    returnNull: false,
    appendNamespaceToCIMode: true,
    interpolation: {
      escapeValue: false, // React escapes by default
    },
    react: {
      transWrapTextNodes: 'span',
    },
  });
