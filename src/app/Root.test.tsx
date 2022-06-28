import { render, screen } from '@testing-library/react';

import Root from './Root';

it('renders without crashing', async () => {
  render(<Root />);

  const loginButton = await screen.findByRole('button');

  expect(loginButton).toBeInTheDocument();
});
