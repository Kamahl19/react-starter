import { createRoot } from 'react-dom/client';

import 'i18n';
import Root from 'app/Root';

if (import.meta.env.DEV) {
  const { worker } = await import('mocks/browser');
  await worker.start({
    onUnhandledRequest: (req, { warning }) =>
      req.url.href.includes(import.meta.env.VITE_API_URL) ? warning() : undefined,
  });
}

const root = createRoot(document.querySelector('#root')!); // eslint-disable-line @typescript-eslint/no-non-null-assertion

root.render(<Root />);

// TODO remove "headers-polyfill" from package.json when mswjs updates to 3.1.2
