import { type ReactNode } from 'react';
import { ConfigProvider, message } from 'antd';
import en_US from 'antd/lib/locale/en_US';

message.config({
  duration: 5,
});

const AntDesignConfig = ({ children }: { children: ReactNode }) => (
  <ConfigProvider locale={en_US}>{children}</ConfigProvider>
);

export default AntDesignConfig;
