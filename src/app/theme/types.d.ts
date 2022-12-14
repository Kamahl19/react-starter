import { type GlobalToken } from 'antd/es/theme/interface'; // TODO fix import

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme {
    token: GlobalToken;
    isDark: boolean;
  }
}
