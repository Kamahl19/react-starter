import 'i18next';

import type { LANGUAGES_CONFIG, SUPPORTED_LANGUAGES } from '.';

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    resources: (typeof LANGUAGES_CONFIG)[(typeof SUPPORTED_LANGUAGES)[0]]['resources'];
    defaultNS: false;
    returnNull: false;
  }
}
