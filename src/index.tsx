import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/i18n';
import Root from '@/app/Root';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
