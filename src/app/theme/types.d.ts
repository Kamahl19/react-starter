import { type GlobalToken } from 'antd';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme {
    token: GlobalToken;
    isDark: boolean;
  }
}
