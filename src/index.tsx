import { createRoot } from 'react-dom/client';

import 'app/styles/main.less';
import 'app/i18n';
import Root from 'app/Root';

if (import.meta.env.DEV) {
  const { worker } = await import('mocks/browser');
  await worker.start({
    onUnhandledRequest: (req, { warning }) =>
      req.url.href.includes(import.meta.env.VITE_API_URL) ? warning() : undefined,
  });
}

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(<Root />);
