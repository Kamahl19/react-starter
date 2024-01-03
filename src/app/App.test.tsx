import { screen, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Suspense, type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { dropDB } from '@/mocks/db';
import { server } from '@/mocks/server';
import { Loading } from '@/common/components';

import ThemeProvider from './providers/Theme';
import Jotai from './providers/Jotai';
import Router from './providers/Router';
import { createQueryClient } from './providers/Query';
import PersistAuthGate from './PersistAuthGate';
import App from './App';

// TODO replace this smoketest with proper Playwright e2e test

const queryClient = createQueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => (
  <Jotai>
    <Suspense fallback={<Loading />}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <PersistAuthGate loadingFallback={<Loading />}>
            <Router>{children}</Router>
          </PersistAuthGate>
        </QueryClientProvider>
      </ThemeProvider>
    </Suspense>
  </Jotai>
);

const email = 'email@example.com';
const password = 'password';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterEach(() => dropDB());
afterAll(() => server.close());

test(
  'creates user and logs-in',
  async () => {
    const { click, type } = userEvent.setup();

    render(<App />, { wrapper: Providers });

    expect(await screen.findByRole('link', { name: 'auth:header.signUp' })).toBeInTheDocument();

    // Sign up
    await click(screen.getByRole('link', { name: 'auth:header.signUp' }));
    await type(await screen.findByLabelText('auth:signUp.email'), email);
    await type(await screen.findByLabelText('auth:signUp.password'), password);
    await click(await screen.findByRole('button', { name: 'auth:signUp.submit' }));

    expect(await screen.findByText('auth:signUp.success.title')).toBeInTheDocument();

    // Sign in
    await click(screen.getByRole('link', { name: 'auth:header.signIn' }));
    await screen.findByLabelText('auth:signIn.email');
    await type(screen.getByLabelText('auth:signIn.email'), email);
    await type(await screen.findByLabelText('auth:signIn.password'), password);
    await click(await screen.findByRole('button', { name: 'auth:signIn.submit' }));

    expect(await screen.findByText(email)).toBeInTheDocument();

    // Sign out
    await click(screen.getByText(email));
    await click(await screen.findByText('dashboard:header.signOut'));
    expect(await screen.findByRole('link', { name: 'auth:header.signIn' })).toBeInTheDocument();
  },
  { timeout: 30_000 },
);
