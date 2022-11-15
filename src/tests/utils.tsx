import { Suspense, type ReactNode, type ReactElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';

import AntDesignConfig from 'app/providers/AntDesignConfig';
import Recoil from 'app/providers/Recoil';
import Router from 'app/providers/Router';
import { createQueryClient } from 'app/providers/Query';
import PersistAuthGate from 'app/PersistAuthGate';
import { LoadingScreen } from 'common/components';

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
