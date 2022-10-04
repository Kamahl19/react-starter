import fetch from 'cross-fetch';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { matchMedia, setMedia, MediaQueryListEvent, cleanup as mmmCleanup } from 'mock-match-media';
import '@testing-library/jest-dom';

import { dropDB } from 'mocks/db';
import { server } from 'mocks/server';
import translation from '../../public/locales/en/translation.json';

// Suppress oaf-react-router warning about missing title
document.title = 'React Starter';

// Fetch API
vi.stubGlobal('fetch', fetch);

// window.matchMedia
vi.stubGlobal('matchMedia', matchMedia);
vi.stubGlobal('MediaQueryListEvent', MediaQueryListEvent);
beforeEach(() => setMedia({ width: '1200px' }));
afterEach(() => mmmCleanup());

// MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterEach(() => dropDB());
afterAll(() => server.close());

// i18next
i18next.use(initReactI18next).init({
  debug: true,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation },
  },
});

// https://github.com/yiminghe/async-validator#how-to-avoid-global-warning
vi.stubGlobal('ASYNC_VALIDATOR_NO_WARNING', 1);
