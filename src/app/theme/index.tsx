import { type ReactNode, useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import GlobalStyles from './GlobalStyles';
import baseConfig from './baseConfig';
import darkConfig from './darkConfig';

const isDarkPersistedAtom = atomWithStorage('isDark', localStorage.getItem('isDark') === 'true');

const isDarkAtom = atom(
  (get) => get(isDarkPersistedAtom),
  (get, set) => {
    set(isDarkPersistedAtom, !get(isDarkPersistedAtom));
  },
);

export const useIsDark = () => useAtom(isDarkAtom);

const Emotion = ({ children }: { children: ReactNode }) => {
  const { token } = antTheme.useToken();
  const [isDark] = useIsDark();

  const theme = useMemo(() => ({ token, isDark }), [token, isDark]);

  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark] = useIsDark();

  const theme = useMemo(() => (isDark ? darkConfig : baseConfig), [isDark]);

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
