import { Suspense, type ReactNode, type ReactElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import { mockViewport } from 'jsdom-testing-mocks';

import AntDesign from '@/app/providers/AntDesign';
import Jotai from '@/app/providers/Jotai';
import Router from '@/app/providers/Router';
import { createQueryClient } from '@/app/providers/Query';
import PersistAuthGate from '@/app/PersistAuthGate';
import { LoadingScreen } from '@/common/components';

import { DESKTOP_VIEWPORT, MOBILE_VIEWPORT } from './constants';

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
  });

  const GlobalLoading = () => <LoadingScreen fullVPHeight />;

  return (
    <Jotai>
      <Suspense fallback={<GlobalLoading />}>
        <AntDesign>
          <QueryClientProvider client={queryClient}>
            <PersistAuthGate loadingFallback={<GlobalLoading />}>
              <Router>{children}</Router>
            </PersistAuthGate>
          </QueryClientProvider>
        </AntDesign>
      </Suspense>
    </Jotai>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export const setDesktopResolution = () => mockViewport(DESKTOP_VIEWPORT);

export const setMobileResolution = () => mockViewport(MOBILE_VIEWPORT);

export * from '@testing-library/react'; // eslint-disable-line import/export
export { customRender as render }; // eslint-disable-line import/export
export { default as userEvent } from '@testing-library/user-event';
