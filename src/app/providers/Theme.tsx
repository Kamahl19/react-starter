import { useEffect, type ReactNode, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const STORAGE_KEY = 'theme';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const SYSTEM_THEME = 'system';

const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

const getSystemTheme = () => (darkThemeMq.matches ? Theme.DARK : Theme.LIGHT);

const isTheme = (v: unknown): v is Theme | typeof SYSTEM_THEME =>
  typeof v === 'string' && [SYSTEM_THEME, ...Object.values(Theme)].includes(v);

const getValidTheme = (theme?: string) => (theme && isTheme(theme) ? theme : getSystemTheme());

const setThemeAttr = (theme: string) => {
  const rootEl = window.document.documentElement;
  rootEl.classList.remove(...Object.values(Theme));
  rootEl.classList.add(theme);
};

const persistedThemeAtom = atomWithStorage<Theme | typeof SYSTEM_THEME>(
  STORAGE_KEY,
  getValidTheme(localStorage.getItem(STORAGE_KEY) ?? ''),
);

const themeAtom = atom(
  (get) => getValidTheme(get(persistedThemeAtom)),
  (_, set, theme: string) => set(persistedThemeAtom, getValidTheme(theme)),
);

export const useTheme = () => {
  const { t } = useTranslation('global');

  const [theme, setTheme] = useAtom(themeAtom);

  const themes = useMemo(
    () => [
      { value: Theme.LIGHT, label: t('theme.light') },
      { value: Theme.DARK, label: t('theme.dark') },
      { value: SYSTEM_THEME, label: t('theme.system') },
    ],
    [t],
  );

  return useMemo(
    () =>
      ({
        theme: theme === SYSTEM_THEME ? getSystemTheme() : theme,
        rawTheme: theme,
        setTheme,
        themes,
      }) as const,
    [theme, setTheme, themes],
  );
};

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const { theme, rawTheme } = useTheme();

  useEffect(() => setThemeAttr(theme), [theme]);

  const mqListener = useCallback(() => {
    if (rawTheme === SYSTEM_THEME) {
      setThemeAttr(getSystemTheme());
    }
  }, [rawTheme]);

  useEffect(() => {
    darkThemeMq.addEventListener('change', mqListener);
    return () => darkThemeMq.removeEventListener('change', mqListener);
  }, [mqListener]);

  return children;
};

export default ThemeProvider;
