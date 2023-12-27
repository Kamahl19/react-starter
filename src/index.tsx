import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './global.css';

import '@/i18n';
import Root from '@/app/Root';

startMSW()
  .then(() => {
    const rootEl = document.querySelector('#root');

    if (!rootEl) {
      throw new Error('No #root element');
    }

    createRoot(rootEl).render(
      <StrictMode>
        <Root />
      </StrictMode>,
    );
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch((error) => {
    throw error;
  });

async function startMSW() {
  if (!import.meta.env.DEV && !__ENABLE_MSW_IN_PROD__) {
    return;
  }

  const { worker } = await import('@/mocks/browser');

  await worker.start({
    onUnhandledRequest: ({ url }, { warning }) =>
      url.includes(import.meta.env.VITE_API_URL) ? warning() : undefined,
  });
}
