import { type ReactNode } from 'react';
import { ConfigProvider, App, message } from 'antd';

import { useCurrentLanguage } from 'i18n';

import ThemeProvider from '../theme';

message.config({
  duration: 5,
});

const AntDesign = ({ children }: { children: ReactNode }) => {
  const [language] = useCurrentLanguage();

  return (
    <ConfigProvider locale={language.antd} form={{ scrollToFirstError: true }}>
      <ThemeProvider>
        <App>{children}</App>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default AntDesign;
