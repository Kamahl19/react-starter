import { type ReactNode } from 'react';
import { ConfigProvider, App } from 'antd';

import { useCurrentLanguage } from 'i18n';

import ThemeProvider from '../theme';

const AntDesign = ({ children }: { children: ReactNode }) => {
  const [language] = useCurrentLanguage();

  return (
    <ConfigProvider locale={language.antd} form={{ scrollToFirstError: true }}>
      <ThemeProvider>
        <App message={{ duration: 5 }}>{children}</App>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default AntDesign;
