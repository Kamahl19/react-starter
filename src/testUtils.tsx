import { Suspense, type ReactNode, type ReactElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';

import { PersistAuthGate } from 'common/auth';
import { LoadingScreen } from 'common/components';

import AntDesignConfig from './app/AntDesignConfig';
import Recoil from './app/Recoil';
import Router from './app/Router';
import { createQueryClient } from './app/Query';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const queryClient = createQueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

  return (
    <Suspense fallback={<LoadingScreen fullVPHeight />}>
      <AntDesignConfig>
        <Recoil>
          <QueryClientProvider client={queryClient}>
            <PersistAuthGate loading={<LoadingScreen fullVPHeight />}>
              <Router>{children}</Router>
            </PersistAuthGate>
          </QueryClientProvider>
        </Recoil>
      </AntDesignConfig>
    </Suspense>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react'; // eslint-disable-line import/export
export { customRender as render }; // eslint-disable-line import/export
export { default as userEvent } from '@testing-library/user-event';
