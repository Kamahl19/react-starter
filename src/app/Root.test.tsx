import { render, screen, waitFor } from '@testing-library/react';

import Root from './Root';

it('renders without crashing', async () => {
  render(<Root />);

  const loginButton = await waitFor(() => screen.getByRole('button'));

  expect(loginButton).toBeInTheDocument();
});
