import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import locales from '../../resources/locales';

const COMMON_NAMESPACE = 'common';

export const ENGLISH = 'en';

// see: https://www.i18next.com/overview/configuration-options
i18n.use(initReactI18next).init({
  ns: COMMON_NAMESPACE,
  defaultNS: COMMON_NAMESPACE,
  nsSeparator: false,
  returnEmptyString: false,
  whitelist: [ENGLISH],
  nonExplicitWhitelist: true,
  fallbackLng: ENGLISH,
  react: {
    wait: true,
    defaultTransParent: 'span',
  },
});

export default i18n;

Object.keys(locales).forEach(locale => {
  i18n.addResourceBundle(locale, COMMON_NAMESPACE, locales[locale]);
});

export function t(...args) {
  return i18n.t(...args);
}

export const LANGUAGES = {
  [ENGLISH]: {
    text: t('lang.english', { defaultValue: 'English' }),
  },
};
