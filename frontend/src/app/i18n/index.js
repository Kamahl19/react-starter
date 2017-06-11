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
  lng: 'en',
  fallbackLng: 'en',
  ns: COMMON_NAMESPACE,
  defaultNS: COMMON_NAMESPACE,
  nsSeparator: false,
  keySeparator: false,
  returnEmptyString: false,
  resources: resources,
});

export default i18nInstance;

export function t(...args) {
  return i18nInstance.t(...args);
}
