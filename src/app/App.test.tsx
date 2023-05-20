import { render, screen, userEvent } from 'tests/utils';

import App from './App';

// Preload lazy components
import 'features/auth';
import 'features/dashboard';
import 'features/auth/pages/SignUp';
import 'features/auth/pages/Login';

const timeout = 5000;

const email = 'email@example.com';
const password = 'password';

test('creates user and logs-in', async () => {
  const { click, type } = userEvent.setup();

  render(<App />);

  // Sign up
  await click(await screen.findByRole('link', { name: 'auth:menu.signUp' }, { timeout }));
  await type(await screen.findByLabelText('auth:signUp.email'), email);
  await type(await screen.findByLabelText('auth:signUp.password'), password);
  await click(await screen.findByRole('button', { name: 'auth:signUp.submit' }));

  // Log in
  await screen.findByText('auth:signUp.success', undefined, { timeout });
  await type(await screen.findByLabelText('auth:logIn.email'), email);
  await type(await screen.findByLabelText('auth:logIn.password'), password);
  await click(await screen.findByRole('button', { name: 'auth:logIn.submit' }));

  // Log out
  await click(await screen.findByText(email, undefined, { timeout }));
  await click(await screen.findByText('dashboard:topMenu.logout'));
  expect(await screen.findByRole('link', { name: 'auth:menu.logIn' })).toBeInTheDocument();
});
