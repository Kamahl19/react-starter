import { type GlobalToken } from 'antd';

import { type Theme as ThemeName } from './';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme {
    token: GlobalToken;
    theme: ThemeName;
  }
}
