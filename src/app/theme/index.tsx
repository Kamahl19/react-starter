import { type ReactNode, useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import GlobalStyles from './GlobalStyles';
import baseConfig from './baseConfig';
import darkConfig from './darkConfig';

const isDarkState = atom<boolean>({
  key: 'isDark',
  default: false,
  effects: [recoilPersist({ key: 'isDark' }).persistAtom],
});

export const useIsDark = () => useRecoilState(isDarkState);

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
