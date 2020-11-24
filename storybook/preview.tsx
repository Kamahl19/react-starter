import { Suspense, FC } from 'react';
import { MemoryRouter } from 'react-router-dom';

import 'common/services/i18next';
import 'app/styles/main.css';

export const decorators = [
  (Story: FC) => (
    <Suspense fallback={<></>}>
      <Story />
    </Suspense>
  ),
  (Story: FC) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
];
