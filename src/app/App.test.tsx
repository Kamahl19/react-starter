import { render, screen, userEvent } from 'testUtils';

import App from './App';

const email = 'email@example.com';
const password = 'password';

it('creates user and logs-in', async () => {
  const { click, type } = userEvent.setup();

  render(<App />);

  // Sign up
  await click(await screen.findByText('Sign Up'));
  await type(await screen.findByPlaceholderText('E-mail'), email);
  await type(await screen.findByPlaceholderText('Password'), password);
  await click(await screen.findByText('Submit'));

  // Log in
  const loginButton = await screen.findByText('Log In');
  await type(await screen.findByPlaceholderText('E-mail'), email);
  await type(await screen.findByPlaceholderText('Password'), password);
  await click(loginButton);

  // Log out
  await click(await screen.findByText(email));
  await click(await screen.findByText('Logout'));

  expect(await screen.findByText('Log In')).toBeInTheDocument();
});
