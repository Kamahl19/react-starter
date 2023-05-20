import { Suspense, type ReactNode, type ReactElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';

import AntDesign from 'app/providers/AntDesign';
import Recoil from 'app/providers/Recoil';
import Router from 'app/providers/Router';
import { createQueryClient } from 'app/providers/Query';
import PersistAuthGate from 'app/PersistAuthGate';
import { LoadingScreen } from 'common/components';

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  const queryClient = createQueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
  });

  const GlobalLoading = () => <LoadingScreen fullVPHeight />;

  return (
    <Recoil>
      <Suspense fallback={<GlobalLoading />}>
        <AntDesign>
          <QueryClientProvider client={queryClient}>
            <PersistAuthGate fallback={<GlobalLoading />}>
              <Router>{children}</Router>
            </PersistAuthGate>
          </QueryClientProvider>
        </AntDesign>
      </Suspense>
    </Recoil>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react'; // eslint-disable-line import/export
export { customRender as render }; // eslint-disable-line import/export
export { default as userEvent } from '@testing-library/user-event';
