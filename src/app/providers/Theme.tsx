import { useEffect, type ReactNode } from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;

const STORAGE_KEY = 'theme';

const themePersistedAtom = atomWithStorage<Theme>(
  STORAGE_KEY,
  Object.values(Theme).includes(`${localStorage.getItem(STORAGE_KEY)}`)
    ? (localStorage.getItem(STORAGE_KEY) as Theme) // eslint-disable-line @typescript-eslint/consistent-type-assertions
    : getSystemTheme(),
);

export const useTheme = () => useAtom(themePersistedAtom);

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [theme] = useTheme();

  useEffect(() => {
    const rootEl = window.document.documentElement;
    rootEl.classList.remove(...Object.values(Theme));
    rootEl.classList.add(theme === Theme.SYSTEM ? getSystemTheme() : theme);
  }, [theme]);

  return children;
};

export default ThemeProvider;
