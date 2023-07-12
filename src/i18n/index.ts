import { useCallback, useMemo } from 'react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

// DayJS locales https://github.com/iamkun/dayjs/tree/dev/src/locale
import dayjsEN from 'dayjs/locale/en';
// AntDesign locales https://github.com/ant-design/ant-design/tree/master/components/locale
import antdEN from 'antd/locale/en_US';

import auth from './en/auth.json';
import bookshelf from './en/bookshelf.json';
import common from './en/common.json';
import dashboard from './en/dashboard.json';
import global from './en/global.json';
import profile from './en/profile.json';

// Maps to src/i18n/{code}
export const SUPPORTED_LANGUAGES = ['en'] as const;

export const LANGUAGES_CONFIG = {
  en: {
    code: 'en',
    name: 'English',
    shortName: 'EN',
    dayjs: dayjsEN,
    antd: antdEN,
    resources: {
      auth,
      bookshelf,
      common,
      dashboard,
      global,
      profile,
    },
  },
} as const satisfies Record<
  (typeof SUPPORTED_LANGUAGES)[number],
  {
    code: (typeof SUPPORTED_LANGUAGES)[number];
    name: string;
    shortName: string;
    dayjs: object;
    antd: object;
    resources: object;
  }
>;

const isLanguage = (lng: string): lng is (typeof SUPPORTED_LANGUAGES)[number] =>
  SUPPORTED_LANGUAGES.includes(lng);

export const resolveLanguage = (lng?: string) =>
  lng && isLanguage(lng) ? lng : SUPPORTED_LANGUAGES[0];

export const useCurrentLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: (typeof SUPPORTED_LANGUAGES)[number]) => i18n.changeLanguage(lng),
    [i18n],
  );

  return useMemo(
    () => [LANGUAGES_CONFIG[resolveLanguage(i18n.resolvedLanguage)], changeLanguage] as const,
    [i18n.resolvedLanguage, changeLanguage],
  );
};

i18next.on('languageChanged', (language) => dayjs.locale(resolveLanguage(language)));

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    resources: Object.fromEntries(
      Object.entries(LANGUAGES_CONFIG).map(([lng, { resources }]) => [lng, resources]),
    ),
    lng: import.meta.env.CI || import.meta.env.VITEST ? 'cimode' : undefined,
    fallbackLng: SUPPORTED_LANGUAGES[0],
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: Object.keys(LANGUAGES_CONFIG[SUPPORTED_LANGUAGES[0]].resources),
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
