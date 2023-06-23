import { render, screen, userEvent } from 'tests/utils';

import App from './App';

const email = 'email@example.com';
const password = 'password';

test('creates user and logs-in', async () => {
  const { click, type } = userEvent.setup();

  render(<App />);

  // Sign up
  await screen.findByRole('link', { name: 'auth:menu.signUp' });
  await click(screen.getByRole('link', { name: 'auth:menu.signUp' }));
  await type(await screen.findByLabelText('auth:signUp.email'), email);
  await type(await screen.findByLabelText('auth:signUp.password'), password);
  await click(await screen.findByRole('button', { name: 'auth:signUp.submit' }));

  // Sign in
  await click(screen.getByRole('link', { name: 'auth:menu.signIn' }));
  await screen.findByLabelText('auth:signIn.email');
  await type(screen.getByLabelText('auth:signIn.email'), email);
  await type(await screen.findByLabelText('auth:signIn.password'), password);
  await click(await screen.findByRole('button', { name: 'auth:signIn.submit' }));

  // Sign out
  await screen.findByText(email);
  await click(screen.getByText(email));
  await click(await screen.findByText('dashboard:topMenu.signOut'));
  expect(await screen.findByRole('link', { name: 'auth:menu.signIn' })).toBeInTheDocument();
});
