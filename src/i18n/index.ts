import { useCallback, useMemo } from 'react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

// DayJS locales https://github.com/iamkun/dayjs/tree/dev/src/locale
import dayjsEN from 'dayjs/locale/en';

import auth from './en/auth.json';
import bookshelf from './en/bookshelf.json';
import common from './en/common.json';
import dashboard from './en/dashboard.json';
import global from './en/global.json';
import profile from './en/profile.json';

// Maps to src/i18n/{code}
export const SUPPORTED_LANGUAGES = ['en'] as const;

type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];

export const LANGUAGES_CONFIG = {
  en: {
    code: 'en',
    name: 'English',
    shortName: 'EN',
    dayjs: dayjsEN,
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
  LanguageCode,
  {
    code: LanguageCode;
    name: string;
    shortName: string;
    dayjs: object;
    resources: object;
  }
>;

const isLanguageCode = (v: unknown): v is LanguageCode =>
  typeof v === 'string' && SUPPORTED_LANGUAGES.includes(v);

const resolveLanguage = (code?: string) => (code && isLanguageCode(code) ? code : DEFAULT_LANGUAGE);

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const language = useMemo(
    () => LANGUAGES_CONFIG[resolveLanguage(i18n.resolvedLanguage)],
    [i18n.resolvedLanguage],
  );

  const setLanguage = useCallback(
    (code: string) => i18n.changeLanguage(resolveLanguage(code)),
    [i18n],
  );

  return useMemo(() => [language, setLanguage] as const, [language, setLanguage]);
};

i18next.on('languageChanged', (language) => dayjs.locale(resolveLanguage(language)));

void i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    resources: Object.fromEntries(
      Object.entries(LANGUAGES_CONFIG).map(([lng, { resources }]) => [lng, resources]),
    ),
    ...(import.meta.env.CI === 'true' || import.meta.env.VITEST === 'true'
      ? { lng: 'cimode' }
      : {}),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: Object.keys(LANGUAGES_CONFIG[DEFAULT_LANGUAGE].resources),
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
