import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../src/common/services/i18n';

export default storyFn => (
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<></>}>{storyFn()}</Suspense>;
  </I18nextProvider>
);
