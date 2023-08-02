import { configMocks, mockViewport, type MockViewport } from 'jsdom-testing-mocks';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import '@/i18n';

import { DESKTOP_VIEWPORT } from './constants';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
configMocks({ act });

mockViewport(DESKTOP_VIEWPORT);

let viewport: MockViewport;
beforeEach(() => {
  viewport = mockViewport(DESKTOP_VIEWPORT);
});
afterEach(() => {
  viewport.cleanup();
});

// https://github.com/yiminghe/async-validator#how-to-avoid-global-warning
vi.stubGlobal('ASYNC_VALIDATOR_NO_WARNING', 1);
