import { useMemo, type ReactNode } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import GlobalStyles from './GlobalStyles';
import baseConfig from './baseConfig';
import darkConfig from './darkConfig';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const STORAGE_KEY = 'theme';

const themePersistedAtom = atomWithStorage<Theme>(
  STORAGE_KEY,
  Object.values(Theme).includes(`${localStorage.getItem(STORAGE_KEY)}`)
    ? (localStorage.getItem(STORAGE_KEY) as Theme) // eslint-disable-line @typescript-eslint/consistent-type-assertions
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? Theme.DARK
      : Theme.LIGHT,
);

export const useTheme = () => useAtom(themePersistedAtom);

const Emotion = ({ children }: { children: ReactNode }) => {
  const { token } = antTheme.useToken();
  const [themeName] = useTheme();

  const theme = useMemo(
    () => ({
      token,
      theme: themeName,
    }),
    [token, themeName],
  );

  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [themeName] = useTheme();

  const theme = useMemo(() => (themeName === Theme.DARK ? darkConfig : baseConfig), [themeName]);

  return (
    <ConfigProvider theme={theme}>
      <Emotion>
        <GlobalStyles />
        {children}
      </Emotion>
    </ConfigProvider>
  );
};

export default ThemeProvider;
