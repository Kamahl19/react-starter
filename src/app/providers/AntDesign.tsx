import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigProvider, App, message } from 'antd';
import enUS from 'antd/locale/en_US';

import { LANGUAGE_CODES } from 'i18n';

import ThemeProvider from '../theme';

message.config({
  duration: 5,
});

const AntDesign = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();

  const locale = useMemo(() => {
    switch (i18n.resolvedLanguage) {
      case LANGUAGE_CODES.EN: {
        return enUS;
      }
      default: {
        return enUS;
      }
    }
  }, [i18n.resolvedLanguage]);

  return (
    <ConfigProvider locale={locale} form={{ scrollToFirstError: true }}>
      <ThemeProvider>
        <App>{children}</App>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default AntDesign;
