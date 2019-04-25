import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translations from 'resources/translations';

// Maps to /src/resources/translations/:language_code
export const LANGUAGE_CODES = {
  EN: 'en',
};

// see: https://www.i18next.com/overview/configuration-options
i18next.use(initReactI18next).init({
  nsSeparator: false,
  returnEmptyString: false,
  whitelist: [LANGUAGE_CODES.EN],
  lng: LANGUAGE_CODES.EN,
  fallbackLng: LANGUAGE_CODES.EN,
  nonExplicitWhitelist: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
    defaultTransParent: 'span', // fixes Google Translate issue https://github.com/facebook/react/issues/11538
  },
});

const [DEFAULT_NAMESPACE] = i18next.options.defaultNS;

Object.keys(translations).forEach(languageCode =>
  i18next.addResourceBundle(languageCode, DEFAULT_NAMESPACE, translations[languageCode])
);

export function t(...args) {
  return i18next.t(...args);
}

export default i18next;
