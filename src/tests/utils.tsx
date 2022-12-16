import { Suspense, type ReactNode, type ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';

import AntDesign from 'app/providers/AntDesign';
import Recoil from 'app/providers/Recoil';
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
      error: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
  });

  return (
    <AntDesign>
      <Suspense fallback={<LoadingScreen fullVPHeight />}>
        <Recoil>
          <QueryClientProvider client={queryClient}>
            <PersistAuthGate loading={<LoadingScreen fullVPHeight />}>
              <BrowserRouter>{children}</BrowserRouter>
            </PersistAuthGate>
          </QueryClientProvider>
        </Recoil>
      </Suspense>
    </AntDesign>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react'; // eslint-disable-line import/export
export { customRender as render }; // eslint-disable-line import/export
export { default as userEvent } from '@testing-library/user-event';
