import { Suspense, type ComponentProps, type ReactNode, type ReactElement } from 'react';
import { SWRConfig } from 'swr';
import { render, type RenderOptions } from '@testing-library/react';

import { PersistAuthGate } from 'common/auth';
import { LoadingScreen } from 'common/components';
import { swrConfig } from 'common/swr';

import AntDesignConfig from './app/AntDesignConfig';
import Recoil from './app/Recoil';
import Router from './app/Router';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const swrConfigForTests: ComponentProps<typeof SWRConfig>['value'] = {
    ...swrConfig,
    provider: () => new Map(),
  };

  return (
    <Suspense fallback={<LoadingScreen fullVPHeight />}>
      <AntDesignConfig>
        <Recoil>
          <SWRConfig value={swrConfigForTests}>
            <PersistAuthGate loading={<LoadingScreen fullVPHeight />}>
              <Router>{children}</Router>
            </PersistAuthGate>
          </SWRConfig>
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
