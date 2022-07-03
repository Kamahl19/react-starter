import { createRoot } from 'react-dom/client';

import 'app/styles/main.less';
import 'common/i18next';
import Root from 'app/Root';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(<Root />);
