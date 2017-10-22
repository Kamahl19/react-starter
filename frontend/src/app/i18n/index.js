import i18n from 'i18next';

import locales from './locales';

const COMMON_NAMESPACE = 'common';

const resources = {};

Object.keys(locales).forEach(locale => {
  resources[locale] = {
    [COMMON_NAMESPACE]: locales[locale],
  };
});

const i18nInstance = i18n.init({
  defaultNS: COMMON_NAMESPACE,
  fallbackLng: 'en',
  keySeparator: false,
  lng: 'en',
  ns: COMMON_NAMESPACE,
  nsSeparator: false,
  resources: resources,
  returnEmptyString: false,
});

export default i18nInstance;

export function t(...args) {
  return i18nInstance.t(...args);
}
