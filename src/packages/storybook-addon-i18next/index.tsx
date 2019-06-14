import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

type TODO = any;

export default function i18NextDecorator(i18next: TODO) {
  return (storyFn: TODO) => (
    <I18nextProvider i18n={i18next}>
      <Suspense fallback={<></>}>{storyFn()}</Suspense>
    </I18nextProvider>
  );
}
