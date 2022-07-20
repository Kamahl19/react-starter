import { type ReactNode } from 'react';
import { ConfigProvider, message } from 'antd';
import en_US from 'antd/lib/locale/en_US';

message.config({
  duration: 5,
});

const config = {
  locale: en_US,
  pageHeader: {
    ghost: false,
  },
};

const AntDesignConfig = ({ children }: { children: ReactNode }) => (
  <ConfigProvider {...config}>{children}</ConfigProvider>
);

export default AntDesignConfig;
