import { render, screen } from 'testUtils';

import App from './App';

it('renders without crashing', async () => {
  render(<App />);

  const loginButton = await screen.findByRole('button');

  expect(loginButton).toBeInTheDocument();
});
