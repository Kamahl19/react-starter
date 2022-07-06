import 'react-i18next';

import type translation from '../public/locales/en/translation.json';

declare module 'react-i18next' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    resources: {
      translation: typeof translation;
    };
  }
}
