import React, { Suspense } from 'react';
import { RenderFunction } from '@storybook/react';

const i18NextDecorator = () => (storyFn: RenderFunction) => (
  <Suspense fallback={<></>}>{storyFn()}</Suspense>
);

export default i18NextDecorator;
