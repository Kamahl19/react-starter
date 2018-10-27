import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import moment from 'moment';

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
  // allows en-US if en is in whitelist, etc.
  nonExplicitWhitelist: true,
  // if the user language doesn't match anything in the whitelist, use this
  fallbackLng: ENGLISH,
  react: {
    wait: true,
  },
});

Object.keys(locales).forEach(locale => {
  i18next.addResourceBundle(locale, COMMON_NAMESPACE, locales[locale]);
});

i18next.on('languageChanged', lng => {
  moment.locale(LANGUAGES[lng].momentLocale);
});

export default i18nInstance;

export function t(...args) {
  return i18nInstance.t(...args);
}

export const LANGUAGES = {
  [ENGLISH]: {
    text: t('lang.english', { defaultValue: 'English' }),
    momentLocale: ENGLISH,
  },
};
