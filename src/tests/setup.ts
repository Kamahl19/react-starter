import { configMocks, type MockViewport } from 'jsdom-testing-mocks';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { setDesktopResolution } from './utils';
import { dropDB } from 'mocks/db';
import { server } from 'mocks/server';

import 'i18n';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
configMocks({ act });

let viewport: MockViewport;
beforeEach(() => {
  viewport = setDesktopResolution();
});
afterEach(() => {
  viewport.cleanup();
});

// MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterEach(() => dropDB());
afterAll(() => server.close());

// https://github.com/yiminghe/async-validator#how-to-avoid-global-warning
vi.stubGlobal('ASYNC_VALIDATOR_NO_WARNING', 1);
