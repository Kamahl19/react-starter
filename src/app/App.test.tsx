import { render, screen, userEvent } from 'tests/utils';

import App from './App';

const email = 'email@example.com';
const password = 'password';

test('creates user and logs-in', async () => {
  const { click, type } = userEvent.setup();

  render(<App />);

  // Sign up
  await click(await screen.findByRole('link', { name: 'Sign Up' }));
  await type(await screen.findByLabelText('E-mail'), email);
  await type(await screen.findByLabelText('Password'), password);
  await click(await screen.findByRole('button', { name: 'Sign Up' }));

  // Log in
  await screen.findByText(/Your account has been successfully created/);
  await type(await screen.findByLabelText('E-mail'), email);
  await type(await screen.findByLabelText('Password'), password);
  await click(await screen.findByRole('button', { name: 'Log In' }));

  // Log out
  await click(await screen.findByText(email));
  await click(await screen.findByText('Logout'));
  expect(await screen.findByRole('link', { name: 'Log In' })).toBeInTheDocument();
});
