import { Suspense, type ReactNode, type ReactElement } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SWRConfig } from 'swr';
import { render, type RenderOptions } from '@testing-library/react';

import { PersistAuthGate } from 'common/auth';
import { swrConfig } from 'common/swr';

import AntDesignConfig from './app/AntDesignConfig';
import Recoil from './app/Recoil';
import Router from './app/Router';
import translation from '../public/locales/en/translation.json';

i18next.use(initReactI18next).init({
  debug: true,
  lng: 'en',
  interpolation: { escapeValue: false },
  resources: { en: { translation } },
});

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => (
  <Suspense fallback={null}>
    <AntDesignConfig>
      <Recoil>
        <SWRConfig value={swrConfig}>
          <PersistAuthGate loading={<></>}>
            <Router>{children}</Router>
          </PersistAuthGate>
        </SWRConfig>
      </Recoil>
    </AntDesignConfig>
  </Suspense>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react'; // eslint-disable-line import/export
export { customRender as render }; // eslint-disable-line import/export
