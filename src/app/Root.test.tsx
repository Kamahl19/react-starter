import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import Root from './Root';

it('renders without crashing', async () => {
  const { getByRole } = render(<Root />);

  const loginButton = await waitForElement(() => getByRole('button'));

  expect(loginButton).toBeInTheDocument();
});
