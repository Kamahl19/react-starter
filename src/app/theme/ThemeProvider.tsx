import { type ReactNode, useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { atom, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import GlobalStyles from './GlobalStyles';
import baseConfig from './baseConfig';
import darkConfig from './darkConfig';

export const isDarkState = atom<boolean>({
  key: 'isDark',
  default: false,
  effects: [recoilPersist({ key: 'isDark' }).persistAtom],
});

export const useIsDark = () => useRecoilValue(isDarkState);

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const isDark = useIsDark();

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

const Emotion = ({ children }: Props) => {
  const { token } = antTheme.useToken();
  const isDark = useIsDark();

  const theme = useMemo(() => ({ token, isDark }), [token, isDark]);

  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};

export default ThemeProvider;
