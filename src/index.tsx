import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'i18n';
import Root from 'app/Root';

if (import.meta.env.DEV || __IS_VERCEL_DEMO__) {
  const { worker } = await import('mocks/browser');
  await worker.start({
    onUnhandledRequest: (req, { warning }) =>
      req.url.href.includes(import.meta.env.VITE_API_URL) ? warning() : undefined,
  });
}

const root = createRoot(document.querySelector('#root')!); // eslint-disable-line @typescript-eslint/no-non-null-assertion

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);

// TODO replace @mswjs/data fork with original repo after this is merged https://github.com/mswjs/data/pull/277
