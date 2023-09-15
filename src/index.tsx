import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'i18n';
import Root from 'app/Root';

const startMSW = async () =>
  import.meta.env.DEV || __IS_VERCEL_DEMO__
    ? (await import('mocks/browser')).worker.start({
        onUnhandledRequest: (req, { warning }) =>
          req.url.href.includes(import.meta.env.VITE_API_URL) ? warning() : undefined,
      })
    : undefined;

startMSW().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  createRoot(document.querySelector('#root')!).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
});

// TODO replace @mswjs/data fork with original repo after this is merged https://github.com/mswjs/data/pull/277
