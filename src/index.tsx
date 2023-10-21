import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'i18n';
import Root from 'app/Root';

startMSW().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  createRoot(document.querySelector('#root')!).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
});

async function startMSW() {
  if (import.meta.env.DEV || __ENABLE_MSW_IN_PROD__) {
    const { worker } = await import('mocks/browser');

    worker.start({
      onUnhandledRequest: ({ url }, { warning }) =>
        url.includes(import.meta.env.VITE_API_URL) ? warning() : undefined,
    });
  }

  return undefined;
}

// TODO replace @mswjs/data fork with original repo after this is merged https://github.com/mswjs/data/pull/277
// TODO remove override for @swc/core in package.json
