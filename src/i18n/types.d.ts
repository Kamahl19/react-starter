import 'i18next';

import { type resources } from '.';

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    resources: typeof resources.en;
    returnNull: false;
  }
}
