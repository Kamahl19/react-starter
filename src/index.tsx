import './bootstrap';
import { createRoot } from 'react-dom/client';

import 'app/styles/main.less';
import Root from 'app/Root';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(<Root />);
