import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import locales from '../../resources/locales';

const COMMON_NAMESPACE = 'common';

export const ENGLISH = 'en';

// see: https://www.i18next.com/overview/configuration-options
const i18nInstance = i18next.use(reactI18nextModule).init({
  ns: COMMON_NAMESPACE,
  defaultNS: COMMON_NAMESPACE,
  nsSeparator: false,
  returnEmptyString: false,
  whitelist: [ENGLISH],
  nonExplicitWhitelist: true,
  fallbackLng: ENGLISH,
  react: {
    wait: true,
    defaultTransParent: 'span', // TODO remove when https://bugs.chromium.org/p/chromium/issues/detail?id=872770 is fixed
  },
});

Object.keys(locales).forEach(locale => {
  i18next.addResourceBundle(locale, COMMON_NAMESPACE, locales[locale]);
});

export default i18nInstance;

export function t(...args) {
  return i18nInstance.t(...args);
}

export const LANGUAGES = {
  [ENGLISH]: {
    text: t('lang.english', { defaultValue: 'English' }),
  },
};
