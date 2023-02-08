import { type ReactNode } from 'react';
import { ConfigProvider, App, message } from 'antd';
import en_US from 'antd/locale/en_US';

import { ThemeProvider } from '../theme';

message.config({
  duration: 5,
});

const AntDesign = ({ children }: { children: ReactNode }) => (
  <ConfigProvider locale={en_US} form={{ scrollToFirstError: true }}>
    <ThemeProvider>
      <App>{children}</App>
    </ThemeProvider>
  </ConfigProvider>
);

export default AntDesign;
